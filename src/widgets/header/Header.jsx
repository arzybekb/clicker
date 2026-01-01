import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NavLink } from 'react-router-dom'
import { Gamepad2, Trophy } from 'lucide-react'
import { useAccount } from 'wagmi'

export function Header() {
    const { isConnected } = useAccount()

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <div className="flex items-center gap-8">
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hidden md:block">
                    Web3 Clicker
                </h1>

                {isConnected && <nav className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-white/5">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Gamepad2 size={16} /> Game
                    </NavLink>
                    <NavLink
                        to="/leaderboard"
                        className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Trophy size={16} /> Leaderboard
                    </NavLink>
                </nav>}
            </div>

            <ConnectButton />
        </header>
    )
}
