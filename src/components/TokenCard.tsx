import Image from 'next/image';
import Link from 'next/link';

interface TokenCardProps {
  title: string;
  handle?: string;
  description: string;
  image: string;
  tags: string[];
  amount: number;
  currency: string;
  donors?: number;
  isApproved?: boolean;
  followers?: number;
  following?: number;
}

export default function TokenCard({
  title,
  handle,
  description,
  image,
  tags,
  amount,
  currency,
  donors,
  isApproved,
  followers,
  following
}: TokenCardProps) {
  return (
    <Link href={`/projects/${title.toLowerCase()}`} className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Banner Image */}
      <div className="relative h-32 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {handle && <p className="text-sm text-gray-600">{handle}</p>}
          </div>
          <div className="text-right">
            <div className="font-bold">{amount} {currency}</div>
            {donors && (
              <div className="text-sm text-gray-600">
                Raised from {donors} donors
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            {isApproved && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                APPROVED
              </span>
            )}
          </div>
          {(followers || following) && (
            <div className="flex gap-3">
              <span>{followers} Followers</span>
              <span>{following} Following</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 