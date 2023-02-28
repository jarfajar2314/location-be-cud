const db = require("../models");
const Room = db.room;

// Create and Save a new Room
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const room = new Room({
		name: req.body.name,
		site: req.body.site,
		building: req.body.building,
		floor: req.body.floor,
	});

	room.save(room)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred.",
			});
		});
};
