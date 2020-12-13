const fs = require('fs');
const path = require('path');

let ship = {
    northSouth: 0,
    eastWest: 0,
};

let waypoint = {
    northSouth: 1,
    eastWest: 10,
};

function run() {
    const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
    let instructions = input.split('\n');

    for (const instruction of instructions) {
        const action = instruction[0];
        const value = parseInt(instruction.slice(1));

        switch (action) {
            case 'N':
                waypoint.northSouth += value;
                break;
            case 'E':
                waypoint.eastWest += value;
                break;
            case 'S':
                waypoint.northSouth -= value;
                break;
            case 'W':
                waypoint.eastWest -= value;
                break;
            case 'L':
                turn(action, value);
                break;
            case 'R':
                turn(action, value);
                break;
            case 'F':
                moveForward(value);
                break;
            default:
                throw new Error('Not implemented');
        }
    }

    console.log(ship.northSouth, ship.eastWest);
    console.log(waypoint);

    console.log('Part 2:', Math.abs(ship.northSouth) + Math.abs(ship.eastWest));
}

function turn(action, value) {
    while (value > 0) {
        let x = waypoint.eastWest;
        let y = waypoint.northSouth;

        if (action == 'R') {
            waypoint.eastWest = y;
            waypoint.northSouth = x * -1;
        } else {
            waypoint.eastWest = y * -1;
            waypoint.northSouth = x;
        }

        value -= 90;
    }
}

function moveForward(value) {
    ship.northSouth += waypoint.northSouth * value;
    ship.eastWest += waypoint.eastWest * value;
}

run();
