import { existsSync } from 'node:fs'
import { ZodError, z } from 'zod'
import logger from '@/utils/logger'

const envSchema = z.object({
  DATABASE_URL: z.url({ message: 'Invalid connection string' }),
  DB_NAME: z.string().min(1, { message: 'DB_NAME is required' }),
  PORT: z.coerce.number().default(3000),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, { message: 'Weak secret, must be at least 32 characters' }),
  BETTER_AUTH_URL: z.url().default('http://localhost:3000'),
  CORS_ORIGINS: z.preprocess(
    (value: string) => value.split(',').map((origin) => origin.trim()),
    z.array(z.url()).default(['http://localhost:5173'])
  )
})

let env: z.infer<typeof envSchema>

try {
  existsSync('.env') && process.loadEnvFile('.env')
  env = envSchema.parse(process.env)
  console.log(env)
} catch (err) {
  if (err instanceof ZodError) {
    err.issues.forEach((zodError) => {
      logger.error(`${zodError.path}: ${zodError.message}`)
      process.exit(1)
    })
  }
  logger.error(err, 'Failed to load environment variables')
  process.exit(1)
}

export default env
