// database collections ===>
const { addtoCartCollection } = require("../database/database.config");

// addtoCart
// app.get("/addtoCart");
const getAddToCart = async (req, res) => {
    const cursor = addtoCartCollection.find({});
    const result = await cursor.toArray();
    res.send(result);
};

const postAddToCart = async (req, res) => {
    const data = req.body;
    let message;
    console.log(data);
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
};

// app.get("/cart/get-products-by-user/:email", );
const getCartByEmail = async (req, res) => {
    const { email } = req.params;
    const products = await addtoCartCollection.find({ email }).toArray();
    const productsCount = await addtoCartCollection.countDocuments({
        email,
    });

    const message = { status: 200, data: { productsCount, products } };

    res.json(message);
};

module.exports.getAddToCart = getAddToCart;
module.exports.postAddToCart = postAddToCart;
module.exports.getCartByEmail = getCartByEmail;
