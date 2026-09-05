import type { Document } from 'mongodb'
import { connectToDatabase } from './client'

export async function getCollection<T extends Document>(name: string) {
  const db = await connectToDatabase()
  return db.collection<T>(name)
}
