const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
	origin: "http://localhost:8082",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch((err) => {
		console.log("Cannot connect to the database!", err);
		process.exit();
	});

// // simple route
// app.get("/", (req, res) => {
// 	res.json({ message: "Test." });
// });

require("./routes/location.routes.js")(app);
require("./routes/building.routes.js")(app);
require("./routes/site.routes.js")(app);
require("./routes/floor.routes.js")(app);
require("./routes/room.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
