const fs = require('fs');
const path = require('path');

let bearing = 90;
let northSouth = 0;
let eastWest = 0;

function run() {
    const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
    let instructions = input.split('\n');

    for (const instruction of instructions) {
        const action = instruction[0];
        const value = parseInt(instruction.slice(1));

        switch (action) {
            case 'N':
                console.log('Move north: ', value);
                northSouth += value;
                break;
            case 'E':
                console.log('Move east: ', value);
                eastWest += value;
                break;
            case 'S':
                console.log('Move south: ', value);
                northSouth -= value;
                break;
            case 'W':
                console.log('Move west: ', value);
                eastWest -= value;
                break;
            case 'L':
                turn(-Math.abs(value));
                break;
            case 'R':
                turn(value);
                break;
            case 'F':
                moveForward(value);
                break;
            default:
                throw new Error('Not implemented');
        }
    }

    console.log(northSouth, eastWest);

    console.log('Part 1: ', Math.abs(northSouth) + Math.abs(eastWest));
}

function turn(degree) {
    bearing += degree;

    if (bearing < 0) {
        bearing += 360;
    }

    if (bearing >= 360) {
        bearing -= 360;
    }

    console.log('New bearing', bearing);
}

function moveForward(value) {
    switch (bearing) {
        case 0:
            console.log('Move forward north: ', value);
            northSouth += value;
            break;
        case 90:
            console.log('Move forward east: ', value);
            eastWest += value;
            break;
        case 180:
            console.log('Move forward south: ', value);
            northSouth -= value;
            break;
        case 270:
            console.log('Move forward west: ', value);
            eastWest -= value;
            break;
        default:
            throw new Error('Not implemented');
    }
}

run();
