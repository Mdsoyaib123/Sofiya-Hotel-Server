import mongoose from 'mongoose';
import Config from './src/app/Config/index.js';
import { App } from './app.js';
let server;

async function main() {
  try {
    await mongoose.connect(Config.db_url);

    server = App.listen(process.env.PORT, () => {
      console.log(`server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
main();
