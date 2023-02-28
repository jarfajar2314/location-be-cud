const db = require("../models");
const Building = db.building;
const Site = db.site;

// Create and Save a new Building
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const building = new Building({
		name: req.body.name,
		site: req.body.site,
	});

	building
		.save(building)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred.",
			});
		});
};

exports.findBySite = (req, res) => {
	const siteName = req.params.siteName;

	Building.findOne({
		site: siteName,
	})
		.then((data) => {
			if (!data)
				res.status(404).send({
					message: `site '${siteName}' not found.`,
				});
			else res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving building.",
			});
		});
};
