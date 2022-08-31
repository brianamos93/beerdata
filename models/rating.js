const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
	beerid: ObjectId,
	userid: ObjectId,
	rating: Number,
	datecreated: {
		type: Date,
		default: new Date()
	}

})

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating