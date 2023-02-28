const db = require("../models");
const Floor = db.floor;

// Create and Save a new Floor
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const floor = new Floor({
		name: req.body.name,
		site: req.body.site,
		building: req.body.building,
	});

	floor
		.save(floor)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred.",
			});
		});
};
