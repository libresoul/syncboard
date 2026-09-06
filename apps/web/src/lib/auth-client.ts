import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  fetchOptions: {
    auth: {
      type: 'Bearer',
      token: () => localStorage.getItem('bearer_token') || ''
    }
  }
})

export const { signIn, signUp, signOut, useSession } = authClient
