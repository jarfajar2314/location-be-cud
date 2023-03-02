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
