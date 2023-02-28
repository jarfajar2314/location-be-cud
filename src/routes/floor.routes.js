module.exports = (app) => {
	const floors = require("../controllers/floor.controller.js");

	var router = require("express").Router();

	// Create a new Building
	router.post("/", floors.create);

	app.use("/api/floors", router);
};
