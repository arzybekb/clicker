import React, { useState } from 'react'
import { MousePointer2, Trophy, ArrowUpCircle, Loader2, Coins, Zap } from 'lucide-react'
import { Button, Card } from '../../shared/ui/base'
import { formatEther } from 'viem'

export function ClickerCard({ totalOnChain, tokenBalance, onChainLoading, onChainError, onSubmit }) {
    const [localClicks, setLocalClicks] = useState(0)
    const [clickAnimations, setClickAnimations] = useState([])

    const handleClick = (e) => {
        setLocalClicks(p => p + 1)

        // Create floating +1 animation
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const id = Date.now() + Math.random()
        setClickAnimations(prev => [...prev, { id, x, y }])

        // Remove animation after it completes
        setTimeout(() => {
            setClickAnimations(prev => prev.filter(anim => anim.id !== id))
        }, 1000)
    }

    const handleSave = async () => {
        const success = await onSubmit(localClicks)
        if (success !== false) setLocalClicks(0)
    }

    // Format token balance (divide by 10^18 for display)
    const formattedTokens = tokenBalance ? parseFloat(formatEther(tokenBalance)).toFixed(2) : '0.00'

    return (
        <div className="space-y-8">
            {/* Neon Arc Reactor Button */}
            <div className="relative flex justify-center py-10">
                {/* Outer Rotating Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-blue-500/30 border-dashed animate-spin-slow pointer-events-none"></div>

                {/* Inner Counter-Rotating Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-[2px] border-t-purple-500/50 border-r-transparent border-b-blue-500/50 border-l-transparent animate-reverse-spin pointer-events-none"></div>

                {/* Glow Halo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>

                {/* Main Button */}
                <button
                    className="relative w-64 h-64 rounded-full bg-slate-900/80 backdrop-blur-md border-4 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-pulse-glow hover:scale-105 active:scale-95 transition-all duration-300 group"
                    onClick={handleClick}
                >
                    {/* Inner Tech Details */}
                    <div className="absolute inset-2 rounded-full border border-white/5"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-xl absolute inset-0"></div>
                        <MousePointer2 size={80} className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,1)] relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    </div>

                    {/* Text Label */}
                    <div className="absolute inset-x-0 bottom-10 text-center">
                        <div className="text-[10px] items-center justify-center flex gap-1 font-mono text-blue-300/60 uppercase tracking-[0.2em] mb-1">
                            <Zap size={10} /> Tap to earn
                        </div>
                    </div>

                    {/* Click Particles */}
                    {clickAnimations.map(anim => (
                        <div
                            key={anim.id}
                            className="absolute text-2xl font-black text-white italic drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] pointer-events-none animate-float-text"
                            style={{
                                left: anim.x,
                                top: anim.y,
                            }}
                        >
                            +1
                        </div>
                    ))}
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
                <Card className="p-4 bg-secondary/30">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase mb-1">
                        <Trophy size={14} className="text-yellow-500" /> On-Chain
                    </div>
                    <div className="text-2xl font-black">{totalOnChain.toString()}</div>
                </Card>
                <Card className="p-4 bg-secondary/30">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase mb-1">
                        <ArrowUpCircle size={14} className="text-green-500" /> Pending
                    </div>
                    <div className="text-2xl font-black">{localClicks}</div>
                </Card>
            </div>

            {/* Token Stats - Simplified */}
            <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase mb-1">
                            <Coins size={14} className="text-purple-400" /> CLK Balance
                        </div>
                        <div className="text-3xl font-black text-purple-100">{formattedTokens}</div>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-muted-foreground">1 Click = 1 CLK</span>
                    </div>
                </div>
            </Card>

            {/* Instant Save & Mint Button */}
            <Button
                className="w-full h-16 text-lg font-bold rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 relative overflow-hidden group"
                size="lg"
                disabled={localClicks === 0 || onChainLoading}
                onClick={handleSave}
            >
                {onChainLoading ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Minting Tokens...
                    </>
                ) : (
                    <>
                        <Zap className="mr-2 h-5 w-5" />
                        <span>Mint {localClicks > 0 ? `${localClicks} CLK` : 'Tokens'}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </>
                )}
            </Button>

            {onChainError && <p className="text-destructive text-sm font-medium text-center">{onChainError}</p>}
        </div>
    )
}
