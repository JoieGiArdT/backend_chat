import 'dotenv/config'
import { connect } from 'mongoose'

export class DataBase {
  async connectDB (): Promise<void> {
    const DB_URI = process.env.DB_URI as string
    await connect(DB_URI)
  }
}
