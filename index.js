const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

var corsOptions = {
    origin: ["https://glowing-cosmetics-shop.web.app", "http://localhost:5173"],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

/* mongodb connection here*/

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dangeag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        const database = client.db("glowingCosmeticShop");
        const productsCollection = database.collection(
            "featuredProductsCollection"
        );
        const reviewCollection = database.collection("reviewCollection");
        const topSaverCollection = database.collection("topSaver");
        const topSaverReviewCollection = database.collection("topSaverReview");
        const addtoCartCollection = database.collection("addToCart");

        app.get("/featured-products", async (req, res) => {
            const cursor = productsCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/featured-products/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const product = await productsCollection.findOne({ _id: id });
                res.send(product);
            } catch (error) {
                console.error(error);
                res.status(404).send("Product not found");
            }
        });

        // review post

        app.get("/review", async (req, res) => {
            const cursor = reviewCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post("/review", async (req, res) => {
            const userReview = req.body;
            const doc = {
                name: userReview.name,
                review: userReview.review,
                rating: userReview.rating,
                email: userReview.email,
                photo: userReview.photo,
                formattedDate: userReview.formattedDate,
            };
            const result = await reviewCollection.insertOne(doc);
            res.send(result);
        });

        // top saver review
        app.get("/top-Saver-Review", async (req, res) => {
            const cursor = topSaverReviewCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        app.post("/top-Saver-Review", async (req, res) => {
            const userReview = req.body;
            const doc = {
                name: userReview.name,
                review: userReview.review,
                rating: userReview.rating,
                email: userReview.email,
                photo: userReview.photo,
                formattedDate: userReview.formattedDate,
            };
            const result = await topSaverReviewCollection.insertOne(doc);
            res.send(result);
        });

        // top saver data
        app.get("/top-savers", async (req, res) => {
            const cursor = topSaverCollection.find({});
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/top-savers/:id", async (req, res) => {
            const id = req.params.id;
            const saver = await topSaverCollection.findOne({
                _id: new ObjectId(id),
            });
            res.send(saver);
        });

        // addtoCart
        app.get("/addtoCart", async (req, res) => {
            const email = req.query.email;
            const cursor = addtoCartCollection.find({email : email});
            const result = await cursor.toArray();
            res.send(result);
        });

        // * Added By Programmer Hasan
        app.post("/addtoCart", async (req, res) => {
            const data = req.body;
            let message;

            const alreadyInCart = await addtoCartCollection.findOne({
                email: data.email,
                prodId: data.prodId,
            });

            if (alreadyInCart !== null && alreadyInCart.photo) {
                //? Already Added. Cannot be added more
                message = {
                    status: 403,
                    message: "Already In Cart",
                    data: { exists: true },
                };
                return res.json(message);
            } else {
                //? Need to add the product
                const cartData = await addtoCartCollection.insertOne(data);
                if (cartData.acknowledged) {
                    message = {
                        status: 200,
                        message: "Added to cart successfully",
                        data: { exists: false },
                    };
                    return res.json(message);
                } else {
                    message = {
                        status: 500,
                        message: "internal server error",
                        data: { exists: false },
                    };
                    return res.json(message);
                }
            }
        });

        app.put('/addtoCart/:id', async (req, res) => {
          const prodId = req.params.id; // URL থেকে prodId নেওয়া
          const { quantity } = req.body; // বডি থেকে quantity নেওয়া
      
          try {
              // ডাটাবেসে নির্দিষ্ট prodId এর ডেটা আপডেট করা
              const updatedData = await addtoCartCollection.updateOne(
                  { prodId: prodId }, // prodId দিয়ে ফিল্টার করা হচ্ছে
                  { $set: { quantity: quantity } }
              );
      
              if (updatedData.modifiedCount > 0) {
                  res.status(200).json({ message: 'Quantity updated successfully' });
              } else {
                  res.status(404).json({ message: 'Item not found or quantity unchanged' });
              }
          } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Failed to update quantity', error: error.message });
          }
      });

        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
    }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
    res.send("Glowing server is Running");
});

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
