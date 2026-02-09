'use client';

import { Wallet, AlertCircle } from 'lucide-react';
import { Modal, ModalFooter } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/providers/wallet-provider';

interface WalletModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const walletOptions = [
    {
        id: 'freighter',
        name: 'Freighter',
        description: 'Browser extension for Stellar',
        icon: '🚀',
        recommended: true,
    },
    {
        id: 'lobstr',
        name: 'LOBSTR',
        description: 'Mobile wallet for Stellar',
        icon: '🦞',
        recommended: false,
    },
    {
        id: 'albedo',
        name: 'Albedo',
        description: 'Web-based Stellar wallet',
        icon: '🌟',
        recommended: false,
    },
    {
        id: 'xbull',
        name: 'xBull Wallet',
        description: 'Advanced Stellar wallet',
        icon: '🐂',
        recommended: false,
    },
];

export function WalletModal({ isOpen, onClose }: WalletModalProps) {
    const { connect, isConnecting, error, clearError } = useWallet();

    const handleConnect = async (walletId: string) => {
        await connect();
        // In a real app, you'd pass the wallet type to the connect function
        if (!error) {
            onClose();
        }
    };

    const handleClose = () => {
        clearError();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Connect Your Wallet"
            description="Choose a wallet to connect to the Stellar network"
            size="md"
            variant="glass"
        >
            {error && (
                <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-red-400 font-medium">Connection Failed</p>
                        <p className="text-xs text-red-400/80 mt-1">{error}</p>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {walletOptions.map((wallet) => (
                    <button
                        key={wallet.id}
                        onClick={() => handleConnect(wallet.id)}
                        disabled={isConnecting}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-[rgb(var(--secondary))] hover:bg-primary-500/10 hover:border-primary-500/30 border border-transparent transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="h-12 w-12 rounded-xl bg-[rgb(var(--card))] flex items-center justify-center text-2xl">
                            {wallet.icon}
                        </div>
                        <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{wallet.name}</span>
                                {wallet.recommended && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400">
                                        Recommended
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-[rgb(var(--muted-foreground))]">
                                {wallet.description}
                            </p>
                        </div>
                        <Wallet className="h-5 w-5 text-[rgb(var(--muted-foreground))] group-hover:text-primary-500 transition-colors" />
                    </button>
                ))}
            </div>

            {isConnecting && (
                <div className="mt-4 flex items-center justify-center gap-3 py-4">
                    <div className="h-5 w-5 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
                    <span className="text-sm text-[rgb(var(--muted-foreground))]">
                        Connecting to wallet...
                    </span>
                </div>
            )}

            <ModalFooter>
                <p className="text-xs text-[rgb(var(--muted-foreground))] text-center w-full">
                    By connecting, you agree to our{' '}
                    <a href="/terms" className="text-primary-500 hover:underline">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-primary-500 hover:underline">
                        Privacy Policy
                    </a>
                </p>
            </ModalFooter>
        </Modal>
    );
}
