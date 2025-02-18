import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Link,
} from '@react-email/components'

import { formatCurrency } from '@/lib/utils'
import { IOrder } from '@/lib/db/models/order.model'
import { APP_NAME, SERVER_URL } from '@/lib/constants'

type OrderInformationProps = {
  order: IOrder
}

PurchaseReceiptEmail.PreviewProps = {
  order: {
    _id: '1234',
    isPaid: true,
    paidAt: new Date(),
    totalPrice: 100,
    itemsPrice: 100,
    taxPrice: 0,
    shippingPrice: 0,
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    shippingAddress: {
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      postalCode: '12345',
      country: 'USA',
      phone: '123-456-7890',
      province: 'New York',
    },
    items: [
      {
        clientId: '123',
        name: 'Product 1',
        image: 'https://via.placeholder.com/150',
        price: 100,
        quantity: 1,
        product: '123',
        slug: 'product-1',
        category: 'Category 1',
        countInStock: 10,
      },
    ],
    paymentMethod: 'PayPal',
    expectedDeliveryDate: new Date(),
    isDelivered: true,
  } as IOrder,
} satisfies OrderInformationProps
const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export default async function PurchaseReceiptEmail({
  order,
}: OrderInformationProps) {
  return (
    <Html>
      <Preview>Tanda Terima Pesanan</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading>Tanda Terima Pembelian</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Order ID
                  </Text>
                  <Text className='mt-0 mr-4'>{order._id.toString()}</Text>
                </Column>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Dibeli Pada
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
                    Harga yang Dibayar
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4'>
              {order.items.map((item) => (
                <Row key={item.product} className='mt-8'>
                  <Column className='w-20'>
                    <Link href={`${SERVER_URL}/product/${item.slug}`}>
                      <Img
                        width='80'
                        alt={item.name}
                        className='rounded'
                        src={
                          item.image.startsWith('/')
                            ? `${SERVER_URL}${item.image}`
                            : item.image
                        }
                      />
                    </Link>
                  </Column>
                  <Column className='align-top'>
                    <Link href={`${SERVER_URL}/product/${item.slug}`}>
                      <Text className='mx-2 my-0'>
                        {item.name} x {item.quantity}
                      </Text>
                    </Link>
                  </Column>
                  <Column align='right' className='align-top'>
                    <Text className='m-0 '>{formatCurrency(item.price)}</Text>
                  </Column>
                </Row>
              ))}
              {[
                { name: 'Harga Produk', price: order.itemsPrice },
                { name: 'Pajak 12%', price: order.taxPrice },
                { name: 'Ongkos Kirim', price: order.shippingPrice },
                { name: 'Total', price: order.totalPrice },
              ].map(({ name, price }) => (
                <Row key={name} className='py-1'>
                  <Column align='right'>{name}:</Column>
                  <Column align='right' width={70} className='align-top'>
                    <Text className='m-0'>{formatCurrency(price)}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
            <Section>
              <Text className='mb-0 text-center py-4 text-gray-900 whitespace-nowrap text-nowrap '>
                Terima kasih telah berbelanja di toko kami &quot;{APP_NAME}&quot;! Kami tunggu kedatangan Anda berikutnya. 😊✨
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}