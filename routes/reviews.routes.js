const router = require("express").Router();
const { getReview, postReview } = require("../controllers/reviews.controller");

// * Routes
// ? Router Prefix ===> "/review"



router.get("/", getReview);
router.post("/", postReview);

module.exports = router;
