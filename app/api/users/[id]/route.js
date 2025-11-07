import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { updateUserSchema } from '@/lib/schema';
import bcrypt from 'bcryptjs';

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { nama_lengkap, password, role, status } = updateUserSchema.parse(body);

        const updateData = {};
        if (nama_lengkap) {
            updateData.nama_lengkap = nama_lengkap;
        }
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        if (role) {
            updateData.role = role;
        }
        if (status) {
            updateData.status = status;
        }

        const updatedUser = await prisma.users.update({
            where: { id_user: parseInt(id, 10) },
            data: updateData,
        });

        return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        if (error.name === 'ZodError') {
            return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        await prisma.users.delete({
            where: { id_user: parseInt(id, 10) },
        });

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
