const db = require("../models");
const Room = db.room;
const Site = db.site;
const Building = db.building;
const Floor = db.floor;

exports.isSiteValid = async (site) => {
	var validity = false;
	await Site.findOne({ name: site }).then((data) => {
		if (data) validity = true;
	});
	return validity;
};

exports.createLocationDetail = (location) => {
	Building.findOne({ name: location.building, site: location.site }).then(
		(data) => {
			if (!data) {
				const building = new Building({
					name: location.building,
					site: location.site,
				});
				building.save(building).then((data) => {
					if (data)
						console.log(
							`Building '${location.building}' on ${location.site} created.`
						);
				});
			}
		}
	);
	Floor.findOne({
		name: location.floor,
		site: location.site,
		building: location.building,
	}).then((data) => {
		if (!data) {
			const floor = new Floor({
				name: location.floor,
				site: location.site,
				building: location.building,
			});
			floor.save(floor).then((data) => {
				if (data)
					console.log(
						`Floor '${location.floor}' on '${location.site}:${location.building}' created.`
					);
			});
		}
	});
	if (location.room)
		Room.findOne({
			name: location.room,
			site: location.site,
			building: location.building,
			floor: location.floor,
		}).then((data) => {
			if (!data) {
				const room = new Room({
					name: location.room,
					site: location.site,
					building: location.building,
					floor: location.floor,
				});
				room.save(room).then((data) => {
					if (data)
						console.log(
							`Room '${location.room}' on '${location.site}:${location.building}:${location.floor}' created.`
						);
				});
			}
		});
};
