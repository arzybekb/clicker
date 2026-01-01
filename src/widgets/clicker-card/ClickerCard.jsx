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
            <div
                className="relative group cursor-pointer"
                onClick={handleClick}
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <button className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-secondary flex items-center justify-center transform active:scale-95 transition-all shadow-2xl">
                    <MousePointer2 size={64} className="text-primary group-hover:rotate-12 transition-transform" />
                    <div className="absolute inset-x-0 bottom-4 text-center text-xs font-bold text-muted-foreground uppercase tracking-widest">Tap to Earn</div>

                    {/* Click animations */}
                    {clickAnimations.map(anim => (
                        <div
                            key={anim.id}
                            className="click-number"
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
                        <span className="text-xs text-muted-foreground">1 Click = 10 CLK</span>
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
                        <span>Mint {localClicks > 0 ? `${localClicks * 10} CLK` : 'Tokens'}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </>
                )}
            </Button>

            {onChainError && <p className="text-destructive text-sm font-medium text-center">{onChainError}</p>}
        </div>
    )
}
