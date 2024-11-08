const router = require("express").Router();
const {
    getFeaturedProducts,
    getFeaturedProductsById,
} = require("../controllers/featuredProducts.controller");

router.get("/", getFeaturedProducts);
router.get("/:id", getFeaturedProductsById);

module.exports = router;
