import { z } from 'zod';

export const createProgramSchema = z.object({
  name: z.string().min(1, { message: 'Must enter a program name.' }),
  code: z.string().min(1, { message: 'Must enter program code.' })
});

export const updateProgramSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Must enter a program name.' }),
  code: z.string().min(1, { message: 'Must enter program code.' })
});

export const deleteProgramSchema = z.object({
  id: z.number()
});

export type CreateProgramSchema = typeof createProgramSchema;
export type UpdateProgramSchema = typeof updateProgramSchema;
export type DeleteProgramSchema = typeof deleteProgramSchema;
