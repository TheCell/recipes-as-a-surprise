import { getCollection } from 'astro:content'

export const getRecipes = async (max?: number) => {
	return (await getCollection('recipe'))
		.filter((recipe) => !recipe.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}