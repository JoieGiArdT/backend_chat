import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import DataBase from './src/infrastructure/config/mongoose.database'
import Server from './src/app'

dotenv.config()

const app: Application = express()
// eslint-disable-next-line no-new
new Server(app)
const port: number = (process.env.PORT != null) ? parseInt(process.env.PORT, 10) : 3000
DataBase.connectDB().then(() => {
  console.info(`DataBase running on : ${process.env.DB_URI as string}`)
}).catch((error) => {
  console.info(error)
})
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
