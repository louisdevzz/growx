'use client'
import { useState, useRef, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAccount, useSimulateContract, useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi';
import {PROJECT_CONTRACT_ADDRESS,PROJECT_CONTRACT_ABI } from '@/lib/ABI';

interface SocialLink {
  type: string;
  url: string;
}

export default function CreateProject() {
  const { address,isConnected } = useAccount()
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string|null>(null);
  const [projectDescription, setProjectDescription] = useState<string|null>(null);
  const [projectWhy, setProjectWhy] = useState<string|null>(null);
  const [projectCategory, setProjectCategory] = useState<string|null>(null);
  const [projectChain, setProjectChain] = useState<string|null>(null);
  const [fundingSources, setFundingSources] = useState<string[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [addressReceived, setAddressReceived] = useState<string|null>(null);
  const { writeContractAsync, isSuccess,data:txData,isPending } = useWriteContract()
  const [submitLoading, setSubmitLoading] = useState<boolean>(true);
  
  const { data, refetch: refetchProjectId } = useReadContract({
    address: PROJECT_CONTRACT_ADDRESS,
    abi: PROJECT_CONTRACT_ABI,
    functionName: 'getProjectIdNow',
    args: [],
    query: {
      enabled: Boolean(projectName && projectDescription && coverImage && profileImage)
    }
  })

  // useSimulateContract({
  //   address: PROJECT_CONTRACT_ADDRESS,
  //   abi: PROJECT_CONTRACT_ABI,
  //   functionName: 'registerProject',
  //   args: projectName && projectDescription && coverImage && profileImage
  //     ? [projectName, projectDescription, [coverImage, profileImage]]
  //     : undefined,
  //   query: {
  //     enabled: Boolean(projectName && projectDescription && coverImage && profileImage)
  //   }
  // })

  const uploadProject = async (projectId: string) => {
    if (!projectName || !projectCategory || !projectDescription || !coverImage || !profileImage) {
      // toast.error('Please fill in all required fields');
      return;
    }
    // console.log("Address",address)
    // console.log("AddressReceived",addressReceived)
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ownerAddress: address,
        address: addressReceived,
        projectId: projectId,
        slug: projectName.toLowerCase().replace(/\s+/g, '-'),
        name: projectName,
        category: projectCategory,
        description: projectDescription,
        why: projectWhy,
        coverImage,
        profileImage,
        chain: projectChain,
        fundingSources,
        socialLinks
      }),
    });
    if (response.ok) {
      toast.success('Project created successfully');
    } else {
      toast.error('Failed to create project');
    }
  }

  const uploadToPinata = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Pinata error:', errorData);
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await res.json();
      console.log(data);
      if (!data.IpfsHash) {
        toast.error('Upload failed');
        // throw new Error('No IPFS hash received');
      }
      
      return `https://olive-rational-giraffe-695.mypinata.cloud/ipfs/${data.IpfsHash}?pinataGatewayToken=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const loadingToast = toast.loading('Uploading image...');
      
      try {
        event.target.value = '';
        
        const pinataRes = await uploadToPinata(file);
        
        if (pinataRes) {
          setImage(pinataRes)
          toast.success('Image uploaded successfully', { id: loadingToast });
        } else {
          toast.error('Failed to upload image', { id: loadingToast });
        }
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image', { id: loadingToast });
      }
    }
  };

  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    inputRef.current?.click();
  };

  const addFundingSource = () => {
    setFundingSources([...fundingSources, '']);
  };

  const addSocialLink = (type: string) => {
    if (!socialLinks.find(link => link.type === type)) {
      setSocialLinks([...socialLinks, { type, url: '' }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error('Please connect your wallet');
      return;
    }
    if (!projectName || !projectCategory || !projectDescription || !coverImage || !profileImage) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Creating project...');

    try {
      await writeContractAsync({
        address: PROJECT_CONTRACT_ADDRESS,
        abi: PROJECT_CONTRACT_ABI,
        functionName: 'registerProject',
        args: [projectName, projectDescription, [coverImage, profileImage]]
      });

      toast.success('Please wait for the project to be created', { id: loadingToast });
      
    } catch (error) {
      console.error('Project creation error:', error);
      toast.error('Failed to create project', { id: loadingToast });
    }
  };

  const publishProject = async (projectId: string) => {
    await writeContractAsync({
      address: PROJECT_CONTRACT_ADDRESS,
      abi: PROJECT_CONTRACT_ABI,
      functionName: 'publishProject',
      args: [projectId]
    });
  }

  useWatchContractEvent({
    address: PROJECT_CONTRACT_ADDRESS,
    abi: PROJECT_CONTRACT_ABI,
    eventName: 'ProjectRegistered',
    args: projectName && address ? [projectName, address] : undefined,
    onLogs(logs) {
      setSubmitLoading(false)
      //console.log('logs',logs)
      
      refetchProjectId().then((result) => {
        //console.log("result",result)
        if (result.data) {
          publishProject(result.data)
          uploadProject(result.data)
        }
      })
    }
  });


  return (
    <div className='min-h-screen bg-white container'>
      <Header />
      <main className="flex items-start justify-center">
        <div className="container max-w-3xl p-4">
          <div className="text-center mb-12 bg-[#FDF7F3] rounded-2xl p-4">
            <h1 className="text-2xl font-bold mb-4">Register New Project</h1>
            <p className="text-gray-600 text-lg">Create a profile for your project to receive donations and qualify for funding rounds.</p>
          </div>

          <form onSubmit={handleSubmit} className="border border-gray-100 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-sm">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <label className="font-medium text-lg">Upload banner and profile image</label>
                <span className="text-red-500 text-xs">Required</span>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg aspect-[3/1] relative overflow-hidden">
                  {coverImage ? (
                    <img 
                      src={coverImage} 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                  <button 
                    type="button" 
                    onClick={() => triggerFileInput(fileInputRef)}
                    className="absolute right-1 top-4 bg-white rounded px-3 py-1.5 text-sm flex items-center gap-2"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 12V4M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {coverImage ? 'Change cover photo' : 'Add cover photo'}
                      </>
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e, setCoverImage)}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <div className="w-24 h-24 bg-gray-100 rounded-full border-4 border-white relative">
                    {profileImage && (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}
                    <button 
                      type="button" 
                      onClick={() => triggerFileInput(profileInputRef)}
                      className="absolute right-0 bottom-0 bg-white rounded-full p-1.5 shadow-sm"
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 12V4M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>
                    <input
                      type="file"
                      ref={profileInputRef}
                      onChange={(e) => handleImageUpload(e, setProfileImage)}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="mt-16 mb-8 text-center">
                <button type="button" className="text-red-500 text-sm">Add team members</button>
              </div> */}
            </div>

            <div className="mb-8 mt-16">
              <div className="flex items-center gap-2 mb-6">
                <label className="font-medium text-lg">Project details</label>
                <span className="text-red-500 text-xs">Required</span>
              </div>
              
              <div className="space-y-6">
                {/* <div className="flex gap-4 items-center">
                  <span>Would you like to register project as DAO?</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="isDao" value="yes" className="text-red-500" />
                      <span>yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="isDao" value="no" className="text-red-500" />
                      <span>no</span>
                    </label>
                  </div>
                </div> */}

                {/* <div>
                  <label className="block text-sm font-medium mb-2">Project ID</label>
                  <input
                    type="text"
                    placeholder="hndzz.near"
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-medium mb-2">Project name</label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName || ''}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Select category</label>
                  <div className="relative">
                    <select 
                      className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 appearance-none"
                      onChange={(e) => setProjectCategory(e.target.value)}
                      value={projectCategory || ''}
                    >
                      <option value="">Choose category</option>
                      <option value="defi">DeFi</option>
                      <option value="nft">NFT</option>
                      <option value="dao">DAO</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="gaming">Gaming</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project description</label>
                  <textarea
                    placeholder="Describe your project"
                    onChange={(e) => setProjectDescription(e.target.value)}
                    value={projectDescription || ''}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Why do you want to raise capital?</label>
                  <textarea
                    placeholder="Why do you want to raise capital?"
                    onChange={(e) => setProjectWhy(e.target.value)}
                    value={projectWhy || ''}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 h-32"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="font-medium text-lg">Address receiving funds</label>
                {/* <span className="text-gray-500 text-sm">Optional</span> */}
              </div>
              <div className="flex gap-4 mb-2">
                <div className="relative w-1/3">
                  <select 
                    className="w-full p-3 border rounded-xl bg-gray-50 appearance-none"
                    onChange={(e) => setProjectChain(e.target.value)}
                    value={projectChain || ''}
                  >
                    <option value="">Add chain</option>
                    <option value="ancient8">Ancient8</option>
                    <option value="solana">Solana</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="polygon">Polygon</option>
                    <option value="arbitrum">Arbitrum</option>
                    <option value="avalanche">Avalanche</option>
                    <option value="bsc">BSC</option>
                    <option value="fantom">Fantom</option>
                    <option value="optimism">Optimism</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Enter address"
                  value={addressReceived || ''}
                  onChange={(e) => setAddressReceived(e.target.value)}
                  className="w-2/3 p-3 border rounded-xl bg-gray-50"
                />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="font-medium">Funding sources</label>
                <span className="text-gray-500 text-sm">Optional</span>
              </div>
              
              {fundingSources.map((source, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => {
                      const newSources = [...fundingSources];
                      newSources[index] = e.target.value;
                      setFundingSources(newSources);
                    }}
                    placeholder="Enter funding source link"
                    className="flex-1 p-3 border rounded-xl bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSources = fundingSources.filter((_, i) => i !== index);
                      setFundingSources(newSources);
                    }}
                    className="px-3 py-2 text-gray-500 hover:text-red-500"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              
              <button 
                type="button" 
                onClick={addFundingSource}
                className="text-red-500 text-sm hover:text-red-600 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add funding source
              </button>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="font-medium">Social links</label>
                <span className="text-gray-500 text-sm">Optional</span>
              </div>
              
              <div className="space-y-4">
                {/* Social Icons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => addSocialLink('twitter')}
                    className={`p-2 rounded-lg hover:bg-gray-100 ${
                      socialLinks.find(link => link.type === 'twitter') ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => addSocialLink('telegram')}
                    className={`p-2 rounded-lg hover:bg-gray-100 ${
                      socialLinks.find(link => link.type === 'telegram') ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.227-.535.227l.19-2.712 4.94-4.465c.215-.19-.047-.296-.332-.106L9.65 13.95l-2.548-.792c-.654-.207-.67-.657.136-.975l9.935-3.836c.545-.197 1.025.124.721.874z"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => addSocialLink('github')}
                    className={`p-2 rounded-lg hover:bg-gray-100 ${
                      socialLinks.find(link => link.type === 'github') ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => addSocialLink('website')}
                    className={`p-2 rounded-lg hover:bg-gray-100 ${
                      socialLinks.find(link => link.type === 'website') ? 'text-red-500' : 'text-gray-500'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                  </button>
                </div>

                {/* Social Inputs */}
                <div className="space-y-3">
                  {socialLinks.map((link, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...socialLinks];
                          newLinks[index].url = e.target.value;
                          setSocialLinks(newLinks);
                        }}
                        placeholder={`Enter ${link.type} URL`}
                        className="flex-1 p-3 border rounded-xl bg-gray-50"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSocialLinks(socialLinks.filter((_, i) => i !== index));
                        }}
                        className="px-3 py-2 text-gray-500 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-12">
              <Link 
                href="/"  
                className="px-6 py-3 border rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button 
                type="submit" 
                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Create new project
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
