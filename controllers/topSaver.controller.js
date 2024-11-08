// Database collections


const {
    topSaverCollection,
    topSaverReviewCollection,
} = require("../database/database.config");

const getTopSavers = async (req, res) => {
    const cursor = topSaverCollection.find({});
    const result = await cursor.toArray();
    res.send(result);
};

const getTopSaversById = async (req, res) => {
    const id = req.params.id;
    const saver = await topSaverCollection.findOne({
        _id: new ObjectId(id),
    });
    res.send(saver);
};

const getTopSaverReview = async (req, res) => {
    const cursor = topSaverReviewCollection.find({});
    const result = await cursor.toArray();
    res.send(result);
};

const postTopSaverReview = async (req, res) => {
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
};

module.exports.getTopSavers = getTopSavers;
module.exports.getTopSaversById = getTopSaversById;
module.exports.getTopSaverReview = getTopSaverReview;
module.exports.postTopSaverReview = postTopSaverReview;
