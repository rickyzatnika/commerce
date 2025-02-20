import React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import ProductPrice from '@/components/shared/product/product-price'
import { IOrder } from '@/lib/db/models/order.model'





export default function CheckoutSummary({
  order,
}: {
  order: IOrder
  midtransClientKey: string
}) {
  const {

    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,


  } = order


  return (

    <Card className=' mt-6'>
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
              <span>Biaya Layanan :</span>
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

          </div>
        </div>
      </CardContent>
    </Card>
  )

}

