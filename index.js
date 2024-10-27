const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;


app.use(cors());
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
    app.get('/featured-products', async(req,res)=>{
        const database = client.db("glowingCosmetic");
         const productsCollection = database.collection("featuredProductsCollection");
        const cursor =  productsCollection.find({});
        const result = await cursor.toArray();
        res.send(result);
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