'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { createMidtransTransaction } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/models/order.model'
import { formatDateTime } from '@/lib/utils'
import CheckoutFooter from '../checkout-footer'
import { Button } from '@/components/ui/button'
import ProductPrice from '@/components/shared/product/product-price'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function OrderPaymentForm({
  order,
  midtransClientKey,

}: {
  order: IOrder
  midtransClientKey: string
  isAdmin: boolean
}) {
  const { toast } = useToast();
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    expectedDeliveryDate,
    isPaid,

  } = order

  if (isPaid) {
    router.push(`/account/orders/${order._id}`);
  }

  const handleMidtransPayment = async () => {
    setLoading(true)

    const res = await createMidtransTransaction(order._id)
    if (!res.success)
      return toast({
        description: res.message,
        variant: 'destructive',

      })
    const token = res.data?.token

    if (!token) {
      console.error('Midtrans token is missing:', res.data)
      toast({ description: 'Payment token not found.', variant: 'destructive' })
      return
    }

    // Open Midtrans Snap payment popup
    const snapScript = document.createElement('script')
    snapScript.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
    snapScript.setAttribute('data-client-key', midtransClientKey)
    document.body.appendChild(snapScript)

    snapScript.onload = () => {
      setLoading(false)
      window.snap.pay(token, {
        onSuccess: () => {
          toast({ description: 'Payment successful!', variant: 'default' })
          router.push(`/account/orders/${order._id}`)
        },
        onPending: () => {
          toast({ description: 'Waiting for payment...', variant: 'default' })
        },
        onError: () => {
          toast({ description: 'Payment failed.', variant: 'destructive' })
        },
      })

    }
  }

  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>
        <div>
          <div className='text-lg font-bold mb-3'>Rincian Pesanan</div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Harga :</span>
              <span>
                <ProductPrice price={itemsPrice} plain />
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Pengiriman & Penanganan :</span>
              <span>
                {shippingPrice === undefined ? (
                  '--'
                ) : shippingPrice === 0 ? (
                  'Free'
                ) : (
                  <ProductPrice price={shippingPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Pajak 12% :</span>
              <span>
                {taxPrice === undefined ? (
                  '--'
                ) : (
                  <ProductPrice price={taxPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between pt-1 font-bold text-lg'>
              <span>Order Total:</span>
              <span>
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>
            <Button className={`${order.isPaid == true ? 'hidden' : 'block'} w-full rounded-full mt-4`} onClick={handleMidtransPayment}>
              {loading ? 'Loading...' : 'Bayar Sekarang'}
            </Button>

            {order.isPaid === true && (
              <div className='flex gap-2 w-full justify-between pt-4'>
                <Button className='w-full rounded-full' onClick={handleMidtransPayment}>
                  {loading ? 'Loading...' : 'Bayar Sekarang'}
                </Button>
                <Button className='w-full rounded-full' variant='outline' onClick={() => router.push(`/account/orders/${order._id}`)}>View Order</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className='max-w-6xl mx-auto'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* Shipping Address */}
          <div>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>Alamat Pengiriman</div>
              <div className='col-span-2'>
                <p>
                  <span className='capitalize'>{shippingAddress.fullName}</span> <br />
                  {shippingAddress.street} <br />
                  {`${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                </p>
              </div>
            </div>
          </div>
          <div className='grid md:grid-cols-3 my-3 pb-3'>
            <div className='flex text-lg font-bold'>Tanggal Pengiriman</div>
            <div className='col-span-2'>
              <p>
                {formatDateTime(expectedDeliveryDate).dateOnly}
              </p>

            </div>
          </div>
          <div className='grid md:grid-cols-3 my-3 pb-3'>
            <div className='flex text-lg font-bold'>Pesanan</div>
            <div className='col-span-2'>

              <ul>
                {items.map((item) => (

                  <li key={item.slug} className='flex items-start gap-3'>
                    <Image width={75} height={50} src={item.image} alt='produk-image' />
                    <div className='flex flex-col gap-1'>
                      <span>{item.name}</span>
                      {item.quantity} item = {item.price}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Payment Method */}
          <div className='border-y'>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-md font-bold'>Payment Support by:</div>
              <div className='col-span-2'>
                <Link target='_blank' href="https://midtrans.com/">{paymentMethod}</Link>
              </div>
            </div>
          </div>


          <div className='block md:hidden'>
            <CheckoutSummary />
          </div>

          <CheckoutFooter />
        </div>
        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
