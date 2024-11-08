const router = require("express").Router();
const {
    getAddToCart,
    postAddToCart,
    getCartByEmail,
} = require("../controllers/cart.controller");

router.get("/addtoCart", getAddToCart);
router.post("/addtoCart", postAddToCart);
router.get("/cart/get-products-by-user/:email", getCartByEmail);

module.exports = router;
