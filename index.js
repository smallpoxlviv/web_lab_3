const express = require('express');
const mysql = require('mysql2');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes');


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


app.listen(PORT, () => {
	console.log(`Server has been started on port: ${PORT}`);
});


