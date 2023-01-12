import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import Server from './src/app'

dotenv.config()

const app: Application = express()
// eslint-disable-next-line no-new
new Server(app)
const port: number = (process.env.PORT != null) ? parseInt(process.env.PORT, 10) : 3000

app
  .listen(port, 'localhost', function () {
    console.info(`Server running on : http://localhost:${port}`)
  })
  .on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Server startup error: address already in use')
    } else {
      console.log(err)
    }
  })
