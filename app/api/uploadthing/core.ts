import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { auth } from '@/auth'


const f = createUploadthing()


export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: '4MB' } })

    .middleware(async () => {

      const session = await auth()


      if (!session) throw new UploadThingError('Unauthorized')


      return { userId: session?.user?.id }
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .onUploadComplete(async ({ metadata, file }) => {



      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter





export type OurFileRouter = typeof ourFileRouter