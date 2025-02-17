/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { getUserShippingAddress, updateShippingAddress } from '@/lib/actions/order.actions'
import Link from 'next/link'

const ShippingSchema = z.object({
  fullName: z.string().min(2, 'Nama lengkap tidak valid'),
  phone: z.string().min(10, 'Nomor telepon tidak valid'),
  country: z.string().min(2, 'Negara tidak valid'),
  province: z.string().min(2, 'Provinsi tidak valid'),
  street: z.string().min(3, 'Alamat terlalu pendek'),
  city: z.string().min(2, 'Kota tidak valid'),
  postalCode: z.string().min(3, 'Kode Pos tidak valid'),

})

export const ShippingAddressForm = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<typeof ShippingAddressForm | null>(null);
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<z.infer<typeof ShippingSchema>>({
    resolver: zodResolver(ShippingSchema),
    defaultValues: {
      fullName: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      province: '',
      phone: '',
    },
  })

  useEffect(() => {
    async function fetchAddress() {
      const datas = await getUserShippingAddress();

      setData(datas);
      if (datas) {
        form.reset(datas) // Set default form values
      }
      setLoading(false);
    }
    fetchAddress()
  }, [form]);

  async function onSubmit(values: z.infer<typeof ShippingSchema>) {
    const res = await updateShippingAddress({ newAddress: values })
    if (!res.success) {
      return toast({
        variant: 'destructive',
        description: res.message,
      })
    }

    toast({ description: 'Alamat berhasil diperbarui!' })
    router.push('/account/addresses')
  }

  if (loading) return <p>Loading...</p>


  if (!data) return <i className='font-bold py-2'>Alamat tidak ditemukan.</i>


  return (

    <Form {...form}>
      <h1>Alamat Pengiriman</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nama Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Alamat Lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="Alamat lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Kota</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Kota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Kode Pos</FormLabel>
                <FormControl>
                  <Input placeholder="Kode Pos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Negara</FormLabel>
              <FormControl>
                <Input placeholder="Negara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Provinsi</FormLabel>
              <FormControl>
                <Input placeholder="Provinsi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nomor Handphone</FormLabel>
              <FormControl>
                <Input placeholder="Nomor Handphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="button w-full">
          {form.formState.isSubmitting ? 'Submitting...' : 'Simpan Perubahan'}
        </Button>
      </form>
    </Form >
  )
}
