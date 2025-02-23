/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { createReturn } from '@/lib/actions/return.action'
import { ReturnInputSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'


const reviewFormDefaultValues = {
  name: '',
  email: '',
  phone: '',
  prodName: '',
  reason: '',
  qty: '',
}

export default function ReturnPage() {
  type CustomerReturn = z.infer<typeof ReturnInputSchema>

  const router = useRouter();


  const form = useForm<CustomerReturn>({
    resolver: zodResolver(ReturnInputSchema),
    defaultValues: reviewFormDefaultValues,
  })
  const { toast } = useToast()
  const onSubmit: SubmitHandler<CustomerReturn> = async (values) => {



    const res = await createReturn({
      data: { ...values },
    })
    if (!res.success)
      return toast({
        variant: 'destructive',
        description: res.message,
      })

    toast({
      description: res.message,
    })
    router.push(`/account/orders`)

  }


  return (
    <div>
      <div className='space-y-2'>
        <h1 className='font-bold text-xl md:text-2xl'>Formulir Pengembalian Barang</h1>
        <p className='text-sm md:text-md'>Mohon isi formulir pengembalian barang di bawah ini</p>
      </div>
      <Form {...form}>
        <form method='post' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='w-full flex flex-col item-center gap-4 py-4'>
            <div className='flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <div className='w-full flex flex-col items-start'>
                    <FormItem className='w-full flex items-center gap-2 '>
                      <FormLabel className='w-full basis-1/4 text-md font-bold'>Nama Lengkap</FormLabel>
                      <span>:</span>
                      <FormControl className='w-full shadow-none '>
                        <Input placeholder='masukkan nama lengkap' className='focus-visible:outline-none rounded-none focus-visible:border-none ' {...field} />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <div className='w-full flex flex-col items-start'>
                    <FormItem className='w-full flex items-center gap-2 '>
                      <FormLabel className='w-full basis-1/4 text-md font-bold'>Alamat Email</FormLabel>
                      <span>:</span>
                      <FormControl className='w-full shadow-none '>
                        <Input placeholder='masukkan email' className='focus-visible:outline-none rounded-none focus-visible:border-none ' {...field} />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <div className='w-full flex flex-col items-start'>
                    <FormItem className='w-full flex items-center gap-2 '>
                      <FormLabel className='w-full basis-1/4 text-md font-bold'>Nomor Whatsapp</FormLabel>
                      <span>:</span>
                      <FormControl className='w-full shadow-none '>
                        <Input placeholder='08xx-xxxx-xxxx' className='focus-visible:outline-none rounded-none focus-visible:border-none ' {...field} />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name='prodName'
                render={({ field }) => (
                  <div className='w-full flex flex-col items-start'>
                    <FormItem className='w-full flex items-center gap-2' >
                      <FormLabel className='w-full basis-1/4 text-md font-bold'>Nama Produk </FormLabel>
                      <span>:</span>
                      <FormControl className='w-full shadow-none '>
                        <Input placeholder='DYZ xxx' className='focus-visible:outline-none rounded-none focus-visible:border-none ' {...field} />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name='qty'
                render={({ field }) => (
                  <div className='w-full flex flex-col items-start'>
                    <FormItem className='w-full flex items-center gap-2 '>
                      <FormLabel className='w-full basis-1/4 text-md font-bold'>Jumlah Produk </FormLabel>
                      <span>:</span>
                      <FormControl className='w-full shadow-none '>
                        <Input placeholder='1' className='focus-visible:outline-none rounded-none focus-visible:border-none ' {...field} />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name='reason'
                render={({ field }) => (
                  <div className='w-full flex flex-col items-start '>
                    <FormItem className='w-full flex items-center gap-2'>
                      <FormLabel className='w-full basis-1/4 text-md font-bold'>Alasan Pengembalian</FormLabel>
                      <span>:</span>
                      <FormControl className='w-full shadow-none '>
                        <Input placeholder='' className='focus-visible:outline-none rounded-none focus-visible:border-none ' {...field} />
                      </FormControl>
                    </FormItem>
                    <FormMessage />
                  </div>
                )}
              />

            </div>
            <DialogFooter>
              <Button
                type='submit'
                size='lg'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? 'Submitting...'
                  : 'Submit'}
              </Button>
            </DialogFooter>
          </div>


        </form >
      </Form >
    </div >
  )
}


