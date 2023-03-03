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

exports.findAll = (req, res) => {
	var query = {};
	if (req.query.id) query._id = req.query.id;
	if (req.query.site)
		query.site = { $regex: `^${req.query.site}$`, $options: "i" };
	if (req.query.building)
		query.building = { $regex: `^${req.query.building}$`, $options: "i" };

	Floor.find(query)
		.then((data) => {
			if (!data.length)
				res.status(404).send({
					message: `Floor not found.`,
				});
			else res.send(data);
		})
		.catch((err) => {
			res.status(404).send({
				message: err.message || "Floor not found.",
			});
		});
};
