import { useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CLICKER_ABI } from '../../../shared/lib/viem'

export function useClicker() {
    const { address } = useAccount()

    // Read total clicks
    const {
        data: totalOnChain,
        refetch: refetchClicks,
        isPending: isReadPending,
        error: readError
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CLICKER_ABI,
        functionName: 'getClicks',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    })

    // Read token balance
    const {
        data: tokenBalance,
        refetch: refetchBalance,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CLICKER_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    })

    // Write contract
    const {
        data: hash,
        writeContract,
        isPending: isWritePending,
        error: writeError
    } = useWriteContract()

    // Wait for transaction
    const {
        isLoading: isWaiting,
        isSuccess
    } = useWaitForTransactionReceipt({
        hash,
    })

    // Refetch all data after successful transaction
    useEffect(() => {
        if (isSuccess) {
            refetchClicks()
            refetchBalance()
        }
    }, [isSuccess, refetchClicks, refetchBalance])

    const submitClicks = async (count) => {
        if (!address || count === 0) return

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CLICKER_ABI,
            functionName: 'recordClicks',
            args: [BigInt(count)]
        })
    }

    return {
        totalOnChain: totalOnChain || 0n,
        tokenBalance: tokenBalance || 0n,
        isPending: isReadPending || isWritePending || isWaiting,
        error: readError?.message || writeError?.message,
        submitClicks,
        refetch: () => {
            refetchClicks()
            refetchBalance()
        }
    }
}
