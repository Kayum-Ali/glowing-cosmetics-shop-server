const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId,  } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

var corsOptions = {
  origin: [ 'https://glowing-cosmetics-shop.web.app', 'http://localhost:5173'],
  optionsSuccessStatus: 200 
}


app.use(cors(corsOptions));
app.use(express.json())


/* mongodb connection here*/


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
     const topSaverCollection = database.collection("topSaver");
     const topSaverReviewCollection = database.collection("topSaverReview");
     const addtoCartCollection = database.collection("addToCart");

    app.get('/featured-products', async(req,res)=>{
        const cursor =  productsCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
    })
    

    app.get('/featured-products/:id', async(req,res)=>{
      try{
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

    // top saver review
    app.get('/top-Saver-Review', async(req,res)=>{
      const cursor =  topSaverReviewCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
        

    })


    app.post('/top-Saver-Review', async(req,res)=>{
     const userReview = req.body
     const doc = {
      name: userReview.name,
      review: userReview.review,
      rating: userReview.rating,
      email: userReview.email,
      photo: userReview.photo,
      formattedDate : userReview.formattedDate
     }
     const result = await topSaverReviewCollection.insertOne(doc)
     res.send(result)
     
    })

    // top saver data
    app.get('/top-savers', async(req,res)=>{
      const cursor =  topSaverCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
    })

    app.get('/top-savers/:id', async(req,res)=>{
      
        const id = req.params.id;
        const saver = await topSaverCollection.findOne({_id:new ObjectId(id)})
        res.send(saver)
      })  

      // addtoCart
      app.get('/addtoCart', async(req,res)=>{
        const cursor =  addtoCartCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
      })
      app.post('/addtoCart', async(req,res)=>{
        const data = req.body
        const cartData = await addtoCartCollection.insertOne(data);
        res.send(cartData)

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