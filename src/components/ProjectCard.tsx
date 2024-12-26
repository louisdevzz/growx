import Image from 'next/image'
import Link from 'next/link';
import { FundingBox } from './FundingBox';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  amount: number;
  currency: string;
  raised?: boolean;
  href: string;
  donors?: number;
}

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export default function ProjectCard({ title, description, image, tags, amount, currency, raised, href, donors = 0 }: ProjectCardProps) {
  return (
    <Link href={href} className="block">
      <div className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer max-h-[430px] shadow-lg">
        <div className="relative">
          <Image 
            src={image} 
            alt={title} 
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
              {tags[0]}
            </span>
          </div>
          {/* <div className="absolute -bottom-6 left-2">
            <Image 
              src={image} 
              alt={title} 
              width={100}
              height={100}
              className="rounded-full w-[50px] h-[50px] object-cover border-2 border-white"
            />
          </div> */}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-600 text-sm mt-2">{truncate(description, 80)}</p>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">~${amount.toFixed(2)}</p>
                <p className="text-xs text-gray-600">
                  Raised from {donors} donors
                </p>
              </div>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 