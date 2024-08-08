import { z } from 'zod';

export const studentLoginSchema = z.object({
	email: z.string().email({ message: 'Must enter a valid email.' })
});

export type StudentLoginSchema = typeof studentLoginSchema;
