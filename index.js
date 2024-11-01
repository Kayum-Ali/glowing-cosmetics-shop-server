const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion,  } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

var corsOptions = {
  origin: [ 'https://glowing-cosmetics-shop.web.app', 'http://localhost:5173'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors(corsOptions));
app.use(express.json())


/* mongodb connection here*/

console.log(process.env.DB_USER, process.env.DB_PASS)
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dangeag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("glowingCosmeticShop");
     const productsCollection = database.collection("featuredProductsCollection");
     const reviewCollection = database.collection("reviewCollection");

    app.get('/featured-products', async(req,res)=>{
      // const database = client.db("glowingCosmeticShop");
      // const productsCollection = database.collection("featuredProductsCollection");
        const cursor =  productsCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
    })
    

    app.get('/featured-products/:id', async(req,res)=>{
      try{
        // const database = client.db("glowingCosmeticShop");
        // const productsCollection = database.collection("featuredProductsCollection");
        const id = req.params.id;
        const product = await productsCollection.findOne({_id: id})
        res.send(product)
      } catch (error) {
        console.error(error)
        res.status(404).send('Product not found')
      }
    })


    // review post

    app.get('/review', async(req,res)=>{
      const cursor =  reviewCollection.find({});
        const result = await cursor.toArray();
        res.send(result);

    })


    app.post('/review', async(req,res)=>{
     const userReview = req.body
    //  console.log(userReview);
     const doc = {
      name: userReview.name,
      review: userReview.review,
      rating: userReview.rating,
      email: userReview.email,
      photo: userReview.photo,
      formattedDate : userReview.formattedDate
     }
     const result = await reviewCollection.insertOne(doc)
     res.send(result)
     
    })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
    res.send('Glowing server is Running')
})

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`)
})