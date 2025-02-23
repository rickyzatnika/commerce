


import { z } from "zod";
import {
  CartSchema,
  OrderItemSchema,
  ProductInputSchema,
  ShippingAddressSchema,
  UserInputSchema,
  UserSignInSchema,
  UserSignUpSchema,
  OrderInputSchema,
  ReviewInputSchema,
  UserUpdateSchema,
  ReturnInputSchema,
} from '@/lib/validator'



export type IProductInput = z.infer<typeof ProductInputSchema>


export type Data = {
  users: IUserInput[]
  products: IProductInput[]

  headerMenus: {
    name: string
    href: string
  }[]
  carousels: {
    image: string
    url: string
    title: string
    buttonCaption: string
    isPublished: boolean
  }[]

  reviews: {
    title: string
    rating: number
    comment: string
  }[]
}

export type IReviewInput = z.infer<typeof ReviewInputSchema>
export type IReviewDetails = IReviewInput & {
  _id: string
  createdAt: string
  user: {
    name: string
  }
}

export type Cart = z.infer<typeof CartSchema>
export type ShippingAddress = z.infer<typeof ShippingAddressSchema>

// user
export type IUserInput = z.infer<typeof UserInputSchema>
export type IUserSignIn = z.infer<typeof UserSignInSchema>

export type IUserUpdate = z.infer<typeof UserUpdateSchema>
export type IUserSignUp = z.infer<typeof UserSignUpSchema>

// order
export type IOrderInput = z.infer<typeof OrderInputSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
export type IOrderList = IOrderInput & {
  _id: string
  user: {
    name: string
    email: string
  },
  paymentResult?: {
    id: string
    status: string
    email_address: string
    pricePaid: string
  }

  createdAt: Date
}


// Return
export type IReturnInput = z.infer<typeof ReturnInputSchema>


