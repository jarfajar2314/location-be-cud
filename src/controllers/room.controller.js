const db = require("../models");
const Room = db.room;
const Site = db.site;
const Building = db.building;
const Floor = db.floor;
const dataCheck = require("../lib/datacheck.js");

const createLocationDetail = (room) => {
	Building.findOne({ name: room.building, site: room.site }).then((data) => {
		if (!data) {
			const building = new Building({
				name: room.building,
				site: room.site,
			});
			building.save(building).then((data) => {
				if (data)
					console.log(
						`Building '${room.building}' on ${room.site} created.`
					);
			});
		}
	});
	Floor.findOne({
		name: room.floor,
		site: room.site,
		building: room.building,
	}).then((data) => {
		if (!data) {
			const floor = new Floor({
				name: room.floor,
				site: room.site,
				building: room.building,
			});
			floor.save(floor).then((data) => {
				if (data)
					console.log(
						`Floor '${room.floor}' on '${room.site}:${room.building}' created.`
					);
			});
		}
	});
};

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

	dataCheck.isSiteValid(room.site).then((valid) => {
		if (valid) {
			Room.findOne({
				name: req.body.name,
				site: req.body.site,
				building: req.body.building,
				floor: req.body.floor,
			}).then((data) => {
				if (!data) {
					createLocationDetail(room);
					room.save(room)
						.then((data) => {
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

	dataCheck.isSiteValid(room.site).then((valid) => {
		if (valid) {
			createLocationDetail(room);
			Room.findByIdAndUpdate(id, req.body)
				.then((data) => {
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
