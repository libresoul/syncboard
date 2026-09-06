import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { bearer, openAPI } from 'better-auth/plugins'
import { client, db } from '@/db/client'
import env from './env'

export const auth = betterAuth({
  plugins: [bearer(), openAPI({ disableDefaultReference: true })],
  database: mongodbAdapter(db, {
    client,
    transaction: false // route around a bug in mongodbAdapter
  }),
  emailAndPassword: { enabled: true, autoSignIn: false },
  advanced: { database: { joins: true } },
  trustedOrigins: env.CORS_ORIGINS
})
