'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import { formatError } from '../utils'
import { ReturnInputSchema } from '../validator'
import { connectToDatabase } from '../db'
import Reture from '../db/models/return.model'




export async function createReturn({
  data,

}: {
  data: z.infer<typeof ReturnInputSchema>

}) {
  try {
    await connectToDatabase()

    const session = await auth()
    if (!session) {
      throw new Error('User is not authenticated')
    }

    const retur = ReturnInputSchema.parse({
      ...data,

    })

    await Reture.create(retur)
    return {
      success: true,
      message: 'Review created successfully',
      data: JSON.parse(JSON.stringify(retur)),
    }

  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    }
  }
}