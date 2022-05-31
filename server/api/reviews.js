const reviewRouter = require('express').Router()
const {
  models: {Review, User}
} = require('../db')

//POST /api/reviews
reviewRouter.post('/', async(req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const reviewInfo = req.body
    reviewInfo.userId = user.id
    const review = await Review.create(reviewInfo)
    res.send(review)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = reviewRouter
