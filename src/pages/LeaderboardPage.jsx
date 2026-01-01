import { useReadContract } from 'wagmi'
import { CLICKER_ABI, CONTRACT_ADDRESS } from '../shared/lib/viem'
import { Card } from '../shared/ui/base'
import { Loader2, Trophy, Medal } from 'lucide-react'

export function LeaderboardPage() {
    const { data, isLoading, error } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CLICKER_ABI,
        functionName: 'getLeaderboard',
    })

    const [addresses, scores] = data || [[], []]

    // Combine and sort
    const leaderboard = addresses.map((addr, i) => ({
        address: addr,
        score: scores[i]
    })).sort((a, b) => Number(b.score - a.score))

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
                <p className="text-slate-400">Loading leaderboard...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-400">
                <p>Failed to load leaderboard.</p>
                <p className="text-sm opacity-75 mt-2">{error.message}</p>
            </div>
        )
    }

    if (leaderboard.length === 0) {
        return (
            <div className="text-center py-20 text-slate-400">
                <Trophy className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>No games played yet. Be the first!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-black tracking-tight">Leaderboard</h2>
                <p className="text-slate-400">Top clickers on the chain</p>
            </div>

            <div className="space-y-3">
                {leaderboard.map((player, index) => (
                    <Card key={player.address} className="p-4 flex items-center justify-between bg-slate-900/50 border-slate-800 hover:border-blue-500/30 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold
                                ${index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                                    index === 1 ? 'bg-slate-300/20 text-slate-300' :
                                        index === 2 ? 'bg-amber-700/20 text-amber-700' : 'bg-slate-800 text-slate-500'}
                            `}>
                                {index < 3 ? <Medal size={16} /> : index + 1}
                            </div>
                            <div className="font-mono text-sm sm:text-base text-slate-200">
                                {player.address.slice(0, 6)}...{player.address.slice(-4)}
                            </div>
                        </div>
                        <div className="font-black text-blue-400 text-lg">
                            {player.score.toString()} <span className="text-xs text-slate-500 ml-1">CLICKS</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
