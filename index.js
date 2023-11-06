const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000
const  cookieParser = require('cookie-parser')


// meddleware
app.use(express.json());
app.use(cookieParser())
app.use(cors());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2amfc4s.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const roomsCollection = client.db('hotelDB').collection('rooms')

    const bookingCollection = client.db('hotelDB').collection('myBooking')

    app.get('/api/v1/rooms',async(req,res)=>{
      const result= await roomsCollection.find().toArray()
      res.send(result)
    })
    app.get('/api/v1/rooms/:id',async(req,res)=>{
      const id = req.params.id 
      const query = {_id:new ObjectId(id)}
      const result = await roomsCollection.findOne(query);
      res.send(result)
    })
    app.get('/api/v1/bookingData',async(req,res)=>{
      const result = await bookingCollection.find().toArray();
      res.send(result)
    })

    app.get('/api/v1/bookingData/:id',async(req,res)=>{
      const id = req.params.id 
      const query = {_id:new ObjectId(id)}
      const result = await bookingCollection.findOne(query)
      res.send(result)
    })
   



    app.post('/api/v1/bookingData',async(req,res)=>{
        const data = req.body 
        // console.log(data);
        const result = await bookingCollection.insertOne(data)
        res.send(result)
    })

    // app.put('/api/v1/bookingData/:id',async(req,res)=>{
    //   const date  = req.body 
    //   // console.log(date.updateDate);
    //   const id = req.params.id ;
    //   // console.log(id);
    //   const filter = {_id:new ObjectId(id)};
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //      date:date.updateDate
    //     },
    //   };
    //   const result = await bookingCollection.updateOne(filter,options,updateDoc)
    //   res.send(result)

    // })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})