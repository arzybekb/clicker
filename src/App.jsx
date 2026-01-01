import { Header } from './widgets/header/Header'
import { ClickerCard } from './widgets/clicker-card/ClickerCard'
import { useAccount } from 'wagmi'
import { useClicker } from './features/clicker/hooks/useClicker'
import { Button } from './shared/ui/base'
import { useConnectModal } from '@rainbow-me/rainbowkit'

function App() {
    const { isConnected } = useAccount()
    const { openConnectModal } = useConnectModal()
    const { totalOnChain, tokenBalance, isPending, error, submitClicks } = useClicker()

    return (
        <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-primary selection:text-primary-foreground">
            <div className="max-w-2xl mx-auto px-6 py-12">
                <Header />

                <main className="flex flex-col items-center justify-center space-y-12 py-8">
                    {!isConnected ? (
                        <div className="w-full text-center space-y-8 py-16">
                            <div className="space-y-4">
                                <h2 className="text-4xl sm:text-6xl font-black tracking-tight">
                                    The Future of <br />
                                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent italic">Clicking</span>
                                </h2>
                                <p className="text-slate-400 text-lg sm:text-xl max-w-md mx-auto">
                                    Earn points on-chain. Your progress, your ownership. Secured by Sepolia.
                                </p>
                            </div>
                            <Button
                                size="lg"
                                className="rounded-full px-12 h-16 text-xl font-black shadow-2xl shadow-blue-500/20"
                                onClick={openConnectModal}
                            >
                                Start Playing
                            </Button>
                        </div>
                    ) : (
                        <ClickerCard
                            totalOnChain={totalOnChain}
                            tokenBalance={tokenBalance}
                            onChainLoading={isPending}
                            onChainError={error}
                            onSubmit={submitClicks}
                        />
                    )}
                </main>

                <footer className="mt-24 text-center py-8 border-t border-slate-900">
                    <p className="text-slate-500 text-sm font-medium">
                        Kairat's Web 3 course pet project by Arzybek
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default App
