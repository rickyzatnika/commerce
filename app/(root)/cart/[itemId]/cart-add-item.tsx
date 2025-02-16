'use client'
import ProductPrice from '@/components/shared/product/product-price'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import useCartStore from '@/hooks/use-cart-store'

import BrowsingHistoryList from '@/components/shared/browsing-history-list'

export default function CartAddItem({ itemId }: { itemId: string }) {
  const {
    cart: { items, itemsPrice },
  } = useCartStore()
  const item = items.find((x) => x.clientId === itemId)

  if (!item) return notFound()
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
        <Card className='w-full rounded-none'>
          <CardContent className='flex h-full items-center justify-center  gap-3 py-4'>
            <Link href={`/product/${item.slug}`}>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={75}
                priority
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Link>
            <div>
              <h3 className='text-sm font-semibold flex gap-2 my-2'>
                <CheckCircle2Icon className='h-8 w-8 text-green-700' />
                Ditambahkan ke Keranjang
              </h3>
              <p className='text-sm uppercase'>
                <span className='font-bold capitalize'> Color: </span>{' '}
                {item.color ?? '-'}
              </p>
              <p className='text-sm '>
                <span className='font-bold'> Size: </span>{' '}
                {item.size ?? '-'}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 h-full'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='flex justify-center items-center'>
                <p className='text-red-500 txt-xl font-semibold animate-bounce'>GRATIS ONGKIR!</p>
              </div>
              <div className='lg:border-l lg:border-muted lg:pl-3 flex flex-col items-center gap-3  '>
                <div className='flex gap-3'>
                  <span className='text-lg font-bold'>Cart Subtotal:</span>
                  <ProductPrice className='text-2xl' price={itemsPrice} />
                </div>
                <Link
                  href='/checkout'
                  className={cn(buttonVariants(), 'rounded-full w-full')}
                >
                  Lanjutkan Pembayaran (
                  {items.reduce((a, c) => a + c.quantity, 0)} items)
                </Link>
                <Link
                  href='/cart'
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'rounded-full w-full'
                  )}
                >
                  Lihat Keranjang
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BrowsingHistoryList />
    </div>
  )
}