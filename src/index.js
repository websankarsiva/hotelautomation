const HotelAssets = require("./hotelassets.js");
const schema = require("../schema");
const times = require("lodash/times");
const Floor = require("./floor.js");
const nooffloor = schema.no_of_floors;
Floor.count = 0;
const hotel = new HotelAssets(times(nooffloor, function () { return Floor; }));
