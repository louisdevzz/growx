'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

const WalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="relative flex items-center justify-center w-[180px] px-6 py-3 font-medium text-white transition-all rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:shadow-[0_4px_12px_rgba(79,70,229,0.3)] active:scale-[0.98]"
                  >
                    Connect Wallet
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    className="flex w-[180px] text-center justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md"
                  >
                    {chain.hasIcon && (
                      <div className="w-5 h-5">
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width={20}
                            height={20}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    className="flex w-[22 0px] text-center justify-center items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md"
                  >
                    {account.displayName}
                    <span className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full border border-green-100">
                      {account.displayBalance
                        ? `${account.displayBalance}`
                        : ''}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletButton; 