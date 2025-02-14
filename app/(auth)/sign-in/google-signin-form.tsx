'use client'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'
import Image from 'next/image'

export function GoogleSignInForm() {
  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className='w-full flex gap-1 items-center' variant='outline'>
        {pending ? 'Redirecting to Google...' : <>
          <div className='flex items-center gap-1'>
            <p>Sign In with </p>
            <Image src="/icons/google.png" alt='google' width={14} height={14} priority />

          </div>
          <span className='-ml-1'>oogle</span>
        </>}
      </Button>
    )
  }
  return (
    <form action={SignInWithGoogle}>
      <SignInButton />
    </form>
  )
}