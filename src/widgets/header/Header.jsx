import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Header() {
    return (
        <header className="flex justify-between items-center mb-12">
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Web3 Clicker
            </h1>

            <ConnectButton />
        </header>
    )
}
