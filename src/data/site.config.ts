interface SiteConfig {
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	author: 'Ada', // Site author
	title: 'Adas Rezepte', // Site title.
	description: 'Eine Sammlung meiner Rezepte', // Description to display in the meta tags
	lang: 'de-DE',
	ogLocale: 'de_DE',
	shareMessage: 'Schau dir das Rezept an', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
