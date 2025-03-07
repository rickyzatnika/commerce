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
import { Button, buttonVariants } from '@/components/ui/button'
import ProductPrice from '../product/product-price'
import ActionButton from '../action-button'
import { deliverOrder, updateOrderToPaid } from '@/lib/actions/order.actions'
import moment from 'moment'
import 'moment/locale/id';
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

  const router = useRouter();

  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,

    isDelivered,
    // deliveredAt,
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

            {isAdmin && isDelivered &&
              <Badge className='p-2'>Dikirim</Badge>
            }


            {!isAdmin && !isDelivered && !isPaid && <Badge variant="destructive" className='p-2'>Belum dikirim</Badge>}

            {!isAdmin && isDelivered && (
              <Badge className='p-2'>
                <Check className='h-4 w-4 ' />Estimasi barang sampai {moment(expectedDeliveryDate).format('D MMMM YYYY')}
              </Badge>
            )}

          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4 gap-4'>
            <h2 className='text-xl pb-2'>Status Pembayaran</h2>
            {isPaid && paymentResult?.status === "Pembayaran Berhasil" ? (
              <div className="flex items-center ">
                <Badge className="bg-green-500 dark:bg-green-500/40 p-2 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Pembayaran di setujui
                </Badge>
              </div>
            ) : paymentResult?.status ? (
              <Badge className="bg-primary w-fit p-2 flex items-center gap-1">
                <Check className="h-4 w-4" />
                Menunggu Verifikasi Admin
              </Badge>
            ) : (
              <Badge variant="destructive" className='p-2'>Belum Dibayar</Badge>
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
                  {isPaid && paymentResult?.status === "Pembayaran Berhasil" && <TableHead>Review</TableHead>}
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
                    {isPaid && isDelivered && paymentResult?.status === "Pembayaran Berhasil" && (
                      <TableCell >
                        <Button onClick={() => router.push(`/product/${item.slug}`)}>
                          Review
                        </Button>
                      </TableCell>
                    )}
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
                isAdmin={isAdmin}
                paymentResult={paymentResult}
                caption='Setujui Pembayaran'
                action={() => updateOrderToPaid(order._id)}
              />
            )}
            {isAdmin && isPaid && !isDelivered && (
              <ActionButton
                caption='Konfirmasi Pengiriman Barang'
                action={() => deliverOrder(order._id)}
              />
            )}



            {
              !isAdmin && paymentResult.status !== "pembayaran sedang diproses" && paymentResult.status !== "Pembayaran Berhasil" && (
                <Link
                  className={cn(buttonVariants(), 'w-full')}
                  href={`/checkout/${order._id}`}
                >
                  Lanjutkan Pembayaran
                </Link>
              )
            }


          </CardContent>
        </Card>
      </div>
    </div>
  )
}