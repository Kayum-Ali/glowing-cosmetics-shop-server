const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dangeag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// * Database
const db = client.db("glowingCosmeticShop");

// * Collections
const productsCollection = db.collection("featuredProductsCollection");
const reviewCollection = db.collection("reviewCollection");
const topSaverCollection = db.collection("topSaver");
const topSaverReviewCollection = db.collection("topSaverReview");
const addtoCartCollection = db.collection("addToCart");

// * Exports
module.exports.db = db;
module.exports.productsCollection = productsCollection;
module.exports.reviewCollection = reviewCollection;
module.exports.topSaverCollection = topSaverCollection;
module.exports.topSaverReviewCollection = topSaverReviewCollection;
module.exports.addtoCartCollection = addtoCartCollection;
