const schema = require("../schema");
const times = require("lodash/times");
const sensor = require("../input");

const main = schema.assets.corridor_main;
const sub = schema.assets.corridor_sub;
const noofmain = schema.no_of_corridor_main;
const noofsub = schema.no_of_corridor_sub;

class Floor {

    constructor() {
        // filter before assign like track or timing
        // calculate main and sub corridor based on no of main and sub per floor
        Floor.increaseCount();
        var floor = Floor.getCount();
        Object.assign(this, {
            "id": floor,
            "main": times(noofmain, function () {
                return (main);
            }),
            "sub": times(noofsub, function () {
                return (sub);
            })
        });

        this.getlogs();
    }

    static increaseCount() {
        this.count += 1;
    }

    static getCount() {
        return this.count;
    }

    getlogs() {
        console.log("Floor " + this.id);
        var light = 1;
        var index = 1;
        var calcpower = 0;
        for (const property in this.main) {
            console.log("Main corridors " + `${index} : Light 1: ${this.main[property].light.state} AC: ${this.main[property].ac.state}  `);
            index += 1;
            calcpower = (calcpower + (main.light.power + main.ac.power));
        }

        var subcorridor = sensor["floor" + this.id];
        var light = 1;
        var index = 1;

        if (this.totalpower() >= (parseInt(calcpower) + parseInt(this.powercalc()))) {
            for (let sensor in subcorridor) {
                if (subcorridor[sensor].move)
                    console.log("Sub corridors " + `${index}  : Light  ${light} : on AC: on  `);
                else
                    console.log("Sub corridors " + `${index}  : Light  ${light} : off AC: on  `);
                light = light + 1;
                index = index + 1;
            }
        } else {
                var calcpowermove = 0;
            //power off ac sub corridor
            for (let sensor in subcorridor) {

               // console.log("calc po " + calcpower);
                if (subcorridor[sensor].move) {

                        console.log("Sub corridors " + `${index}  : Light  ${light} : on AC: on  `);
       
                   
                    //console.log("Sub corridors " + `${index}  : Light  ${light} : on AC: on  `);
                    //calcpower = (calcpower + sub.ac.power + sub.light.power);
                } else {

                   
                    if (( (this.powercalc() + calcpower ) - sub.ac.power) <= this.totalpower()) {
                        console.log("Sub corridors " + `${index}  : Light  ${light} : off AC: off  `);
                         
                    } else {
                        console.log("Sub corridors " + `${index}  : Light  ${light} : off AC: on  `);
       
                    }

                }

                light = light + 1;
                index = index + 1;
            }
        }

    }
    powercalc() {
        var calcpower = 0;
        var subcorridor = sensor["floor" + this.id];

        for (let sensor in subcorridor) {
            if (subcorridor[sensor].move)
                calcpower = (calcpower + (sub.light.power + sub.ac.power));

            else
                calcpower = calcpower + sub.ac.power;

        }
        return calcpower;
    }

    totalpower() {
        return (noofmain * 15) + (noofsub * 10)
    }
}

module.exports = Floor;