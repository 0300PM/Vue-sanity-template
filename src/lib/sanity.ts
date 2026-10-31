import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim()
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim()

export const isSanityConfigured = Boolean(
  projectId && projectId !== 'your_project_id' && dataset,
)

const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-02-19',
      useCdn: true,
    })
  : null

export interface Post {
  _id: string
  title: string
  excerpt: string | null
  publishedAt: string | null
}

export async function getPosts(): Promise<Post[]> {
  if (!client) return []

  return client.fetch<Post[]>(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    publishedAt
  }`)
}
