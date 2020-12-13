const fs = require('fs');
const path = require('path');

function run() {
    const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
    let busNumbers = input.split('\n')[1].split(',');
    let buses = [];

    for (let x = 0; x < busNumbers.length; x++) {
        if (busNumbers[x] === 'x') {
            continue;
        }

        const busNumber = parseInt(busNumbers[x]);

        buses.push({ num: busNumber, offset: x });
    }

    console.log(buses);

    let timestamp = buses[0].num;
    let step = buses[0].num;

    for (let x = 1; x < buses.length; x++) {
        const { num, offset } = buses[x];
        while ((timestamp + offset) % num !== 0) {
            timestamp += step;
        }
        step = step * num;
    }

    console.log('Part 2: ', timestamp);
}

run();
