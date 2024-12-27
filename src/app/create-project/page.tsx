'use client'
import { useState, useRef } from 'react';

export default function CreateProject() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const triggerFileInput = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    inputRef.current?.click();
  };

  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <div className="container max-w-3xl">
        {/* Header - Updated with background color */}
        <div className="text-center mb-12 bg-[#FDF7F3] rounded-lg p-8">
          <h1 className="text-2xl font-serif mb-2">Register New Project</h1>
          <p className="text-gray-600">Create a profile for your project to receive donations and qualify for funding rounds.</p>
        </div>

        <form>
          {/* Banner Image Upload */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <label className="font-medium">Upload banner and profile image</label>
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
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12V4M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Add cover photo
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleImageUpload(e, setCoverImage)}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {/* Profile Image Overlay */}
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
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 12V4M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
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
            {/* Add Team Members Link */}
            <div className="mt-16 mb-8 text-center">
              <button type="button" className="text-red-500 text-sm">Add team members</button>
            </div>
          </div>

          {/* Project Details - Updated fields */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <label className="font-medium">Project details</label>
              <span className="text-red-500 text-xs">Required</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-center">
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
              </div>

              <div>
                <label className="block text-sm mb-1">Project ID</label>
                <input
                  type="text"
                  placeholder="hndzz.near"
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Project name</label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  className="w-full p-2.5 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Select category (select multiple)</label>
                <select className="w-full p-2.5 border rounded-lg">
                  <option value="">Choose category</option>
                </select>
              </div>

              <textarea
                placeholder="Describe your project"
                className="w-full p-2 border rounded h-32"
              />

              <textarea
                placeholder="Why do you consider yourself a public good?"
                className="w-full p-2 border rounded h-32"
              />
            </div>
          </div>

          {/* Smart Contracts */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="font-medium">Smart contracts</label>
              <span className="text-gray-500 text-sm">Optional</span>
            </div>
            <div className="flex gap-4 mb-2">
              <select className="w-1/3 p-2 border rounded">
                <option value="">Add chain</option>
              </select>
              <input
                type="text"
                placeholder="Enter address"
                className="w-2/3 p-2 border rounded"
              />
            </div>
          </div>

          {/* Funding Sources */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="font-medium">Funding sources</label>
              <span className="text-gray-500 text-sm">Optional</span>
            </div>
            <button type="button" className="text-red-500 text-sm">+ Add funding source</button>
          </div>

          {/* Social Links */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="font-medium">Social links</label>
              <span className="text-gray-500 text-sm">Optional</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Twitter" className="p-2 border rounded" />
              <input type="text" placeholder="Telegram" className="p-2 border rounded" />
              <input type="text" placeholder="Github" className="p-2 border rounded" />
              <input type="text" placeholder="Website" className="p-2 border rounded" />
            </div>
          </div>

          {/* Form Actions - Updated styling */}
          <div className="flex justify-end gap-4 mt-12">
            <button type="button" className="px-6 py-2.5 border rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-6 py-2.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">Create new project</button>
          </div>
        </form>
      </div>
    </main>
  )
}
