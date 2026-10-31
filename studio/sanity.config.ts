import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID
const dataset = import.meta.env.SANITY_STUDIO_DATASET

if (!projectId || projectId === 'your_project_id' || !dataset) {
  throw new Error('Uzupełnij SANITY_STUDIO_PROJECT_ID i SANITY_STUDIO_DATASET w studio/.env.local.')
}

export default defineConfig({
  name: 'default',
  title: 'Studio Template',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
