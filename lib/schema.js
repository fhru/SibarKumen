import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(6, 'Username minimal 6 karakter'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  name: z.string().min(2, 'Nama terlalu pendek'),
});

export const loginSchema = z.object({
  username: z.string().min(6, 'Username minimal 6 karakter'),
  password: z.string().min(6, 'Username minimal 6 karakter'),
});

export const createUserSchema = z.object({
    username: z.string().min(6, 'Username minimal 6 karakter'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    nama_lengkap: z.string().min(2, 'Nama terlalu pendek'),
    role: z.string(),
});

export const updateUserSchema = z.object({
    nama_lengkap: z.string().min(2, 'Nama terlalu pendek').optional(),
    password: z.string().min(6, 'Password minimal 6 karakter').optional(),
    role: z.string().optional(),
});
