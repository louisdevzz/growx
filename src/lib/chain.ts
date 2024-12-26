
export const ancient8Testnet = {
  id: 28122024,
  name: 'Ancient8 Testnet',
  network: 'ancient8-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://rpc-testnet.ancient8.gg'] },
    default: { http: ['https://rpc-testnet.ancient8.gg'] },
  },
  blockExplorers: {
    default: { name: 'Ancient8 Explorer', url: 'https://testnet.explorer.ancient8.gg' },
  },
  testnet: true,
} as const; 