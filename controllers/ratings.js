const ratingsRouter = require('express').Router()
const Rating = require('../models/rating')

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

ratingsRouter.post('/', (req, res) => {
	const rating = new Rating(req.body)

	rating
		.save()
		.then(result => {
			res.status(201).json(result)
		})
})

ratingsRouter.delete('/:id', async (req, res) => {
	await Rating.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = ratingsRouter