'use client'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface ResultProps {
  status: string
}

export default function ActionButton({
  caption,
  action,
  className = 'w-full',
  variant = 'default',
  size = 'default',
  isAdmin,
  paymentResult
}: {
  caption: string
  action: () => Promise<{ success: boolean; message: string }>
  className?: string
  isAdmin?: boolean
  paymentResult?: ResultProps
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
}) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  return (
    <Button
      type='button'
      className={cn('rounded-full text-[#080808]', className)}
      variant={variant}
      size={size}
      disabled={isPending || (isAdmin && paymentResult?.status === '')}
      onClick={() =>
        startTransition(async () => {
          const res = await action()
          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message,
          })
        })
      }
    >
      {isPending ? 'processing...' : caption}
    </Button>
  )
}