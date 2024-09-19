import { z } from 'zod';
import { departments } from '../_states/fromAdminDepartments.svelte';

const sectionRegex = /^[A-Z0-9]+-[A-Z0-9]+$/;
const subjectRegex = /^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/;

export const addProfSchema = z.object({
  department: z.string().refine((v) => departments.includes(v)),
  profName: z.string().min(1, { message: 'Must enter professor name.' }),
  subjects: z.string().refine(
    (val) => {
      // Allow a single subject (without commas) or multiple subjects separated by commas
      const subjectPattern = /^[a-zA-Z0-9]+(,[a-zA-Z0-9]+)*$/;
      return subjectPattern.test(val);
    },
    {
      message: 'Subjects must be either a single subject or a comma-separated list of subjects.'
    }
  ),
  sections: z.string().refine(
    (value) => {
      // Ensure there are no leading or trailing spaces
      const trimmedValue = value.trim();

      // Reject if the trimmed value doesn't match the original value (indicating leading/trailing spaces)
      if (trimmedValue !== value) {
        return false;
      }

      // Split the sections by comma
      const sectionsArray = trimmedValue.split(',');

      // Ensure each section is valid and has no leading/trailing spaces
      return sectionsArray.every((section) => sectionRegex.test(section));
    },
    {
      message: 'Invalid section format.'
    }
  )
});

export const updateProfSchema = z.object({
  profId: z.number(),
  department: z
    .string()
    .refine((v) => departments.includes(v), { message: 'Must enter a valid department' }),
  profName: z.string().min(1, { message: 'Must enter professor name.' }),
  sections: z.string().refine(
    (value) => {
      // Ensure there are no leading or trailing spaces
      const trimmedValue = value.trim();

      // Reject if the trimmed value doesn't match the original value (indicating leading/trailing spaces)
      if (trimmedValue !== value) {
        return false;
      }

      // Split the sections by comma
      const sectionsArray = trimmedValue.split(',');

      // Ensure each section is valid and has no leading/trailing spaces
      return sectionsArray.every((section) => sectionRegex.test(section));
    },
    {
      message: 'Invalid section format.'
    }
  )
});

export type AddProfSchema = typeof addProfSchema;
export type UpdateProfSchema = typeof updateProfSchema;
