const fs = require('fs');
const path = require('path');

function run() {
    const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
    let estimateTime = parseInt(input.split('\n')[0]);
    let busNumbers = input
        .split('\n')[1]
        .split(',')
        .filter((x) => x != 'x')
        .map((x) => parseInt(x));

    console.log(estimateTime, busNumbers);

    let lowestDiff = null;
    let part1 = 0;

    for (const busNumber of busNumbers) {
        // prettier-ignore
        let diff = ((Math.floor(estimateTime / busNumber) * busNumber) + busNumber) - estimateTime;
        console.log(diff);

        if (lowestDiff == null || diff < lowestDiff) {
            lowestDiff = diff;
            part1 = diff * busNumber;
        }
    }

    console.log('Part 1:', part1);
}

run();
