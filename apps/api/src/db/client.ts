import { type Db, MongoClient } from 'mongodb'
import { dbConfig } from '@/config/db.config'

const client = new MongoClient(dbConfig.connectionString, dbConfig.options)
const db: Db = client.db(dbConfig.name)

export async function connectToDatabase(): Promise<Db> {
  await client.connect()
  return db
}

export { client, db }
