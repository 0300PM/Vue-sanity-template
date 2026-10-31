import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  vite: { server: { allowedHosts: ['.e2b.app'] } },
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
})
