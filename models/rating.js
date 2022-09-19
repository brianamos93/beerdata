const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
	beer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Beer'
	},
	rating: {
		type: Number,
		required: true
	},
	datecreated: {
		type: Date,
		default: new Date()
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}

})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating