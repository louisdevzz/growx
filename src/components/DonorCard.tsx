import Image from "next/image";

interface DonorCardProps {
  name: string;
  amount: number;
  imageUrl: string;
}

export default function DonorCard({ name, amount, imageUrl }: DonorCardProps) {

  const struncateString = (str: string) => {
    return str.length > 10 ? str.substring(0, 10) + '...' : str;
  }

  const getInitials = (name: string) => {
    return name.slice(2, 5).toUpperCase();
  }

  return (
    <div className="group card-hover relative">
      <div className="absolute top-2 left-2 z-[1]">
        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
          ~${amount.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 mt-8">
        <div className="rounded-full p-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
          <div className="bg-white rounded-full p-0.5">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white text-gray-600 text-xl font-medium">
                  {getInitials(name)}
                </div>
              )}
            </div>
          </div>
        </div>
        <h3 className="font-medium text-gray-800">{struncateString(name)}</h3>
      </div>
      <div className="card-hover-shake" />
    </div>
  );
}

