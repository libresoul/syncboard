import { apiReference } from '@scalar/express-api-reference'
import { toNodeHandler } from 'better-auth/node'
import express from 'express'
import { attachRouting } from 'express-zod-api'
import { apiConfig } from './config/api.config'
import { auth } from './config/auth.config'
import env from './config/env'
import { connectToDatabase } from './db/client'
import { documentation } from './docs'
import { corsMiddleware } from './middleware/cors.middleware'
import { requestLogger } from './middleware/requestLogger'
import { routing } from './routing'
import logger from './utils/logger'

const app = express()
const PORT = env.PORT

app.all('/api/auth/{*splat}', corsMiddleware, toNodeHandler(auth))

app.use(express.json())
app.use(requestLogger)

const config = apiConfig(app)
const { notFoundHandler } = attachRouting(config, routing)

app.use(
  '/docs',
  apiReference({
    sources: [
      { title: 'Base', content: documentation.getSpecAsJson() },
      { url: '/api/auth/open-api/generate-schema', title: 'Auth' }
    ]
  })
)

app.use(notFoundHandler)

async function startServer() {
  try {
    const srv = app.listen(PORT, async () => {
      await connectToDatabase()
      logger.info(`Server is running on http://localhost:${PORT}`)
      logger.info(`API docs available on http://localhost:${PORT}/docs`)
    })

    srv.on('error', (err) => {
      logger.error(err, 'Failed to start server')
      process.exit(1)
    })
  } catch (err) {
    logger.error(err, 'Failed to start server')
    process.exit(1)
  }
}

startServer()
