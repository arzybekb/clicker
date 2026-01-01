import { http, createConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
    metaMaskWallet,
    phantomWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [metaMaskWallet, phantomWallet],
        },
    ],
    {
        appName: 'Web3 Clicker',
        projectId: 'YOUR_PROJECT_ID',
    }
);

export const config = createConfig({
    connectors,
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
    },
})
