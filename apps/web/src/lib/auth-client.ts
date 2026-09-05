import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({
  baseURL: import.meta.env.BETTER_AUTH_URL ?? 'http://localhost:3000'
})

export const { signIn, signUp, useSession } = authClient
