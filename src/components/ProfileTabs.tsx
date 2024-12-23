import React, { useState } from 'react';
import { Profile } from '../../types/profile';

interface ProfileTabsProps {
  profile: Profile;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div>
      {/* Tab Headers */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {['Home', 'Social Feed', 'Posts', 'Funding Raised'].map((tab) => (
            <button
              key={tab}
              className={`py-2 border-b-2 ${
                activeTab === tab.toLowerCase() 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <Section title="Overview" content={profile.overview} />
            <Section title="Why we are a public good" content={profile.publicGoodReason} />
            <Section 
              title="Team members" 
              content={
                profile.teamMembers?.length 
                  ? profile.teamMembers.map(m => m.name).join(', ')
                  : 'No team members to display'
              } 
            />
            <Section 
              title="Github repo(s)" 
              content={profile.githubRepos?.length ? profile.githubRepos.join(', ') : 'None provided'} 
            />
            <Section 
              title="Smart contracts" 
              content={profile.smartContracts?.length ? profile.smartContracts.join(', ') : 'None provided'} 
            />
          </div>
        )}
        {/* Add other tab contents as needed */}
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; content?: string }> = ({ title, content }) => (
  <div>
    <h3 className="font-medium text-gray-900">{title}</h3>
    <p className="mt-1 text-gray-600">{content || 'No information provided'}</p>
  </div>
); 