const {Router} = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const Dwelling = require('../models/Dwelling')

const router = Router();
const jsonParser = bodyParser.json();


router.get('/', (req, res) => {
	let dwellingsString = '';

	let fileContent = fs.readFileSync("dwellings.json");
	if (fileContent != '') {
		let dwellingsJson = JSON.parse(fileContent);
		dwellingsString = JSON.stringify(dwellingsJson);
	}

	res.render('index', {
		title: 'lab_3',
		dwellingsString: dwellingsString
	});
});

//post dwelling
router.post('/', jsonParser, function (req, res) {
	try {
		res.sendStatus(200);
		const dwellingJson = req.body;
		const dwellingString = JSON.stringify(dwellingJson);

		let fileContent = fs.readFileSync("dwellings.json");
		let dwellingsJson;
		let dwellingsString;

		if (fileContent != '') {
			dwellingsJson = JSON.parse(fileContent);
			dwellingsString = JSON.stringify(dwellingsJson);

			let startString = dwellingsString.replace(']', ',\n');
			dwellingsString = startString + dwellingString + ']';
		} else {
			dwellingsString = '[' + dwellingString + ']';
		}
		fs.writeFileSync("dwellings.json", dwellingsString);

	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}

});

//delete dwelling
router.delete('/' , jsonParser, function (req, res) {
	try {
		res.sendStatus(200);
		const dwellingJson = req.body;
		const id = dwellingJson['id'];

		let fileContent = fs.readFileSync("dwellings.json");
		let dwellingsJson = JSON.parse(fileContent);
		let dwellingsString = JSON.stringify(dwellingsJson);

		const deleteRegex = new RegExp('{"id":' + id + '[^}]+}','i');
		let newDwellingsString = dwellingsString.replace(deleteRegex, '');
		if (newDwellingsString == '[]'){
			newDwellingsString = newDwellingsString.replace('[]', '');
		} else {
			newDwellingsString = newDwellingsString.replace(',]', ']');
			newDwellingsString = newDwellingsString.replace('[,', '[');
			newDwellingsString = newDwellingsString.replace(',,', ',');
		}
		fs.writeFileSync("dwellings.json", newDwellingsString);

	} catch (error) {
		res.sendStatus(500);
		console.error('500: ', error);
	}

});

// edit dwelling
router.put('/', jsonParser, function (req, res) {
	try {
		res.sendStatus(200);
		const dwellingJson = req.body;

		let id = dwellingJson['id'];
		let imageSrc = dwellingJson['imageSrc'];
		let title = dwellingJson['title'];
		let areaInSquareMeters = dwellingJson['areaInSquareMeters'];
		let priceInUSD = dwellingJson['priceInUSD'];
		let location_ = dwellingJson['location'];
		let floors = dwellingJson['floors'];
		let swimmingPool = dwellingJson['swimmingPool'];

		dwelling = [];



	} catch (error) {
		res.sendStatus(500);
		console.error(error);
	}

});

module.exports = router