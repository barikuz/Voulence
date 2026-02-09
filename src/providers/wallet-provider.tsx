'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
    isConnected: boolean;
    address: string | null;
    balance: number;
    isConnecting: boolean;
    error: string | null;
}

interface WalletActions {
    connect: () => Promise<void>;
    disconnect: () => void;
    setError: (error: string | null) => void;
    clearError: () => void;
}

type WalletStore = WalletState & WalletActions;

// Simulated wallet connection for demo purposes
// In production, this would integrate with actual Soroban SDK
const simulateWalletConnection = (): Promise<{ address: string; balance: number }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({
                    address: 'GDQP2KP7XFNZA5FAFXVK7MNT6GX7YZQKP8WMRPQB3NSLV2DPYHC4TQWM',
                    balance: 15420.50,
                });
            } else {
                reject(new Error('Failed to connect wallet. Please try again.'));
            }
        }, 1500);
    });
};

export const useWalletStore = create<WalletStore>()(
    persist(
        (set, get) => ({
            // Initial state
            isConnected: false,
            address: null,
            balance: 0,
            isConnecting: false,
            error: null,

            // Actions
            connect: async () => {
                set({ isConnecting: true, error: null });

                try {
                    const { address, balance } = await simulateWalletConnection();
                    set({
                        isConnected: true,
                        address,
                        balance,
                        isConnecting: false,
                        error: null,
                    });
                } catch (error) {
                    set({
                        isConnecting: false,
                        error: error instanceof Error ? error.message : 'Unknown error occurred',
                    });
                }
            },

            disconnect: () => {
                set({
                    isConnected: false,
                    address: null,
                    balance: 0,
                    error: null,
                });
            },

            setError: (error) => set({ error }),

            clearError: () => set({ error: null }),
        }),
        {
            name: 'voulence-wallet',
            partialize: (state) => ({
                isConnected: state.isConnected,
                address: state.address,
                balance: state.balance,
            }),
        }
    )
);

// Hook for easier access to wallet state
export function useWallet() {
    const store = useWalletStore();

    return {
        isConnected: store.isConnected,
        address: store.address,
        balance: store.balance,
        isConnecting: store.isConnecting,
        error: store.error,
        connect: store.connect,
        disconnect: store.disconnect,
        clearError: store.clearError,
    };
}
