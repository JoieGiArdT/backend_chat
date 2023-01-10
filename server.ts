import * as dotenv from 'dotenv'
import express, { Application } from 'express'
// import { connection } from './src/infrastructure/config/mongoose.database'
import Server from './src/app'

dotenv.config()

const app: Application = express()
// eslint-disable-next-line no-new
new Server(app)
const port: number = (process.env.PORT != null) ? parseInt(process.env.PORT, 10) : 3000
/* connection.connectDB().them(() => {
  console.info(`Database running on : http://localhost:${port}`)
}) */

app
  .listen(port, 'localhost', function () {
    console.info(`Server running on : http://localhost:${port}`)
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('server startup error: address already in use')
    } else {
      console.log(err)
    }
  })
