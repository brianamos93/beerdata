const mongoose = require('mongoose')

const beerSchema = new mongoose.Schema({
	beername: String,
	brewery: String,
	description: String,
	origin: String,
	style: String,
	color: String,
	IBU: Number,
	ABV: Number,
	rating: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Rating'
		}
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

beerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Beer = mongoose.model('Beer', beerSchema)

module.exports = Beer