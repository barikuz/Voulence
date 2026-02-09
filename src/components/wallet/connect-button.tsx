'use client';

import { Wallet, ChevronDown, LogOut, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/providers/wallet-provider';
import { truncateAddress } from '@/lib/utils';
import { WalletModal } from './wallet-modal';

export function ConnectButton() {
    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { isConnected, address, balance, disconnect } = useWallet();

    const copyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            // In a real app, show a toast notification here
        }
    };

    if (!isConnected) {
        return (
            <>
                <Button
                    variant="neon"
                    onClick={() => setModalOpen(true)}
                    leftIcon={<Wallet className="h-4 w-4" />}
                >
                    Connect Wallet
                </Button>
                <WalletModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl glass border border-primary-500/30 hover:border-primary-500/50 transition-colors neon-glow"
            >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Wallet className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">
                        {truncateAddress(address || '', 4)}
                    </span>
                    <span className="text-xs text-primary-400">
                        {balance.toLocaleString()} XLM
                    </span>
                </div>
                <ChevronDown className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            </button>

            {dropdownOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 rounded-xl glass border border-[rgb(var(--border))] shadow-xl z-50 py-2">
                        {/* Balance Section */}
                        <div className="px-4 py-3 border-b border-[rgb(var(--border))]">
                            <p className="text-xs text-[rgb(var(--muted-foreground))]">
                                Balance
                            </p>
                            <p className="text-xl font-bold gradient-primary-text">
                                {balance.toLocaleString()} XLM
                            </p>
                        </div>

                        {/* Address */}
                        <div className="px-4 py-3 border-b border-[rgb(var(--border))]">
                            <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">
                                Wallet Address
                            </p>
                            <div className="flex items-center justify-between gap-2">
                                <code className="text-xs bg-[rgb(var(--secondary))] px-2 py-1 rounded">
                                    {truncateAddress(address || '', 8)}
                                </code>
                                <button
                                    onClick={copyAddress}
                                    className="p-1.5 rounded-lg hover:bg-[rgb(var(--secondary))] transition-colors"
                                    aria-label="Copy address"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="py-2">
                            <a
                                href={`https://stellar.expert/explorer/public/account/${address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[rgb(var(--secondary))] transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span className="text-sm">View on Explorer</span>
                            </a>
                            <button
                                onClick={() => {
                                    disconnect();
                                    setDropdownOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-red-500/10 text-red-400 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="text-sm">Disconnect</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
