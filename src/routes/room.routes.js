module.exports = (app) => {
	const rooms = require("../controllers/room.controller.js");

	var router = require("express").Router();

	// Create a new Building
	router.post("/", rooms.create);

	app.use("/api/rooms", router);
};
