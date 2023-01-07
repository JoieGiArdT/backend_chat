import "dotenv/config";
import { connect } from "mongoose";

export default class DataBase {
  constructor() {
    this.connect();
  }
  async connect(): Promise<void> {
    const DB_URI = <string>process.env.DB_URI;
    await connect(DB_URI);
  }
}
