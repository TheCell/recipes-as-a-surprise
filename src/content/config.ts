import { defineCollection, z } from 'astro:content';
import { CATEGORIES } from '@/data/categories';
import { MEASURES } from '@/data/measures';
import { PORTION } from '@/data/portion';
import { TIMES } from '@/data/times';

const recipe = defineCollection({
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string().default(''),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			image: image(),
			category: z.enum(CATEGORIES),
			portion: z.object({
				amount: z.number(),
				portion: z.enum(PORTION),
			}),
			ingredients: z.array(z.object({
				name: z.string().default('Zutaten'),
				ingredients: z.array(z.object({
					name: z.string(),
					amount: z.number(),
					measure: z.enum(MEASURES),
				})),
			})),
			overview: z.object({
				activeTime: z.number(),
				activeTimeUnit: z.enum(TIMES),
				totalTime: z.number(),
				totalTimeUnit: z.enum(TIMES),
			}),
			tags: z.array(z.string()),
			draft: z.boolean().default(false)
		})
})

export const collections = { recipe }
