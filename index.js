const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes');
const secret = require('./secret');

const PORT = process.env.PORT || 3000;

const app = express();

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views')

app.use(express.static(__dirname))
app.use(routes)
app.use(express.urlencoded({ extended: true}))

async function start(){
	try {
		await mongoose.connect('mongodb+srv://'+ secret.user +':'+ secret.pass +'@cluster0.ibcjh.mongodb.net/dwellings', {
			useNewUrlParser: true,
			useFindAndModify: false
		});
		app.listen(PORT, () => {
			console.log(`Server has been started on port: ${PORT}`);
		});
	} catch (e) {
		console.log(e)
	}
}

start()
