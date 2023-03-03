const db = require("../models");
const Site = db.site;

// Create and Save a new Site
exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const site = new Site({
		name: req.body.name,
	});

	site.save(site)
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
	if (req.query.name)
		query.name = { $regex: `^${req.query.name}$`, $options: "i" };
	console.log(query);
	Site.find(query)
		.then((data) => {
			if (!data.length)
				return res.status(404).send({ message: "Site not found" });
			else res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error site not found.",
			});
		});
};
