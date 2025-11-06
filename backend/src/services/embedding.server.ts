import Groq from 'groq-sdk'
import { GoogleGenAI } from '@google/genai'

const apiKey = process.env.GEMINI_API_KEY

let globalClient: GoogleGenAI | null = null

export function getGeminiClient() {
  if (!globalClient) {
    globalClient = new GoogleGenAI({ apiKey })
  }
  return globalClient
}
