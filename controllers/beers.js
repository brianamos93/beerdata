const beersRouter = require('express').Router()
const Beer = require('../models/beer')

beersRouter.get('/', (req, res) => {
	Beer
		.find({})
		.then(beers => {
			res.json(beers)
		})
})

beersRouter.get('/:id', async (req, res) => {
	const beer = await Beer.findById(req.params.id)

	if (beer) {
		res.json(beer.toJSON())
	} else {
		res.status(404).end()
	}
})

beersRouter.post('/', (req, res) => {
	const beer = new Beer(req.body)

	beer
		.save()
		.then(result => {
			res.status(201).json(result)
		})
})

beersRouter.delete('/:id', async (req, res) => {
	await Beer.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = beersRouter