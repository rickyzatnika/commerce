import { IReturnInput } from '@/types'
import { Document, Model, model, models, Schema } from 'mongoose'

export interface IReturn extends Document, IReturnInput {
  _id: string
  createdAt: Date
  updatedAt: Date
}
const reviewSchema = new Schema<IReturn>(
  {

    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    prodName: {
      type: String,
    },
    reason: {
      type: String,
    },
    qty: {
      type: String,
    },
    isReturn: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
)

const Reture =
  (models.Reture as Model<IReturn>) || model<IReturn>('Reture', reviewSchema)

export default Reture