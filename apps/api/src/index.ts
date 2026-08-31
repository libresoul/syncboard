import { apiReference } from '@scalar/express-api-reference'
import express from 'express'
import { attachRouting } from 'express-zod-api'
import { apiConfig } from './config/api.config'
import { documentation } from './docs'
import { requestLogger } from './middleware/requestLogger'
import { routing } from './routing'
import logger from './utils/logger'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(requestLogger)

const config = apiConfig(app)
const { notFoundHandler } = attachRouting(config, routing)

app.use(
  '/docs',
  apiReference({
    content: documentation.getSpecAsJson()
  })
)

app.use(notFoundHandler)

async function startServer() {
  try {
    const srv = app.listen(PORT, () => {
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
