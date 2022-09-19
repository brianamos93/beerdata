const ratingsRouter = require('express').Router()
const Rating = require('../models/rating')
const User = require('../models/user')

ratingsRouter.get('/', (req, res) => {
	Rating
		.find({})
		.then(ratings => {
			res.json(ratings)
		})
})

ratingsRouter.get('/:id', async (req, res) => {
	const rating = await Rating.findById(req.params.id)

	if (rating) {
		res.json(rating.toJSON())
	} else {
		res.status(404).end()
	}
})

ratingsRouter.post('/', async (req, res) => {
	const body = req.body
	const user = await User.findById(body.userId)

	const rating = new Rating({
		beer: body.beer,
		rating: body.rating,
		datecreated: new Date(),
		user: user._id
	})
	const savedRating = await rating.save()
	user.ratings = user.ratings.concat(savedRating._id)
	await user.save()

  res.status(201).json(savedRating)
})


ratingsRouter.delete('/:id', async (req, res) => {
	await Rating.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = ratingsRouter