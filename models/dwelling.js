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
		type: Integer,
		required: true
	},
	priceInUSD: {
		type: Integer,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	floors: {
		type: Integer,
		required: true
	},
	swimmingPool: {
		type: Boolean,
		required: true
	}
})

module.exports = model('Dwelling', schema)