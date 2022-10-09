const beersRouter = require('express').Router()
const Beer = require('../models/beer')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7)
	}
	return null
}

beersRouter.post('/', async (req, res) => {
	const { beername, brewery, description, origin, style, color, IBU, ABV } = req.body
	const token = getTokenFrom(req)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const beer = new Beer({
		beername,
		brewery,
		description,
		origin,
		style,
		color,
		IBU,
		ABV,
		rating: [],
		user: user._id
	})

	const savedBeer = await beer.save()
	user.beers = user.beers.concat(savedBeer._id)
	await beer.save()

	res.status(201).json(savedBeer)
})

beersRouter.delete('/:id', async (req, res) => {
	await Beer.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = beersRouter