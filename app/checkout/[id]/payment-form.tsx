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
          <div className='text-lg font-bold'>Order Summary</div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Items:</span>
              <span>
                <ProductPrice price={itemsPrice} plain />
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping & Handling:</span>
              <span>
                {shippingPrice === undefined ? (
                  '--'
                ) : shippingPrice === 0 ? (
                  'FREE'
                ) : (
                  <ProductPrice price={shippingPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Tax:</span>
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

            <Button className={`${order?.paymentResult ? 'hidden' : 'block'} w-full rounded-full`} onClick={handleMidtransPayment}>
              Pay Now
            </Button>
            {order?.paymentResult && (
              <div className='flex gap-2 w-full justify-between'>
                <Button className='w-full rounded-full' onClick={handleMidtransPayment}>
                  Pay Now
                </Button>
                <Button className='w-full rounded-full' variant='outline' onClick={() => window.location.reload()}>Check</Button>
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
              <div className='text-lg font-bold'>Shipping Address</div>
              <div className='col-span-2'>
                <p>
                  {shippingAddress.fullName} <br />
                  {shippingAddress.street} <br />
                  {`${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className='border-y'>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>Payment Method</div>
              <div className='col-span-2'>
                <p>{paymentMethod}</p>
              </div>
            </div>
          </div>

          <div className='grid md:grid-cols-3 my-3 pb-3'>
            <div className='flex text-lg font-bold'>Items and shipping</div>
            <div className='col-span-2'>
              <p>
                Delivery date: {formatDateTime(expectedDeliveryDate).dateOnly}
              </p>
              <ul>
                {items.map((item) => (
                  <li key={item.slug}>
                    {item.name} x {item.quantity} = {item.price}
                  </li>
                ))}
              </ul>
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
