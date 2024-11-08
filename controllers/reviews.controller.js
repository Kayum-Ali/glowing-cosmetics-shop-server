const { reviewCollection } = require("../database/database.config");

const getReview = async (req, res) => {
    const cursor = reviewCollection.find({});
    const result = await cursor.toArray();
    res.send(result);
};

const postReview = async (req, res) => {
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
};

module.exports.getReview = getReview;
module.exports.postReview = postReview;
