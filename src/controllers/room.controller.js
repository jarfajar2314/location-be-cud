const db = require("../models");
const Room = db.room;
const Site = db.site;
const Building = db.building;
const Floor = db.floor;
const locationUtils = require("../lib/locationUtils.js");

exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const room = new Room({
		...req.body,
	});

	locationUtils.isSiteValid(room.site).then((valid) => {
		if (valid) {
			Room.findOne({
				...req.body,
			}).then((roomFound) => {
				if (!roomFound) {
					room.save(room)
						.then((data) => {
							locationUtils.createLocationDetail(room);
							res.send(data);
						})
						.catch((err) => {
							res.status(500).send({
								message: err.message || "Some error occurred.",
							});
						});
				} else {
					return res.status(400).send({
						message: `Room already exist.`,
					});
				}
			});
		} else {
			return res.status(404).send({
				message: `Site : ${room.site} not found.`,
			});
		}
	});
};

// Update a Room by the id in the request
exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: "Data to update can not be empty!",
		});
	}

	const id = req.params.id;

	locationUtils.isSiteValid(room.site).then((valid) => {
		if (valid) {
			Room.findByIdAndUpdate(id, req.body)
				.then((data) => {
					locationUtils.createLocationDetail(room);
					res.send({ message: "Room was updated successfully." });
				})
				.catch((err) => {
					res.status(404).send({
						message: `Cannot update Room : ${id}.`,
					});
				});
		} else {
			return res.status(400).send({
				message: `Site : ${req.body.site} not found.`,
			});
		}
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Room.findByIdAndRemove(id)
		.then((data) => {
			res.send({
				message: "Room was deleted successfully!",
			});
		})
		.catch((err) => {
			res.status(404).send({
				message: "Could not delete Room with id : " + id,
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
	if (req.query.floor)
		query.floor = { $regex: `^${req.query.floor}$`, $options: "i" };

	Room.find(query)
		.then((data) => {
			if (!data.length)
				res.status(404).send({
					message: `Room not found.`,
				});
			else res.send(data);
		})
		.catch((err) => {
			res.status(404).send({
				message: err.message || "Room not found.",
			});
		});
};
