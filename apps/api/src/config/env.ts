import { existsSync } from 'node:fs'
import { ZodError, z } from 'zod'
import logger from '@/utils/logger'

const envSchema = z.object({
  DATABASE_URL: z.url({ message: 'Invalid connection string' }),
  DB_NAME: z.string().min(1, { message: 'DB_NAME is required' }),
  PORT: z.coerce.number().default(3000)
})

let env: z.infer<typeof envSchema>

try {
  existsSync('.env') && process.loadEnvFile('.env')
  env = envSchema.parse(process.env)
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
