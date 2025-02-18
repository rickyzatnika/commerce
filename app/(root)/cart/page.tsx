'use client'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import ProductPrice from '@/components/shared/product/product-price'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCartStore from '@/hooks/use-cart-store'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CartPage() {
  const {
    cart: { items, itemsPrice },
    updateItem,
    removeItem,
  } = useCartStore()
  const router = useRouter()
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-4  md:gap-4'>
        {items.length === 0 ? (
          <Card className='col-span-4 rounded-none'>
            <CardHeader className='text-2xl md:text-3xl flex items-center '>
              Keranjang Belanja Anda kosong
              <Image src="/icons/sad.png" alt='emoticon' width={75} height={50} priority={true} />
            </CardHeader>
          </Card>
        ) : (
          <>
            <div className='col-span-3'>
              <Card className='rounded-none'>
                <CardHeader className='text-2xl items-center gap-2 pb-0'>
                  <ShoppingCart className='text-xl w-10 h-10 text-yellow-400' />
                  <span>Keranjang Belanja</span>
                </CardHeader>
                <CardContent className='p-4'>
                  <i className='flex justify-end border-b mb-4'>Harga Barang</i>

                  {items.map((item, i: number) => (
                    <div
                      key={item.clientId}
                      className='flex flex-col md:flex-row justify-between py-4 border-b gap-4'
                    >
                      <div className='flex gap-1 items-start'>
                        <p>{i + 1}.</p>
                        <Link href={`/product/${item.slug}`}>
                          <div className='relative w-40 h-40'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes='20vw'
                              style={{
                                objectFit: 'contain',
                              }}
                            />
                          </div>
                        </Link>
                      </div>

                      <div className='flex-1 space-y-4'>
                        <Link
                          href={`/product/${item.slug}`}
                          className='text-lg hover:no-underline  '
                        >
                          {item.name}
                        </Link>
                        <div >
                          <p className='text-sm'>
                            <span className='font-bold'>Warna : </span>{' '}
                            {item.color}
                          </p>
                          <p className='text-sm py-2'>
                            <span className='font-bold'>Ukuran : </span>{' '}
                            {item.size}
                          </p>
                          <p className='text-sm'>
                            <span className='font-bold'>Stok : </span>{' '}
                            {item.countInStock} item
                          </p>
                        </div>
                        <div className='flex gap-2 items-center'>
                          <Select
                            value={item.quantity.toString()}
                            onValueChange={(value) =>
                              updateItem(item, Number(value))
                            }
                          >
                            <SelectTrigger className='w-auto'>
                              <SelectValue>
                                Quantity : {item.quantity}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent position='popper'>
                              {Array.from({
                                length: item.countInStock,
                              }).map((_, i) => (
                                <SelectItem key={i + 1} value={`${i + 1}`}>
                                  {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant={'outline'}
                            onClick={() => removeItem(item)}
                          >
                            Hapus
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className='text-right'>
                          {item.quantity > 1 && (
                            <>
                              {item.quantity} x
                              <ProductPrice price={item.price} plain />
                              <br />
                            </>
                          )}

                          <span className='font-bold text-lg'>
                            <ProductPrice
                              price={item.price * item.quantity}
                              plain
                            />
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className='flex justify-end text-lg my-2'>
                    Total (
                    {items.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    Item):{' '}
                    <span className='font-bold ml-1'>
                      <ProductPrice price={itemsPrice} plain />
                    </span>{' '}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className='rounded-none'>
                <CardContent className='py-4 space-y-4'>
                  <div className='text-lg'>
                    <div className='w-full flex gap-4'>
                      <span>Item: </span>
                      <span>{items.reduce((acc, item) => acc + item.quantity, 0)}{' '}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                      Total:
                      <span className='font-bold'>
                        <ProductPrice price={itemsPrice} plain />
                      </span>{' '}
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push('/checkout')}
                    className='rounded-full w-full'>
                    Lanjutkan Pembayaran
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
      <BrowsingHistoryList className='mt-10' />
    </div>
  )
}