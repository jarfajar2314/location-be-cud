module.exports = (app) => {
	const sites = require("../controllers/site.controller.js");

	var router = require("express").Router();

	router.post("/", sites.create);

	router.get("/", sites.findAll);

	app.use("/api/sites", router);
};
