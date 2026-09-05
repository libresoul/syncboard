import env from './env'

export const dbConfig = {
  connectionString: env.DATABASE_URL,
  name: env.DB_NAME,
  options: {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 20000
  }
}
