const mongoose = require('mongoose')

const beerSchema = new mongoose.Schema({
	beername: String,
	brewery: String,
	description: String,
	origin: String,
	style: String,
	color: String,
	IBU: Number,
	ABV: Number
})

const Beer = mongoose.model('Beer', beerSchema)

module.exports = Beer