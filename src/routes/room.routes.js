module.exports = (app) => {
	const rooms = require("../controllers/room.controller.js");

	var router = require("express").Router();

	router.post("/", rooms.create);
	router.patch("/:id", rooms.update);
	router.delete("/:id", rooms.delete);

	app.use("/api/rooms", router);
};
