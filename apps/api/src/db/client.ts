import { type Db, MongoClient } from 'mongodb'
import { dbConfig } from '@/config/db.config'

const client = new MongoClient(dbConfig.connectionString, dbConfig.options)
let db: Db

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db
  }

  await client.connect()
  db = client.db(dbConfig.name)
  return db
}

export { client }
