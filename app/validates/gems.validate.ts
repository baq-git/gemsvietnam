import { z } from 'zod'

export const CreateUpdateGemSchema = z.object({
  id: z.string().optional(),
  gemName: z
    .string()
    .min(1, { message: 'gem name is required' })
    .max(50, { message: 'less than 50 characters' }),
  description: z.string().optional(),
  instruction: z.string().optional(),
  gemCategoryId: z
    .string()
    .min(1, { message: 'Category ID must not be empty' }),
  coordinates: z.number().array().nonempty('have to pin the gem location'),
})
