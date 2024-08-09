import { z } from 'zod';

export const adminLoginSchema = z.object({
	email: z.string().email({ message: 'Must enter a valid admin email.' }),
	password: z.string().min(1, { message: 'Must enter a password.' })
});

export type AdminLoginSchema = typeof adminLoginSchema;
