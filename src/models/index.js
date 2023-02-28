const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.location = require("./location.model.js")(mongoose);
db.site = require("./site.model.js")(mongoose);
db.building = require("./building.model.js")(mongoose);
db.floor = require("./floor.model.js")(mongoose);
db.room = require("./room.model.js")(mongoose);

module.exports = db;
