import WalletButton from './WalletButton'

interface ConnectWalletCardProps {
    title?: string;
    className?: string;
}

export default function ConnectWalletCard({ 
    title = "Connect your wallet to view your projects",
    className = ""
}: ConnectWalletCardProps) {
    return (
        <div className={`max-w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center gap-4 h-screen ${className}`}>
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <WalletButton />
        </div>
    )
} 