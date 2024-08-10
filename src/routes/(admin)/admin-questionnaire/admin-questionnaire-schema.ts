import { z } from 'zod';

// Create a base schema for the static fields
export const createEvalSchema = z.object({
	evalTitle: z.string().min(1, { message: 'Must enter evaluation title.' })
});

// Function to dynamically add fields to the schema
export const addDynamicFields = (schema: z.ZodObject<any>, count: number) => {
	const dynamicFields: Record<string, z.ZodTypeAny> = {};

	for (let i = 1; i <= count; i++) {
		dynamicFields[`question${i}`] = z
			.string()
			.min(1, { message: `Question ${i} must not be empty` });
	}

	return schema.extend(dynamicFields);
};
