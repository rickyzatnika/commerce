export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'DYZ'
export const APP_SLOGAN = process.env.NEXT_PUBLIC_APP_SLOGAN || 'Look Different'
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || ''


// export const RAJA_ONGKIR_API = process.env.RAJA_ONGKIR_API || ''

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'
export const SENDER_NAME = process.env.SENDER_NAME || APP_NAME + APP_SLOGAN
export const SITE_KEY = process.env.SITE_KEY || "6Lf20N4qAAAAAN5LSfmh0vjt8Qf1fpQQdfLbyzg0"
export const USER_ROLES = ['Admin', 'User']
export const COLORS = ['Gold', 'Green', 'Red']
export const THEMES = ['Light', 'Dark', 'System']
export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)
export const FREE_SHIPPING_MIN_PRICE = Number(
    process.env.FREE_SHIPPING_MIN_PRICE || 100000
)

export const APP_COPYRIGHT = process.env.NEXT_PUBLIC_APP_COPYRIGHT || `Copyright © 2025 ${APP_NAME}. All rights reserved.`

export const AVAILABLE_PAYMENT_METHODS = [
    {
        name: 'MIDTRANS (Payment Gateway) ',
        commission: 0,
        isDefault: true,
    },

]
export const DEFAULT_PAYMENT_METHOD = "MIDTRANS (Payment Gateway)"

export const AVAILABLE_DELIVERY_DATES = [
    {
        name: 'JNE Express',
        desc: '1 Hari',
        daysToDeliver: 1,
        shippingPrice: 12000,
        freeShippingMinPrice: 0,
    },
    {
        name: 'JNE Reguler',
        desc: '3 Hari',
        daysToDeliver: 3,
        shippingPrice: 9000,
        freeShippingMinPrice: 0,
    },
    {
        name: 'GRATIS ONGKIR',
        desc: '5 Hari',
        daysToDeliver: 5,
        shippingPrice: 0,
        freeShippingMinPrice: 0,
    }

]





