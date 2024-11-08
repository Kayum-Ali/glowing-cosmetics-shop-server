const router = require("express").Router();
const {
    getTopSavers,
    getTopSaversById,
    getTopSaverReview,
    postTopSaverReview,
} = require("../controllers/topSaver.controller");

router.get("/top-savers", getTopSavers);
router.get("/top-savers/:id", getTopSaversById);
router.get("/top-Saver-Review", getTopSaverReview);
router.post("/top-Saver-Review", postTopSaverReview);

module.exports = router;
