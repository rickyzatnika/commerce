/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IOrder } from '@/lib/db/models/order.model'
import { cn, formatCurrency } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import ProductPrice from '../product/product-price'
import ActionButton from '../action-button'
import { deliverOrder, updateOrderToPaid } from '@/lib/actions/order.actions'
import moment from 'moment'
import 'moment/locale/id';
import { Check } from 'lucide-react'

type ResultProps = {
  id: string
  status: string
  email_address: string
  pricePaid: string
}

export default function OrderDetailsForm({
  order,
  isAdmin,
}: {
  order: IOrder
  isAdmin: boolean
  paymentResult?: ResultProps
}) {
  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,

    isDelivered,
    deliveredAt,
    expectedDeliveryDate,
    paymentResult,
  } = order

  return (
    <div className='grid md:grid-cols-3 md:gap-5'>
      <div className='overflow-x-auto md:col-span-2 space-y-4'>
        <Card>
          <CardContent className='p-4 gap-4'>
            <h2 className='text-xl pb-4'>Status Pengiriman</h2>
            <p>
              {shippingAddress.fullName} {shippingAddress.phone}
            </p>
            <p className='mb-2'>
              {shippingAddress.street}, {shippingAddress.city},{' '}
              {shippingAddress.province}, {shippingAddress.postalCode},{' '}
              {shippingAddress.country}{' '}
            </p>

            {isDelivered ? (
              <Badge className=''>
                <Check className='h-4 w-4 pr-1' />{' '}  Dikirim pada {' '}{moment(deliveredAt).format('D MMMM YYYY')}
                <div>
                  Perkiraan pengiriman pada{' '}
                  {moment(expectedDeliveryDate).format('D MMMM YYYY')}
                </div>
              </Badge>
            ) : (
              <div>
                {' '}
                <Badge variant='destructive'>Belum dikirim</Badge>

              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 gap-4'>
            <h2 className='text-xl pb-2'>Status Pembayaran</h2>
            {isPaid && paymentResult?.status === "Pembayaran Berhasil" ? (
              <div className="flex items-center">
                <Badge className="bg-green-500 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Pembayaran Berhasil
                </Badge>
              </div>
            ) : paymentResult?.status ? (
              <Badge className="bg-orange-400 flex items-center gap-1">
                <Check className="h-4 w-4" />
                {paymentResult.status}
              </Badge>
            ) : (
              <Badge variant="destructive">Belum Dibayar</Badge>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 gap-4'>
            <h2 className='text-xl pb-4'>Barang Pesanan</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Barang</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Harga</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className='flex items-center'
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        <span className='px-2'>{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className='px-2'>{item.quantity}</span>
                    </TableCell>
                    <TableCell >{formatCurrency(item.price)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardContent className='p-4  space-y-4 gap-4'>
            <h2 className='text-xl pb-4'>Rincian Pesanan</h2>
            <div className='flex justify-between'>
              <div>Harga Barang :</div>
              <div>
                {' '}
                <ProductPrice price={itemsPrice} plain />
              </div>
            </div>
            <div className='flex justify-between'>
              <div>Biaya Layanan :</div>
              <div>
                {' '}
                <ProductPrice price={taxPrice} plain />
              </div>
            </div>
            <div className='flex justify-between'>
              <div>Biaya Pengiriman :</div>
              <div>
                {' '}
                <ProductPrice price={shippingPrice} plain />
              </div>
            </div>
            <div className='flex justify-between'>
              <div>Total</div>
              <div>
                {' '}
                <ProductPrice price={totalPrice} plain />
              </div>
            </div>
            {isAdmin && !isPaid && (
              <ActionButton
                caption='Mark as paid'
                action={() => updateOrderToPaid(order._id)}
              />
            )}
            {isAdmin && isPaid && !isDelivered && (
              <ActionButton
                caption='Mark as delivered'
                action={() => deliverOrder(order._id)}
              />
            )}


            {!isPaid && !isAdmin && (
              <Link
                className={cn(buttonVariants(), 'w-full')}
                href={`/checkout/${order._id}`}
              >
                Bayar
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}