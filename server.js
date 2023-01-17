const express = require("express");
const app = express();
const { MongoClient} = require("mongodb");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const PORT = 8080;
let db;

let connectionString = `mongodb+srv://javedansari:javed1993@cluster0.b0mqlyp.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json());
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
	res.render('pages/index');
});

app.post("/add",function (req, res) {
	db.collection("user").insertOne(req.body, function (err, info) {
		res.redirect("/contact");
	});
});

app.get('/contact', function (req, res) {
	db.collection("user").find().toArray(function (err, items) {
		res.render('pages/contact', {
			users: items,
		});
	});
});

MongoClient.connect(connectionString,{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log("Connection failed for some reason");
		}
		console.log("Connection established - All well");
		db = client.db("crud");
		app.listen(PORT, function () {
			console.log("Server is running on Port: " + PORT);
		});
	},
);
