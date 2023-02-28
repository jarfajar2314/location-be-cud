const db = require("../models");
const Location = db.location;

// Create and Save a new Location
exports.create = (req, res) => {
	// Validate request
	if (!req.body.site) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const location = new Location({
		site: req.body.site,
		building: req.body.building,
		room: req.body.room,
		floor: req.body.floor,
	});

	location
		.save(location)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred.",
			});
		});
};

// Update a Location by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!",
		});
	}

	const id = req.params.id;

	Location.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot update Location with id=${id}. Maybe Location was not found!`,
				});
			} else res.send({ message: "Location was updated successfully." });
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Location with id=" + id,
			});
		});
};

// Delete a Location with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Location.findByIdAndRemove(id)
		.then((data) => {
			if (!data) {
				res.status(404).send({
					message: `Cannot delete Location with id=${id}. Maybe Location was not found!`,
				});
			} else {
				res.send({
					message: "Location was deleted successfully!",
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Location with id=" + id,
			});
		});
};

// Delete all Locations from the database.
exports.deleteAll = (req, res) => {
	Location.deleteMany({})
		.then((data) => {
			res.send({
				message: `${data.deletedCount} Locations were deleted successfully!`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while removing all tutorials.",
			});
		});
};
