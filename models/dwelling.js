const {Schema, model} = require('mongoose')

const schema = new Schema({
	imageSrc: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	areaInSquareMeters: {
		type: Number,
		required: true
	},
	priceInUSD: {
		type: Number,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	floors: {
		type: Number,
		required: true
	},
	swimmingPool: {
		type: Boolean,
		required: true
	}
})

module.exports = model('Dwelling', schema)