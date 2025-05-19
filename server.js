import mongoose from 'mongoose';
import { App } from './app.js';
import Config from './src/app/Config/index.js';
let server;

async function main() {
  try {
    await mongoose.connect(Config.db_url);

    server = App.listen(5000, () => {
      console.log(`server running on port 5000`);
    });
  } catch (error) {
    console.error(error);
  }
}
main();
