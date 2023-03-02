module.exports = (app) => {
	const locations = require("../controllers/location.controller.js");

	var router = require("express").Router();

	// Create a new Location
	router.post("/", locations.create);

	// Update a Location with id
	router.patch("/:id", locations.update);

	// Delete a Location with id
	router.delete("/:id", locations.delete);

	// Delete all Locations
	router.delete("/", locations.deleteAll);

	app.use("/api/locations", router);
};
