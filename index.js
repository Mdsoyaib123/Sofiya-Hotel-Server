const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var jwt = require('jsonwebtoken');
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000
const  cookieParser = require('cookie-parser')


// meddleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:[
    'http://localhost:5173',

    'https://the-hotel-room.web.app',
    'https://the-hotel-room.firebaseapp.com'
  ],
  credentials:true 
}));





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2amfc4s.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const verifyToken = (req,res,next)=>{
  const token = req.cookies?.token 
  if(!token){
    return res.status(401).send({message:'unAuthorized access'})
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,decoded)=>{
    if(error){
      return res.status(401).send({message:'unAuthorized access'})
    }
    console.log('decoded token ',decoded);
    req.user = decoded
    next()
  })
}
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
   

    const roomsCollection = client.db('hotelDB').collection('rooms')

    const bookingCollection = client.db('hotelDB').collection('myBooking')

    // json web token 
    app.post('/jwt',async(req,res)=>{
      const user = req.body 
      const token = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET,{expiresIn:'2h'})

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true })
      
     })


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

    app.put('/api/v1/rooms',async(req,res)=>{
      const ReviewData = req.body
      // console.log(ReviewData);
      const query ={room_name:req.query.name}
      const updateDoc = {
        $set: {
         review:ReviewData
        },
      };
     const result = await roomsCollection.updateOne(query,updateDoc)
     res.send(result)
    })




    app.get('/api/v1/bookingData',async(req,res)=>{
      const result = await bookingCollection.find().toArray()
      res.send(result)
    })



    app.get('/api/v1/myBooking',verifyToken,async(req,res)=>{
      if(req.query.email !== req.user.email){
        return res.status(403).send({message:'unAuthorized access'})
      }
      if(req.query?.email){
        const email= req.query.email
        query={email: email}
      }

      const cursor = bookingCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })



    app.get('/api/v1/update/:id',async(req,res)=>{
      const id = req.params.id 
      const query ={_id:new ObjectId(id)}
      const result = await bookingCollection.findOne(query)
      res.send(result)
    })
   
    



    app.post('/api/v1/bookingData',async(req,res)=>{
        const data = req.body 
        // console.log(data);
        const result = await bookingCollection.insertOne(data)
        res.send(result)
    })


    // // update book now
    app.patch('/api/v1/bookingData/update',async(req,res)=>{
      const SeatData = req.body
      console.log(SeatData);
      const id = req.query.id 
      console.log(id);
      const query = {_id: new ObjectId(id)};

      const updateDoc = {
        $set: {
          available_seat: SeatData.SeatData
        },
      };
      const result = await roomsCollection.updateOne(query,updateDoc)
      res.send(result)
    })






    app.put('/api/v1/bookingData/:id',async(req,res)=>{
      const date  = req.body 
      // console.log(date.updateDate);
      const id = req.params.id ;
      // console.log(id);
      const filter = {_id:new ObjectId(id)};
      // const options = { upsert: true };
      const updateDoc = {
        $set: {
         date:date.updateDate
        },
      };
      const result = await bookingCollection.updateOne(filter,updateDoc)
      res.send(result)

    })

    app.delete('/api/v1/bookingData/:id',async(req,res)=>{
      const id = req.params.id 
      const query = {_id:new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result)
    })


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