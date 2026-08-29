import express from 'express'
import { requestLogger } from './middleware/requestLogger'
import logger from './utils/logger'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(requestLogger)

async function startServer() {
  try {
    const srv = app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`)
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
