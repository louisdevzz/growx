import Image from "next/image";

interface DonorCardProps {
  name: string;
  amount: number;
  imageUrl: string;
}

export default function DonorCard({ name, amount, imageUrl }: DonorCardProps) {
  return (
    <div className="group card-hover relative">
      <div className="absolute top-2 left-2 z-[1]">
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
          ~${amount.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 mt-8">
        <div className="rounded-full p-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
          <div className="bg-white rounded-full p-0.5">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <Image
                src={imageUrl}
                alt={name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <h3 className="font-medium text-gray-800">{name}</h3>
      </div>
      <div className="card-hover-shake" />
    </div>
  );
}

