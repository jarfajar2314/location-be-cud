module.exports = (app) => {
	const buildings = require("../controllers/building.controller.js");

	var router = require("express").Router();

	// Create a new Building
	router.post("/", buildings.create);

	// Find Building by Site
	router.get("/:siteName", buildings.findBySite);

	// // Update a Building with id
	// router.put("/:id", buildings.update);

	// // Delete a Building with id
	// router.delete("/:id", buildings.delete);

	// // Delete all Buildings
	// router.delete("/", buildings.deleteAll);

	app.use("/api/buildings", router);
};
