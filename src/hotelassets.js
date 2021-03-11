const List = require("./base.js");

const Floor = require("./floor.js");

 class HotelAssets extends List {

   get floor() {
    return Floor;
   }

 }

module.exports = HotelAssets;  

 