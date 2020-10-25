const {Router} = require('express');
const router = Router();
const bodyParser = require('body-parser');
const fs = require('fs');

var jsonParser = bodyParser.json();


// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'student',
//     database: 'lab_3-5',
//     password: '1234'
// });



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
	// res.send('POST request to the homepage');
	let dwellingJson = req.body;
	let dwellingString = JSON.stringify(dwellingJson);

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
});



module.exports = router