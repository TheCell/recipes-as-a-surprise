import { CATEGORIES } from '../src/data/categories.ts';
import { MEASURES } from '../src/data/measures.ts';
import { PORTION } from '../src/data/portion.ts';
import { TIMES } from '../src/data/times.ts';
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/src/assets/images",
      publicFolder: "",
    },
  },
  schema: {
    collections: [
      {
        name: 'recipe',
        label: 'Recipe',
        path: 'src/content/recipe',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true
          },
          {
            type: 'string',
            label: 'description',
            required: true,
            name: 'description',
            description: 'A short description of the recipe'
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Publication Date',
            required: true
          },
          {
            type: 'image',
            label: 'Cover Image',
            required: true,
            name: 'image',
            description: 'The image used for the cover of the recipe'
          },
          {
            type: 'string',
            required: true,
            name: 'category',
            label: 'Category',
            description: 'Select a category for this recipe',
            options: [...CATEGORIES]
          },
          {
              label: "Portionen",
              name: "portion",
              type: "object",
              fields: [
                {
                  type: 'number',
                  name: 'amount',
                  label: 'Amount'
                },
                {
                  type: 'string',
                  required: true,
                  name: 'portion',
                  label: 'Portion',
                  description: 'Portion type',
                  options: [...PORTION]
                },
              ]
          },
          {
            label: "Overview",
            name: "overview",
            type: "object",
            fields: [
              {
                type: 'number',
                name: 'activeTime',
                label: 'Active Time',
              },
              {
                type: 'string',
                required: true,
                name: 'activeTimeUnit',
                label: 'Active Time Unit',
                description: 'The time you have to actively prepare and cook',
                options: [...TIMES]
              },
              {
                type: 'number',
                name: 'totalTime',
                label: 'Total Time',
              },
              {
                type: 'string',
                required: true,
                name: 'totalTimeUnit',
                label: 'Total Time Unit',
                description: 'The time active time and the time you have to let ingredients rest',
                options: [...TIMES]
              },
            ]
          },
          {
            label: "Ingredients",
            name: "ingredients",
            type: "object",
            list: true,
            fields: [
              {
                label: "Name",
                name: "name",
                type: "string",
                required: false,
                description: 'Ingredient list Name ex. Main Dish, Sauce etc.',
              },
              {
                label: "Ingredients",
                name: "ingredients",
                type: "object",
                list: true,
                fields: [
                  {
                    label: "Name",
                    name: "name",
                    type: "string",
                    required: true,
                    description: 'Ingredient Name ex. Rice',
                  },
                  {
                    type: 'number',
                    name: 'amount',
                    label: 'Amount',
                    description: 'How much of the ingredient is needed',
                  },
                  {
                    type: 'string',
                    required: true,
                    name: 'measure',
                    label: 'Measure',
                    description: 'Whats the measure? kg, g, ml etc.',
                    options: [...MEASURES]
                  },
                ]
              }
            ]
          },
          {
            name: 'draft',
            label: 'Draft',
            type: 'boolean',
            description: 'If this is checked the recipe will not be published'
          },
          {
            type: 'string',
            name: 'tags',
            required: true,
            label: 'Tags',
            description: 'Tags for this recipe',
            list: true,
            ui: {
              component: 'tags'
            }
          },
          {
            type: 'rich-text',
            label: 'Body',
            name: 'SButton',
            isBody: true,
            templates: [
              // Custom Components
              {
                label: 'SButton',
                name: 'SButton',
                fields: [
                  {
                    type: 'rich-text',
                    label: 'SButton',
                    name: 'children',
                    isBody: true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
});
