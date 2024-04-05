import { getCollection, type ImageFunction } from 'astro:content'

export const getRecipes = async (max?: number) => {
	return (await getCollection('recipe'))
		.filter((recipe) => !recipe.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}

interface RecipeTeaser {
	title: string;
	pubDate: Date;
	slug: string;
	image: {
		src: string;
		width: number;
		height: number;
		format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
	}; // I will have to clean this up later
}

export const getLatestRecipes = async (max?: number, excludeId?: string ) => {
	const teasers: Array<RecipeTeaser> = [];
	(await getCollection('recipe'))
		.filter((recipe) => !recipe.data.draft && recipe.id !== excludeId)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
		.forEach((recipe) => {
			const recipeTeaser: RecipeTeaser = {
				title: recipe.data.title,
				pubDate: recipe.data.pubDate,
				slug: recipe.slug,
				image: recipe.data.image
			}
			teasers.push(recipeTeaser);
		});
	

	return teasers;
}