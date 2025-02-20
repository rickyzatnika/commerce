'use client'

import ReCAPTCHA from 'react-google-recaptcha'
import { useToast } from '@/hooks/use-toast'
import { createMidtransTransaction } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/models/order.model'
import { formatDateTime } from '@/lib/utils'
import CheckoutFooter from '../checkout-footer'
import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import CheckoutSummary from './checkoutSummer'
import { SITE_KEY } from '@/lib/constants'
// import Link from 'next/link'


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
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const {
    shippingAddress,
    items,
    expectedDeliveryDate,
    isPaid,

  } = order

  if (isPaid) {
    router.push(`/account/orders/${order._id}`);
  }

  const handleMidtransPayment = async () => {
    setLoading(true)

    if (!recaptchaValue) {
      toast({
        description: 'Please complete the reCAPTCHA.',
        variant: 'destructive',
      })
      setLoading(false)
    }

    const res = await createMidtransTransaction(order._id)
    if (!res.success) {
      toast({
        description: res.message,
        variant: 'destructive',
      })
      setLoading(false)
    }

    const token = res.data?.token || ''

    if (!token) {
      console.error('Midtrans token is missing:', res.data)
      toast({ description: 'Payment token not found.', variant: 'destructive' })
      setLoading(false)
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
          setLoading(false)
        },
      })

    }
  }

  const handleRecaptcha = (token: string) => {
    setRecaptchaValue(token)
  }


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

              <ul className='w-full'>
                {items.map((item) => (

                  <div key={item.slug} className=''>
                    <li className='flex items-start gap-3'>
                      <Image width={75} height={50} src={item.image} alt='produk-image' />
                      <div className='flex flex-col gap-1'>
                        <span>{item.name}</span>
                        {item.quantity} item = {item.price}
                      </div>
                    </li>

                    <li>
                      <CheckoutSummary order={order} midtransClientKey={midtransClientKey} />
                    </li>
                  </div>
                ))}
                <div className='my-5' >
                  <ReCAPTCHA
                    sitekey={SITE_KEY}
                    onChange={handleRecaptcha}
                  />
                </div>
                <li >
                  <div className='border-y w-full'>
                    <div className='grid  my-3 pb-3'>
                      <Button className={`${order.isPaid == true ? 'hidden' : 'block'} w-full rounded-full mt-4`} onClick={handleMidtransPayment}>
                        {loading ? 'tunggu sebentar...' : 'Metode Pembayaran'}
                      </Button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Payment Method */}



          {/* <div className='block md:hidden'>
            <CheckoutSummary order={order} midtransClientKey={midtransClientKey} />
          </div> */}

          <CheckoutFooter />
        </div>
        {/* <div className='hidden md:block'>
          <CheckoutSummary order={order} midtransClientKey={midtransClientKey} />
        </div> */}
      </div>
    </main>
  )
}
