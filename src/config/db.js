// import { MongoClient, ServerApiVersion } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hzg7hl2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// export const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// export const connectDB = async () => {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("✅ Connected to MongoDB");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error);
//     process.exit(1);
//   }
// };

// export const roomsCollection = client.db("hotelDB").collection("rooms");
// export const bookingCollection = client.db("hotelDB").collection("myBooking");
