var assert    = require("chai").assert;
var Floor = require("../src/floor");


describe("check main corridor and sub corridor default properties", function() {
    it("declare the main and sub floor obj", function() {

        var selection = {
            id: 1,
            main:  {
                "light": {
                    "state": "on",
                     "power": 5,
                    "track": true               
                },
                "ac": {
                    "state": "on",
                    "power": 10,
                    "track": true                   
                }         
            } ,
            sub: {
                "light": {
                    "state": "off",
                    "power": 5,
                    "track": true                            
                },
                "ac": {
                    "state": "on",
                    "power": 10,
                    "track": true                            
                }
            }
        };
        assert.isObject(selection, 'floor is an object');


    });

});
