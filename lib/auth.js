import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import prisma from './prisma'

export async function getUser() {
  const token = cookies().get('token')?.value

  if (!token) {
    return null
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    
    const user = await prisma.users.findUnique({
        where: { id_user: payload.userId },
        select: {
            id_user: true,
            nama_lengkap: true,
            username: true,
            role: true,
        }
    })

    return user
  } catch (error) {
    return null
  }
}
