import { z } from 'zod';

const questionArray = z.object({
  id: z.string().min(1, { message: 'Must have an unique id.' }),
  question: z.string().min(1, { message: 'Must enter a question.' })
});

const headerArray = z.object({
  id: z.string().min(1, { message: 'Must have an unique id.' }),
  headerTitle: z.string().min(1, { message: 'Must enter a header title.' }),
  questions: z.array(questionArray).min(1, { message: 'Must have at least 1 question.' })
});

export const surveyCreationSchema = z.object({
  evalTitle: z.string().min(1, { message: 'Must enter an evaluation title.' }),
  headers: z.array(headerArray).min(1, { message: 'Must have at least 1 header.' }),
  remark: z.object({
    title: z.string().min(1, { message: 'Must enter title' }),
    value: z.string().optional()
  })
});

export type SurveyCreationSchema = z.infer<typeof surveyCreationSchema>;
