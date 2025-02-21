'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SignOut } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { updateUsers } from '@/lib/actions/user.actions'
import { UserUpdateSchema } from '@/lib/validator'

export const ProfileForm = () => {

  const { data: session, update } = useSession()
  const { toast } = useToast()


  const form = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      _id: session?.user?.id ?? '',
      name: session?.user?.name ?? '',
      email: session?.user?.email ?? '',
      role: session?.user?.role ?? '',
      password: '',
      confirmPassword: '',
    },
  })

  // HANDLE SUBMIT
  async function onSubmit(values: z.infer<typeof UserUpdateSchema>) {
    const res = await updateUsers(values)
    if (!res.success)
      return toast({
        variant: 'destructive',
        description: res.message,
      })

    const { data, message } = res
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: data.name,
        email: data.email
      },
    }
    await update(newSession)
    toast({
      description: message,
    })
    await SignOut();
  }


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=' w-full flex flex-col gap-5'
      >
        <div className='flex gap-2 '>
          <div className='w-full flex flex-col gap-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='font-bold'>Nama</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Name'
                      {...field}
                      className='input-field'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='font-bold'>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Email'
                      {...field}
                      className='input-field'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className='w-full flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='font-bold'>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Password'
                      {...field}
                      className='input-field'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel className='font-bold'>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Konfirmasi Password'
                      {...field}
                      className='input-field'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='button col-span-2 w-full'
        >
          {form.formState.isSubmitting ? 'menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </form>
    </Form>
  )
}