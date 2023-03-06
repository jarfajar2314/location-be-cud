const db = require("../models");
const Location = db.location;
const locationUtils = require("../lib/locationUtils.js");
// const amqp = require("amqplib");
const amqp = require("amqplib/callback_api");
const producer = require("../lib/producer.js");

// Create and Save a new Location
exports.create = (req, res) => {
	// Validate request
	if (!req.body.site) {
		res.status(400).send({ message: "Content can not be empty!" });
		return;
	}

	const location = new Location({
		...req.body,
	});

	// return res.send("ok");
	locationUtils.isSiteValid(req.body.site).then((valid) => {
		if (valid) {
			Location.findOne({
				...req.body,
			}).then((locationFound) => {
				if (!locationFound) {
					location
						.save(location)
						.then((data) => {
							locationUtils.createLocationDetail(location);
							// try {
							// 	producer.send(location._doc, "create");
							// } catch (error) {
							// 	console.log("message broker error.");
							// }
							res.send(data);
						})
						.catch((err) => {
							res.status(500).send({
								message: err.message || "Some error occurred.",
							});
						});
				} else {
					return res.status(400).send({
						message: `Location already exist.`,
					});
				}
			});
		} else {
			return res.status(400).send({
				message: `Site : ${req.body.site} not found.`,
			});
		}
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
			} else {
				locationUtils.createLocationDetail(location);
				res.send({ message: "Location was updated successfully." });
			}
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

exports.findAll = (req, res) => {
	var query = {};
	if (req.query.id) query._id = req.query.id;
	if (req.query.site)
		query.site = { $regex: `^${req.query.site}$`, $options: "i" };
	if (req.query.building)
		query.building = { $regex: `^${req.query.building}$`, $options: "i" };
	if (req.query.floor)
		query.floor = { $regex: `^${req.query.floor}$`, $options: "i" };
	if (req.query.room)
		query.room = { $regex: `^${req.query.room}$`, $options: "i" };

	Location.find(query)
		.then((data) => {
			if (!data.length)
				res.status(404).send({
					message: `site not found.`,
				});
			else res.send(data);
		})
		.catch((err) => {
			res.status(404).send({
				message: err.message || "Location not found.",
			});
		});
};

exports.testRabbitMQ = (req, res) => {
	const message = req.body.message;

	amqp.connect("amqp://localhost", function (error0, connection) {
		if (error0) {
			throw error0;
		}
		connection.createChannel(function (error1, channel) {
			if (error1) {
				throw error1;
			}

			var queue = "hello";
			var msg = message;

			channel.assertQueue(queue, {
				durable: false,
			});
			channel.sendToQueue(queue, Buffer.from(msg));

			console.log(" [x] Sent %s", msg);
		});
		setTimeout(function () {
			connection.close();
		}, 500);
	});
	return res.send("message sent.");
};
