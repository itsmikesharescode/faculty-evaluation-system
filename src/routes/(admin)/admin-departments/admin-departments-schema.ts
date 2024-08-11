import { z } from 'zod';

const sectionRegex = /^[0-9]{7}[A-Z]{2}[0-9]?$/;

export const addProfSchema = z.object({
	profName: z.string().min(1, { message: 'Must enter professor name.' }),
	sections: z.string().refine(
		(value) => {
			// Split the sections by comma
			const sectionsArray = value.split(',');

			// Check each section against the regex
			return sectionsArray.every((section) => sectionRegex.test(section));
		},
		{
			message: 'Invalid section format. Please use formats like 1234567KK or 1234567KK1,1234567KK2.'
		}
	)
});

export type AddProfSchema = typeof addProfSchema;
