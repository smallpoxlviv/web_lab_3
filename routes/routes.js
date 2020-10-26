const {Router} = require('express');
const bodyParser = require('body-parser');
const Dwelling = require('../models/Dwelling')

const router = Router();
const jsonParser = bodyParser.json();


router.get('/', async (req, res) => {
	const dwellings = await Dwelling.find({});
	let dwellingsString = JSON.stringify(dwellings);

	res.render('index', {
		title: 'lab_3',
		dwellingsString: dwellingsString
	});
});

//post dwelling
router.post('/', jsonParser, async function (req, res) {
	try {
		res.sendStatus(200);
		const dwellingJson = req.body;
		
		const dwelling = new Dwelling({
			imageSrc: dwellingJson.imageSrc,
			title: dwellingJson.title,
	        areaInSquareMeters: dwellingJson.areaInSquareMeters,
	        priceInUSD: dwellingJson.priceInUSD,
	        location: dwellingJson.location,
	        floors: dwellingJson.floors,
	        swimmingPool: dwellingJson.swimmingPool
		})
		await dwelling.save();
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
});

//delete dwelling
router.delete('/' , jsonParser, async function (req, res) {
	try {
		res.sendStatus(200);
		const dwellingJson = req.body;
		const dwelling = await Dwelling.findById(dwellingJson.id);
		await dwelling.delete();
	} catch (error) {
		res.sendStatus(500);
		console.error('500: ', error);
	}
});

// edit dwelling
router.put('/', jsonParser, async function (req, res) {
	try {
		res.sendStatus(200);
		const dwellingJson = req.body;
		const dwelling = await Dwelling.findById(dwellingJson.id);

		if (dwellingJson.imageSrc != ''){
			dwelling.imageSrc = dwellingJson.imageSrc;
		}
		if (dwellingJson.title != ''){
			dwelling.title = dwellingJson.title;
		}
		if (dwellingJson.areaInSquareMeters != ''){
			dwelling.areaInSquareMeters = dwellingJson.areaInSquareMeters;
		}
		if (dwellingJson.priceInUSD != ''){
			dwelling.priceInUSD = dwellingJson.priceInUSD;
		}
		if (dwellingJson.location != ''){
			dwelling.location = dwellingJson.location;
		}
		if (dwellingJson.floors != ''){
			dwelling.floors = dwellingJson.floors;
		}
		if (dwellingJson.swimmingPool != dwelling.swimmingPool){
			dwelling.swimmingPool = dwellingJson.swimmingPool;
		}

		await dwelling.save();
	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}
});

module.exports = router