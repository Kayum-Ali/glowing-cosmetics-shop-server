const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// * Routes Declearation
const featuredProductsRoutes = require("./routes/featuredProducts.routes");
const reviewRoutes = require("./routes/reviews.routes");
const topSaverRoutes = require("./routes/topSaver.routes");
const cartRoutes = require("./routes/cart.routes");

// * CORS
var corsOptions = {
    origin: ["https://glowing-cosmetics-shop.web.app", "http://localhost:5173"],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/featured-products", featuredProductsRoutes);
app.use("/review", reviewRoutes);
app.use(topSaverRoutes);
app.use(cartRoutes);

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});
