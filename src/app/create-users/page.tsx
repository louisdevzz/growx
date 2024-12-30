'use client'
import { useState, useRef } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

interface SocialLink {
  type: string;
  url: string;
}

export default function CreateUser() {
  const { address } = useAccount()
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [userName, setUserName] = useState<string|null>(null);
  const [userBio, setUserBio] = useState<string|null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const router = useRouter();
  const [userAddress, setUserAddress] = useState<string|null>(null);

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
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await res.json();
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

  const addSocialLink = (type: string) => {
    if (!socialLinks.find(link => link.type === type)) {
      setSocialLinks([...socialLinks, { type, url: '' }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName || !userBio || !coverImage || !profileImage || !userAddress) {
      toast.error('Please fill in all required fields');
      return;
    }

    const loadingToast = toast.loading('Creating user profile...');

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName,
          bio: userBio,
          address: userAddress,
          coverImage,
          profileImage,
          socialLinks,
          walletAddress: address,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Profile created successfully', { id: loadingToast });
        router.push('/');
      } else {
        throw new Error(data.error || 'Failed to create profile');
      }
    } catch (error) {
      console.error('Profile creation error:', error);
      toast.error('Failed to create profile', { id: loadingToast });
    }
  };

  return (
    <div className='min-h-screen bg-white container'>
      <Header />
      <main className="flex items-start justify-center p-6">
        <div className="container max-w-3xl">
          <div className="text-center mb-12 bg-[#FDF7F3] rounded-2xl p-8">
            <h1 className="text-2xl font-bold mb-4">Create User Profile</h1>
            <p className="text-gray-600 text-lg">Set up your profile to participate in the community.</p>
          </div>

          <form onSubmit={handleSubmit} className="border border-gray-100 rounded-2xl p-8 shadow-sm">
            {/* Image Upload Section */}
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
                    className="absolute right-4 top-4 bg-white rounded px-3 py-1.5 text-sm flex items-center gap-2"
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
            </div>

            {/* User Details Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-6">
                <label className="font-medium text-lg">User details</label>
                <span className="text-red-500 text-xs">Required</span>
              </div>
              
              <div className="space-y-6">
              <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName || ''}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>

                {/* Physical Address */}
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <textarea
                    placeholder="Enter your physical address"
                    onChange={(e) => setUserAddress(e.target.value)}
                    value={userAddress || ''}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 h-20"
                  />
                </div>



                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    placeholder="Tell us about yourself"
                    onChange={(e) => setUserBio(e.target.value)}
                    value={userBio || ''}
                    className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 h-32"
                  />
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="font-medium">Social links</label>
                <span className="text-gray-500 text-sm">Optional</span>
              </div>
              
              <div className="space-y-4">
                {/* Social Icons */}
                <div className="flex gap-3">
                  {['twitter', 'telegram', 'github', 'website'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addSocialLink(type)}
                      className={`p-2 rounded-lg hover:bg-gray-100 ${
                        socialLinks.find(link => link.type === type) ? 'text-red-500' : 'text-gray-500'
                      }`}
                    >
                      {/* Add appropriate icon SVG for each social type */}
                    </button>
                  ))}
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

            {/* Form Buttons */}
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
                Create profile
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
