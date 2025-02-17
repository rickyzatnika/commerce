'use server'
import bcrypt from 'bcryptjs'
import { auth, signIn, signOut } from '@/auth'
import { IUserSignIn, IUserSignUp, IUserUpdate } from '@/types'
import { redirect } from 'next/navigation'
import { UserSignUpSchema, UserUpdateSchema } from '../validator'
import { connectToDatabase } from '../db'
import User, { IUser } from '../db/models/user.model'
import { formatError } from '../utils'
import { revalidatePath } from 'next/cache'
import { PAGE_SIZE } from '../constants'
import { z } from 'zod'

export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn('credentials', { ...user, redirect: false })
}
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false })
  redirect(redirectTo.redirect)
}

export const SignInWithGoogle = async () => {
  await signIn('google')
}

// CREATE
export async function registerUser(userSignUp: IUserSignUp) {
  try {
    const user = await UserSignUpSchema.parseAsync({
      name: userSignUp.name,
      email: userSignUp.email,
      password: userSignUp.password,
      confirmPassword: userSignUp.confirmPassword,
    })

    await connectToDatabase()
    await User.create({
      ...user,
      password: await bcrypt.hash(user.password, 5),
    })
    return { success: true, message: 'User created successfully' }
  } catch (error) {
    return { success: false, error: formatError(error) }
  }
}


// UPDATE BY USER
export async function updateUsers(user: IUserUpdate) {
  try {
    await connectToDatabase();
    const session = await auth();
    const currentUser = await User.findById(session?.user?.id);
    if (!currentUser) throw new Error('User not found');

    if (user.password && user.confirmPassword) {
      if (user.password !== user.confirmPassword) {
        throw new Error('Password dan konfirmasi password tidak cocok');
      }
      currentUser.password = await bcrypt.hash(user.password, 5);
    } else {
      currentUser.password = currentUser.password;
    }

    currentUser.name = user.name;
    currentUser.email = user.email;

    const updatedUser = await currentUser.save();
    return {
      success: true,
      message: 'User updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}


// DELETE

export async function deleteUser(id: string) {
  try {
    await connectToDatabase()
    const res = await User.findByIdAndDelete(id)
    if (!res) throw new Error('Use not found')
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User deleted successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

// GET
export async function getAllUsers({
  limit,
  page,
}: {
  limit?: number
  page: number
}) {
  limit = limit || PAGE_SIZE
  await connectToDatabase()

  const skipAmount = (Number(page) - 1) * limit
  const users = await User.find()
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(limit)
  const usersCount = await User.countDocuments()
  return {
    data: JSON.parse(JSON.stringify(users)) as IUser[],
    totalPages: Math.ceil(usersCount / limit),
  }
}





// Update UserByAdmin
export async function updateUserByAdmin(user: z.infer<typeof UserUpdateSchema>) {
  try {
    await connectToDatabase()
    const dbUser = await User.findById(user._id)
    if (!dbUser) throw new Error('User not found')

    if (user.password && user.confirmPassword) {
      if (user.password !== user.confirmPassword) {
        throw new Error('Password dan konfirmasi password tidak cocok');
      }
      const hashedPassword = await bcrypt.hash(user.password, 5);
      dbUser.password = hashedPassword;
    } else {
      dbUser.password = dbUser.password;
    }

    dbUser.name = user.name
    dbUser.email = user.email
    dbUser.role = user.role


    const updatedUser = await dbUser.save()
    revalidatePath('/admin/users')
    return {
      success: true,
      message: 'User updated successfully',
      data: JSON.parse(JSON.stringify(updatedUser)),
    }
  } catch (error) {
    console.error(error); // tambahkan log untuk memeriksa kesalahan
    return { success: false, message: formatError(error) }
  }
}

// GET USER BY ID
export async function getUserById(userId: string) {
  await connectToDatabase()
  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  return JSON.parse(JSON.stringify(user)) as IUser
}