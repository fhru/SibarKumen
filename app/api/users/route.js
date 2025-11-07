import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createUserSchema } from '@/lib/schema';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id_user: true,
        nama_lengkap: true,
        username: true,
        role: true,
        created_at: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password, nama_lengkap, role, status } = createUserSchema.parse(body);

        const existingUser = await prisma.users.findUnique({
            where: { username },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                username,
                password: hashedPassword,
                nama_lengkap,
                role,
                status,
            },
        });

        return NextResponse.json({ message: 'User created successfully', user: { id: newUser.id_user, username: newUser.username, name: newUser.nama_lengkap, role: newUser.role } }, { status: 201 });
    } catch (error) {
        if (error.name === 'ZodError') {
            return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
