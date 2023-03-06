module.exports = (app) => {
	const locations = require("../controllers/location.controller.js");

	var router = require("express").Router();

	router.post("/", locations.create);

	router.patch("/:id", locations.update);

	router.delete("/:id", locations.delete);

	router.delete("/", locations.deleteAll);

	router.get("/", locations.findAll);

	router.post("/mq", locations.testRabbitMQ);

	app.use("/api/locations", router);
};
