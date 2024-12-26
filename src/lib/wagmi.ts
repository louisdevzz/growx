import { http, createConfig } from '@wagmi/core'
import { ancient8Testnet } from "@/lib/chain";
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'HopeFund',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [ancient8Testnet],
  ssr: true,
  transports: {
    [ancient8Testnet.id]: http(),
  }
}) 