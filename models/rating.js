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
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}

}, {
	timestamps: true
})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating