import { Metadata } from 'next'
import Link from 'next/link'
import Pagination from '@/components/shared/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getMyOrders } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/models/order.model'
import { formatId } from '@/lib/utils'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import ProductPrice from '@/components/shared/product/product-price'
import moment from 'moment'
import 'moment/locale/id';

const PAGE_TITLE = 'Pesanan Saya'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}
export default async function OrdersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1
  const orders = await getMyOrders({
    page,
  })

  moment.locale('id');

  return (
    <div>
      <div className='flex gap-2'>
        <Link href='/account'>Profile Account</Link>
        <span>›</span>
        <span >{PAGE_TITLE}</span>
      </div>
      <h1 className='h1-bold pt-4'>{PAGE_TITLE}</h1>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Dibayar</TableHead>
              <TableHead>Dikirim</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className=''>
                  <i className='font-bold'>Belum ada transaksi pembelian.</i>
                </TableCell>
              </TableRow>
            )}
            {orders.data.map((order: IOrder) => (
              <TableRow key={order._id}>
                <TableCell>
                  <Link href={`/account/orders/${order._id}`}>
                    {formatId(order._id)}
                  </Link>
                </TableCell>
                <TableCell>
                  {moment(order.createdAt!).format('D MMMM YYYY')}
                </TableCell>
                <TableCell>
                  <ProductPrice price={order.totalPrice} plain />
                </TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt

                    ? moment(order.paidAt!).format('D MMMM YYYY, HH.mm')
                    : 'No'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.deliveredAt
                    ? moment(order.deliveredAt!).format('D MMMM YYYY')
                    : 'No'}
                </TableCell>
                <TableCell>
                  <Link href={`/account/orders/${order._id}`}>
                    <span className='px-2'>Lihat Detail</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination page={page} totalPages={orders.totalPages} />
        )}
      </div>
      <BrowsingHistoryList className='mt-16' />
    </div>
  )
}