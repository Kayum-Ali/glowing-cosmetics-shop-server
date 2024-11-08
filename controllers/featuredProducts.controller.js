const { productsCollection } = require("../database/database.config");

const getFeaturedProducts = async (req, res) => {
    const cursor = productsCollection.find({});
    const result = await cursor.toArray();
    res.send(result);
};

const getFeaturedProductsById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productsCollection.findOne({ _id: id });
        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(404).send("Product not found");
    }
};

module.exports.getFeaturedProducts = getFeaturedProducts;
module.exports.getFeaturedProductsById = getFeaturedProductsById;
