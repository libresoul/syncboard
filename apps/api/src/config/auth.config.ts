import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { openAPI } from 'better-auth/plugins'
import { client, db } from '@/db/client'

export const auth = betterAuth({
  plugins: [openAPI({ disableDefaultReference: true })],
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { enabled: true, autoSignIn: false },
  advanced: { database: { joins: true } }
})
