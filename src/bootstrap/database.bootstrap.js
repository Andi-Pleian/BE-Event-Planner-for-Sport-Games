import { dbURL } from "../util/database";

const mongoose = require("mongoose");

export class Database {
  bootstrap(options) {
    const databaseURL = options?.url ? options.url : dbURL;
    mongoose.connect(databaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async reset() {
    await mongoose.connection?.db?.dropDatabase();
  }

  async close() {
    await mongoose.disconnect();
  }
}
