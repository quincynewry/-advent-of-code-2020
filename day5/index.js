const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function run() {
    const fileStream = fs.createReadStream(path.join(__dirname, './input.txt'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let seatIds = [];

    for await (const line of rl) {
        let lower = 0,
            upper = 127;

        const row = getPosition(lower, upper, line.substring(0, 7), 'F');

        (lower = 0), (upper = 7);

        const column = getPosition(lower, upper, line.substring(7, 10), 'L');

        seatIds.push(row * 8 + column);
    }

    let mySeat = null;
    const maxId = Math.max(...seatIds);

    for (let x = 0; x <= maxId; x++) {
        if (!seatIds.includes(x) && seatIds.includes(x - 1) && seatIds.includes(x + 1)) {
            mySeat = x;
        }
    }

    console.log('Part 1: ', maxId);
    console.log('Part 2: ', mySeat);
}

function getPosition(lower, upper, range, lowerChar) {
    let position = 0;

    for (const char of range) {
        const midpoint = (lower + upper) / 2;

        if (char === lowerChar) {
            upper = Math.floor(midpoint);
            position = upper;
        } else {
            lower = Math.ceil(midpoint);
            position = lower;
        }
    }

    return position;
}

run();
