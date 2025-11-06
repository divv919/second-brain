import { QdrantClient } from '@qdrant/js-client-rest'
import { getGeminiClient } from './embedding.server'
import { root } from 'cheerio/dist/commonjs/static'
const COLLECTION_NAME = 'Content'
interface dataType {
  userId: string | undefined
  type: 'youtube' | 'twitter' | 'other'
  link: string
  title: string
  tags: string[]
}
let globalClient: QdrantClient | null = null
const qdrantUrl = process.env.QDRANT_URL
const qdrantApiKey = process.env.QDRANT_API_KEY
function getClient() {
  if (!globalClient) {
    globalClient = new QdrantClient({ url: qdrantUrl, apiKey: qdrantApiKey })
  }
  return globalClient
}
export async function initCollection() {
  const client = getClient()
  try {
    const collectionAlreadyPresent = await client.getCollection(COLLECTION_NAME)

    // Check if collection exists and has the correct size
    if (collectionAlreadyPresent) {
      const config = collectionAlreadyPresent.config?.params?.vectors
      const vectorSize =
        typeof config === 'object' && 'size' in config ? config.size : null

      // If collection exists with wrong size, delete it
      if (vectorSize !== 3072) {
        console.log(
          `Collection exists with size ${vectorSize}, but we need 3072. Deleting and recreating...`
        )
        await client.deleteCollection(COLLECTION_NAME)
        await client.createCollection(COLLECTION_NAME, {
          vectors: { size: 3072, distance: 'Cosine' },
        })
        console.log('Qdrant collection recreated with correct size')
      } else {
        console.log('Qdrant connected successfully')
      }
    } else {
      // Collection doesn't exist, create it with correct size
      await client.createCollection(COLLECTION_NAME, {
        vectors: { size: 3072, distance: 'Cosine' },
      })
      console.log('Qdrant collection created successfully')
    }
  } catch (error: any) {
    // If collection doesn't exist, create it
    if (error?.status === 404 || error?.message?.includes('not found')) {
      await client.createCollection(COLLECTION_NAME, {
        vectors: { size: 3072, distance: 'Cosine' },
      })
      console.log('Qdrant collection created successfully')
    } else {
      throw error
    }
  }
}

export async function embedAndUpsert(data: dataType) {
  try {
    console.log('Enter embedandupsert')

    const textToEmbed = `
  User ID: ${data.userId ?? 0}
  Type: ${data.type}
  Title: ${data.title}
  Link: ${data.link}
  Tags: ${data.tags.join(', ')}
`.trim()
    console.log({ textToEmbed })
    const geminiClient = getGeminiClient()

    const result = await geminiClient.models.embedContent({
      contents: textToEmbed,

      model: 'gemini-embedding-001',
    })
    console.log('result of embedding ', result.embeddings)

    const qdrantClient = getClient()
    const vector = Array.isArray(result.embeddings)
      ? result.embeddings[0]?.values ||
        result.embeddings[0] ||
        result.embeddings
      : result.embeddings

    // Ensure it's a flat number array
    const vectorArray =
      Array.isArray(vector) && typeof vector[0] === 'number'
        ? vector
        : Array.isArray(result.embeddings) && result.embeddings[0]?.values
        ? result.embeddings[0].values
        : []
    const resultUpsert = await qdrantClient.upsert(COLLECTION_NAME, {
      points: [
        {
          id: crypto.randomUUID(),
          payload: { ...data } as Record<string, unknown>,
          vector: vectorArray,
        },
      ],
    })
    console.log('result of upsert ', resultUpsert)

    return resultUpsert
  } catch (err) {
    console.log('Error embedding and upserting', err)
    // return err
  }
}

export async function embedAndQuery(query: string) {
  console.log('Enter embed and query')
  const geminiClient = getGeminiClient()

  const result = await geminiClient.models.embedContent({
    contents: query,
    model: 'gemini-embedding-001',
  })
  const vector = Array.isArray(result.embeddings)
    ? result.embeddings[0]?.values || result.embeddings[0] || result.embeddings
    : result.embeddings

  // Ensure it's a flat number array
  const vectorArray =
    Array.isArray(vector) && typeof vector[0] === 'number'
      ? vector
      : Array.isArray(result.embeddings) && result.embeddings[0]?.values
      ? result.embeddings[0].values
      : []
  console.log('result of embedding ', vectorArray)

  const qdrantClient = getClient()
  const resultQuery = await qdrantClient.query(COLLECTION_NAME, {
    query: vectorArray,
    with_payload: true,
  })

  console.log('resultquery', resultQuery)

  const contextPayloads = resultQuery.points
    .map((p) => JSON.stringify(p.payload))
    .join('\n')

  console.log('contextPayloads', contextPayloads)

  const resultLLM = await geminiClient.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `
You are an assistant that uses only the provided context.

Context:
${contextPayloads}

Now, answer the following user query faithfully using that context only:

"${query}"
            `.trim(),
          },
        ],
      },
    ],
  })
  console.log('resultllm', resultLLM)

  return resultLLM
}
