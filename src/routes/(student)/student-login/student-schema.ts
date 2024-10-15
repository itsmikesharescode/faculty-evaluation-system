import { courseNames, yearLevels } from '$lib';
import { z } from 'zod';

const sectionRegex = /^[A-Z0-9]+-[A-Z0-9]+$/;

export const studentLoginSchema = z.object({
  email: z.string().email({ message: 'Must enter a valid email.' }),
  password: z.string().min(1, { message: 'Must enter a password' })
});
///2021-01999
export const studentCreateSchema = z
  .object({
    email: z.string().email({ message: 'Must enter a valid email.' }),
    idNumber: z.string().regex(/^\d{4}-\d{5}$/, {
      message: 'Not valid id number'
    }),
    firstName: z.string().min(1, { message: 'Must enter first name.' }),
    middleInitial: z
      .string()
      .min(1, { message: 'Must enter middle initial.' })
      .max(1, { message: 'Max char is 1.' }),
    lastName: z.string().min(1, { message: 'Must enter last name.' }),
    nameSuffix: z.string().optional(),
    gender: z
      .string()
      .refine((v) => ['Male', 'Female'].includes(v), { message: 'Must enter a valid gender.' }),
    yearLevel: z.string().refine((v) => yearLevels.includes(v), {
      message: 'Must enter a valid year level'
    }),
    course: z
      .string()
      .refine((v) => courseNames.includes(v), { message: 'Must choose your course.' }),
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
    ),
    password: z.string().min(8, { message: 'Must choose a strong password.' }),
    confirmPassword: z.string()
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Confirm password must match Password.',
        path: ['confirmPassword']
      });
    }
  });

export const studentForgotPwdSchema = z.object({
  email: z.string().email({ message: 'Must enter a valid email.' })
});

export type StudentLoginSchema = typeof studentLoginSchema;
export type StudentCreateSchema = typeof studentCreateSchema;
export type StudentForgotPwdSchema = typeof studentForgotPwdSchema;

export const studentUpdatePwdSchema = z
  .object({
    newPwd: z.string().min(8, { message: 'Must choose a strong password.' }),
    confirmNewPwd: z.string()
  })
  .superRefine(({ newPwd, confirmNewPwd }, ctx) => {
    if (newPwd !== confirmNewPwd) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords must match.',
        path: ['confirmNewPwd']
      });
    }
  });

export type StudentUpdatePwdSchema = typeof studentUpdatePwdSchema;
