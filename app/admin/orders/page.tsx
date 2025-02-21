import { Metadata } from 'next'
import Link from 'next/link'

import { auth } from '@/auth'
import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions'
import { formatDateTime, formatId } from '@/lib/utils'
import { IOrderList } from '@/types'
import ProductPrice from '@/components/shared/product/product-price'
import { CheckIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Orders',
}
export default async function OrdersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams

  const { page = '1' } = searchParams

  const session = await auth()
  if (session?.user.role !== 'Admin')
    throw new Error('Admin permission required')

  const orders = await getAllOrders({
    page: Number(page),
  })


  return (
    <div className='space-y-2'>
      <h1 className='h1-bold'>Orders</h1>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Pembeli</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Pembayaran</TableHead>
              <TableHead>Pengiriman</TableHead>
              <TableHead>Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map((order: IOrderList) => (
              <TableRow key={order._id}>
                <TableCell>{formatId(order._id)}</TableCell>
                <TableCell>
                  {formatDateTime(order.createdAt!).dateTime}
                </TableCell>
                <TableCell className='capitalize'>
                  {order.user ? order.user.name : 'Deleted User'}
                </TableCell>
                <TableCell>
                  {' '}
                  <ProductPrice price={order.totalPrice} plain />
                </TableCell>
                <TableCell className={`font-semibold capitalize text-white ${order.paymentResult?.status === '' ? 'bg-red-600 dark:bg-red-600/60 ' : order.paymentResult?.status === 'Pembayaran Berhasil' ? 'bg-green-600 dark:bg-green-500/60 ' : 'bg-orange-400 dark:bg-orange-400/60 '}`} >

                  {order.paymentResult?.status === '' ?
                    'Belum Dibayar' :
                    order.paymentResult?.status === 'Pembayaran Berhasil' ? order.paymentResult?.status :

                      'Menunggu verifikasi admin'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? <CheckIcon size='16' className='size-6 text-green-600' />
                    : 'no'}
                </TableCell>
                <TableCell className='flex gap-1'>
                  <Button asChild variant='outline' size='sm'>
                    <Link href={`/admin/orders/${order._id}`}>Details</Link>
                  </Button>
                  <DeleteDialog id={order._id} action={deleteOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination page={page} totalPages={orders.totalPages!} />
        )}
      </div>
    </div>
  )
}