import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { loginSchema } from '@/lib/schema';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ userId: user.id_user, username: user.username, role: user.role });

    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
