'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  calculateFutureDate,
  formatDateTime,

} from '@/lib/utils'
import { ShippingAddressSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CheckoutFooter from './checkout-footer'
import { ShippingAddress } from '@/types'
import useIsMounted from '@/hooks/use-is-mounted'
import Link from 'next/link'
import useCartStore from '@/hooks/use-cart-store'
import ProductPrice from '@/components/shared/product/product-price'
import {
  APP_NAME,
  AVAILABLE_DELIVERY_DATES,
  // AVAILABLE_PAYMENT_METHODS,
  DEFAULT_PAYMENT_METHOD,
} from '@/lib/constants'
import { createOrder } from '@/lib/actions/order.actions'
import { toast } from '@/hooks/use-toast'

const shippingAddressDefaultValues =
{
  fullName: '',
  street: '',
  city: '',
  province: '',
  phone: '',
  postalCode: '',
  country: '',
}

const CheckoutForm = () => {
  const router = useRouter()

  const {
    cart: {
      items,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      shippingAddress,
      deliveryDateIndex,
      paymentMethod = DEFAULT_PAYMENT_METHOD,
    },
    setShippingAddress,
    // setPaymentMethod,
    updateItem,
    removeItem,
    setDeliveryDateIndex,
    clearCart
  } = useCartStore()
  const isMounted = useIsMounted()

  const shippingAddressForm = useForm<ShippingAddress>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: shippingAddress || shippingAddressDefaultValues,
  })
  const onSubmitShippingAddress: SubmitHandler<ShippingAddress> = (values) => {
    setShippingAddress(values)
    setIsAddressSelected(true)
  }

  useEffect(() => {
    if (!isMounted || !shippingAddress) return
    shippingAddressForm.setValue('fullName', shippingAddress.fullName)
    shippingAddressForm.setValue('street', shippingAddress.street)
    shippingAddressForm.setValue('city', shippingAddress.city)
    shippingAddressForm.setValue('country', shippingAddress.country)
    shippingAddressForm.setValue('postalCode', shippingAddress.postalCode)
    shippingAddressForm.setValue('province', shippingAddress.province)
    shippingAddressForm.setValue('phone', shippingAddress.phone)
  }, [items, isMounted, router, shippingAddress, shippingAddressForm])

  const [isAddressSelected, setIsAddressSelected] = useState<boolean>(false)

  const [isDeliveryDateSelected, setIsDeliveryDateSelected] =
    useState<boolean>(false)

  const handlePlaceOrder = async () => {
    const res = await createOrder({
      items,
      shippingAddress,
      expectedDeliveryDate: calculateFutureDate(
        AVAILABLE_DELIVERY_DATES[deliveryDateIndex!].daysToDeliver
      ),
      deliveryDateIndex,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    })
    if (!res.success) {
      toast({
        description: res.message,
        variant: 'destructive',
      })
    } else {
      toast({
        description: res.message,
        variant: 'default',
      })
      clearCart()
      router.push(`/checkout/${res.data?.orderId}`)
    }
  }
  // const handleSelectPaymentMethod = () => {
  //   setIsAddressSelected(true)

  // }
  // const handleSelectShippingAddress = () => {
  //   shippingAddressForm.handleSubmit(onSubmitShippingAddress)()
  // }
  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>

        <div>
          <div className='text-lg font-bold mb-5'>Rincian Pesanan </div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-sm'>Harga Barang :</span>
              <span>
                <ProductPrice price={itemsPrice} plain />
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'> Biaya Layanan :</span>
              <span>
                {taxPrice === undefined ? (
                  '--'
                ) : (
                  <ProductPrice price={taxPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm'>Biaya Pengiriman :</span>
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
            <div className='flex justify-between  pt-4 font-bold text-lg'>
              <span> Order Total :</span>
              <span>
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>
            {isAddressSelected && (
              <div>
                <Button onClick={handlePlaceOrder} className='rounded-full w-full'>
                  Lanjutkan
                </Button>
                <p className='text-xs text-center py-2'>
                  {' '}
                  Dengan melakukan pemesanan, Anda menyetujui {' '}<Link href='/privacy-policy'>
                    Kebijakan Privasi
                  </Link> dan
                  <Link href='/conditions-of-use'>
                    {' '}
                    ketentuan Penggunaan
                  </Link>
                  {' '}{APP_NAME}.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>

    </Card>
  )

  return (
    <main className='max-w-6xl mx-auto highlight-link'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* shipping address */}
          <div>
            {isAddressSelected && shippingAddress ? (
              <div className='grid grid-cols-1 md:grid-cols-12    my-3  pb-3'>
                <div className='col-span-5 flex text-lg font-bold '>
                  <span className='w-8'>1 </span>
                  <span>Alamat Pengiriman</span>
                </div>
                <div className='col-span-5 '>
                  <p>
                    {shippingAddress.fullName} <br />
                    {shippingAddress.street} <br />
                    {`${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                  </p>
                </div>
                <div className='col-span-2 my-2 md:my0 text-sm'>
                  <Button
                    variant={'outline'}
                    onClick={() => {
                      setIsAddressSelected(false)
                      setIsDeliveryDateSelected(true)
                    }}
                  >
                    Ganti Alamat
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className='flex text-primary text-lg font-bold my-2'>
                  <span className='w-8'>1 </span>
                  <span>Masukkan Alamat Pengiriman</span>
                </div>
                <Form {...shippingAddressForm}>
                  <form
                    method='post'
                    onSubmit={shippingAddressForm.handleSubmit(
                      onSubmitShippingAddress
                    )}
                    className='space-y-4'
                  >
                    <Card className='md:ml-8 my-4'>
                      <CardContent className='p-4 space-y-2'>
                        <div className='text-lg font-bold mb-2'>
                          Alamat Anda
                        </div>

                        <div className='flex flex-col gap-5 md:flex-row'>
                          <FormField
                            control={shippingAddressForm.control}
                            name='fullName'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Nama Lengkap</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='masukan nama lengkap'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={shippingAddressForm.control}
                            name='street'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Alamat Lengkap</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='alamat lengkap'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='flex flex-col gap-5 md:flex-row'>
                          <FormField
                            control={shippingAddressForm.control}
                            name='province'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Provinsi</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='nama provinsi'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={shippingAddressForm.control}
                            name='city'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Kota</FormLabel>
                                <FormControl>
                                  <Input placeholder='nama kota' {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={shippingAddressForm.control}
                            name='country'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Kec. - Kel.</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='kecamatan - kelurahan'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='flex flex-col gap-5 md:flex-row'>
                          <FormField
                            control={shippingAddressForm.control}
                            name='postalCode'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Kode POS</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='kode pos'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={shippingAddressForm.control}
                            name='phone'
                            render={({ field }) => (
                              <FormItem className='w-full'>
                                <FormLabel>Nomor Handphone</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder='nomor handphone'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                      <CardFooter className='  p-4'>
                        <Button
                          type='submit'
                          className='rounded-full font-bold'
                        >
                          Lanjutkan
                        </Button>
                      </CardFooter>
                    </Card>
                  </form>
                </Form>
              </>
            )}
          </div>
          {/* payment method */}
          {/* <div className='border-y hidden'>
            {isPaymentMethodSelected && paymentMethod ? (
              <div className='grid  grid-cols-1 md:grid-cols-12  my-3 pb-3'>
                <div className='flex text-lg font-bold  col-span-5'>
                  <span className='w-8'>2 </span>
                  <span>Payment Method</span>
                </div>
                <div className='col-span-5 '>
                  <p>{paymentMethod}</p>
                </div>
                <div className='col-span-2'>
                  <Button
                    variant='outline'
                    onClick={() => {
                      setIsPaymentMethodSelected(false)
                      if (paymentMethod) setIsDeliveryDateSelected(true)
                    }}
                  >
                    Change
                  </Button>
                </div>
              </div>
            ) : isAddressSelected ? (
              <>
                <div className='flex text-primary text-lg font-bold my-2'>
                  <span className='w-8'>2 </span>
                  <span>Choose a payment method</span>
                </div>
                <Card className='md:ml-8 my-4'>
                  <CardContent className='p-4'>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value)}
                    >
                      {AVAILABLE_PAYMENT_METHODS.map((pm) => (
                        <div key={pm.name} className='flex items-center py-1 '>
                          <RadioGroupItem
                            value={pm.name}
                            id={`payment-${pm.name}`}
                          />
                          <Label
                            className='font-bold pl-2 cursor-pointer'
                            htmlFor={`payment-${pm.name}`}
                          >
                            {pm.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className='p-4'>
                    <Button
                      onClick={handleSelectPaymentMethod}
                      className='rounded-full font-bold'
                    >
                      Use this payment method
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ) : (
              <div className='flex text-muted-foreground text-lg font-bold my-4 py-3'>
                <span className='w-8'>2 </span>
                <span>Choose a payment method</span>
              </div>
            )}
          </div> */}
          {/* items and delivery date */}
          <div>
            {isDeliveryDateSelected && deliveryDateIndex != undefined ? (
              <div className='grid  grid-cols-1 md:grid-cols-12  my-3 pb-3'>
                <div className='flex text-md font-bold  col-span-5'>
                  <span className='w-8'>2 </span>
                  <span>Barang dan Pengiriman</span>
                </div>
                <div className='col-span-5'>
                  <p>
                    Delivery date:{' '}
                    {
                      formatDateTime(
                        calculateFutureDate(
                          AVAILABLE_DELIVERY_DATES[deliveryDateIndex]
                            .daysToDeliver
                        )
                      ).dateOnly
                    }
                  </p>
                  <ul>
                    {items.map((item, _index) => (
                      <li key={_index}>
                        {item.name} x {item.quantity} = {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='col-span-2'>
                  <Button
                    variant={'outline'}
                    onClick={() => {
                      // setIsPaymentMethodSelected(true)
                      setIsDeliveryDateSelected(false)
                    }}
                  >
                    Ganti
                  </Button>
                </div>
              </div>
            ) : isAddressSelected ? (
              <>
                <div className='flex text-primary text-md font-bold my-2'>
                  <span className='w-8'>2 </span>
                  <span>Periksa Pesanan dan Pilih Jasa Pengiriman</span>
                </div>
                <Card className='md:ml-8'>
                  <CardContent className='p-4'>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        {items.map((item, _index) => (
                          <div key={_index} className='flex gap-4 py-2'>
                            <div className='relative w-20 md:w-40 h-20 md:h-40'>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes='40vw'
                                style={{
                                  objectFit: 'contain',
                                }}
                              />
                            </div>

                            <div className='flex-1'>
                              <p className='font-semibold'>
                                {item.name}, {item.color}, {item.size}
                              </p>
                              <p className='font-bold'>
                                <ProductPrice price={item.price} plain />
                              </p>

                              <Select
                                value={item.quantity.toString()}
                                onValueChange={(value) => {
                                  if (value === '0') removeItem(item)
                                  else updateItem(item, Number(value))
                                }}
                              >
                                <SelectTrigger className='w-24'>
                                  <SelectValue>
                                    Qty: {item.quantity}
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
                                  <SelectItem key='delete' value='0'>
                                    Hapus
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className=' font-bold'>
                          <p className='mb-2'>Jasa Pengiriman</p>

                          <ul>
                            <RadioGroup
                              value={AVAILABLE_DELIVERY_DATES[deliveryDateIndex!].name}
                              onValueChange={(value) =>
                                setDeliveryDateIndex(
                                  AVAILABLE_DELIVERY_DATES.findIndex(
                                    (address) => address.name === value
                                  )!
                                )
                              }
                            >
                              {AVAILABLE_DELIVERY_DATES.map((dd) => (
                                <div key={dd.name} className='flex'>
                                  <RadioGroupItem
                                    value={dd.name}
                                    id={`address-${dd.name}`}
                                  />
                                  <Label
                                    className='pl-2 space-y-2 cursor-pointer'
                                    htmlFor={`address-${dd.name}`}
                                  >
                                    <div className='font-semibold space-x-2'>
                                      <span>{dd.name}</span>
                                      <div className='flex gap-1 items-center pt-2'>
                                        <p>{dd.desc}</p>
                                        <i className='text-xs'>diterima</i>
                                        <p className='text-green-700 text-xs md:text-sm'>{
                                          formatDateTime(
                                            calculateFutureDate(dd.daysToDeliver)
                                          ).dateOnly
                                        }</p>
                                        <div>
                                          {(dd.freeShippingMinPrice > 0 &&
                                            itemsPrice >= dd.freeShippingMinPrice
                                            ? 0
                                            : dd.shippingPrice) === 0 ? (
                                            'Free'
                                          ) : (
                                            <ProductPrice
                                              price={dd.shippingPrice}
                                              plain
                                            />
                                          )}
                                        </div>
                                      </div>

                                    </div>

                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className='flex text-muted-foreground text-lg font-bold my-4 py-3'>
                <span className='w-8'>2 </span>
                <span>Barang dan Pengiriman</span>
              </div>
            )}
          </div>
          {isAddressSelected && (
            <div className='mt-6'>
              <div className='block md:hidden'>
                <CheckoutSummary />
              </div>
              {/* BUTTON PLACE ORDER */}
              <Card className='hidden md:block '>
                <CardContent className='p-4 flex flex-col md:flex-row justify-between items-center gap-3'>
                  <Button onClick={handlePlaceOrder} className='rounded-full'>
                    Lanjutkan
                  </Button>
                  <div className='flex-1'>
                    <p className='font-bold text-lg'>
                      Order Total: <ProductPrice price={totalPrice} plain />
                    </p>
                    <p className='text-xs'>
                      {' '}
                      Dengan melakukan pemesanan, Anda menyetujui {' '}<Link href='/privacy-policy'>
                        Kebijakan Privasi
                      </Link> dan
                      <Link href='/conditions-of-use'>
                        {' '}
                        ketentuan Penggunaan
                      </Link>
                      {' '}{APP_NAME}.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <CheckoutFooter />
        </div>
        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
export default CheckoutForm