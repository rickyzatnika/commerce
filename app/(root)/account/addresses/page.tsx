import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'


import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ShippingAddressForm } from './addressForm'

const PAGE_TITLE = 'Alamat Pengiriman'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

export default async function AddressPage() {
  const session = await auth()
  return (
    <div className='mb-24'>
      <SessionProvider session={session}>
        <div className='flex gap-2 mb-6'>
          <Link href='/account'>Account</Link>
          <span>›</span>
          <Link href='/account/addresses'>Addresses</Link>
        </div>

        <Card className='max-w-2xl'>
          <CardContent className='p-4 flex justify-between flex-wrap'>
            <ShippingAddressForm />
          </CardContent>
        </Card>
      </SessionProvider>
    </div>
  )
}