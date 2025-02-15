
'use server'
import { Cart, OrderItem, ShippingAddress } from '@/types'
import { formatError, round2 } from '../utils'
import { AVAILABLE_DELIVERY_DATES, PAGE_SIZE } from '../constants'
import { connectToDatabase } from '../db'
import { auth } from '@/auth'
import { OrderInputSchema } from '../validator'
import Order, { IOrder } from '../db/models/order.model'
import midtransClient from 'midtrans-client'
import { sendPurchaseReceipt } from "@/emails";



// CREATE
export const createOrder = async (clientSideCart: Cart) => {
  try {
    await connectToDatabase()
    const session = await auth()
    if (!session) throw new Error('User not authenticated')
    // recalculate price and delivery date on the server
    const createdOrder = await createOrderFromCart(
      clientSideCart,
      session.user.id!
    )
    return {
      success: true,
      message: 'Order placed successfully',
      data: { orderId: createdOrder._id.toString() },
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}
export const createOrderFromCart = async (
  clientSideCart: Cart,
  userId: string
) => {
  const cart = {
    ...clientSideCart,
    ...calcDeliveryDateAndPrice({
      items: clientSideCart.items,
      shippingAddress: clientSideCart.shippingAddress,
      deliveryDateIndex: clientSideCart.deliveryDateIndex,
    }),
  }

  const order = OrderInputSchema.parse({
    user: userId,
    items: cart.items,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
    expectedDeliveryDate: cart.expectedDeliveryDate,
  })
  return await Order.create(order)
}



export const calcDeliveryDateAndPrice = async ({
  items,
  shippingAddress,
  deliveryDateIndex,
}: {
  deliveryDateIndex?: number
  items: OrderItem[]
  shippingAddress?: ShippingAddress
}) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )



  const deliveryDate =
    AVAILABLE_DELIVERY_DATES[
    deliveryDateIndex === undefined
      ? AVAILABLE_DELIVERY_DATES.length - 1
      : deliveryDateIndex
    ]

  const shippingPrice =
    !shippingAddress || !deliveryDate
      ? undefined
      : deliveryDate.freeShippingMinPrice > 0 &&
        itemsPrice >= deliveryDate.freeShippingMinPrice
        ? 0
        : deliveryDate.shippingPrice

  const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.12)

  const totalPrice = round2(
    itemsPrice +
    (shippingPrice ? round2(shippingPrice) : 0) +
    (taxPrice ? round2(taxPrice) : 0)
  )
  return {
    AVAILABLE_DELIVERY_DATES,
    deliveryDateIndex:
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }
}

export async function getOrderById(orderId: string): Promise<IOrder> {
  await connectToDatabase()
  const order = await Order.findById(orderId)
  return JSON.parse(JSON.stringify(order))
}


// MID_TRANS ENDPOINT
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY as string,
  clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
})

export async function createMidtransTransaction(orderId: string) {
  await connectToDatabase()

  try {
    const order = await Order.findById(orderId).populate('user', 'email');


    if (!order) throw new Error('Order not found')

    if (order.paymentResult?.id) {
      return {
        success: true,
        message: 'Midtrans order already exists',
        data: { token: order.paymentResult.id },
      };
    }

    const userEmail = typeof order.user === 'object' && 'email' in order.user ? order.user.email : '';

    const midtransOrder = await snap.createTransaction({
      transaction_details: {
        order_id: order._id.toString(),
        gross_amount: order.totalPrice,

      },
      customer_details: {
        first_name: order.shippingAddress.fullName,
        phone: order.shippingAddress.phone,
        email: userEmail,
        billing_address: {
          first_name: order.shippingAddress.fullName,
          email: userEmail,
          phone: order.shippingAddress.phone,
          address: order.shippingAddress.street,
          city: order.shippingAddress.city,
          postal_code: order.shippingAddress.postalCode,

        },
      }
    });

    if (!midtransOrder || !midtransOrder.token) {
      throw new Error('Midtrans token not found')
    }

    // ✅ Pastikan token diambil dengan benar
    const paymentToken = midtransOrder.token || ''


    order.paymentResult = {
      id: paymentToken,
      email_address: userEmail,
      status: '',
      pricePaid: '0',
    }

    await order.save()
    await sendPurchaseReceipt({ order });

    return {
      success: true,
      message: '✅ Midtrans order created successfully',
      data: { token: paymentToken },
    }
  } catch (error) {
    console.error('Midtrans Error:', error)
    return { success: false, message: "Error saat membuat transaksi Midtrans" }
  }
}



// GET
export async function getMyOrders({
  limit,
  page,
}: {
  limit?: number
  page: number
}) {
  limit = limit || PAGE_SIZE
  await connectToDatabase()
  const session = await auth()
  if (!session) {
    throw new Error('User is not authenticated')
  }
  const skipAmount = (Number(page) - 1) * limit
  const orders = await Order.find({
    user: session?.user?.id,
  })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(limit)
  const ordersCount = await Order.countDocuments({ user: session?.user?.id })

  return {
    data: JSON.parse(JSON.stringify(orders)),
    totalPages: Math.ceil(ordersCount / limit),
  }
}