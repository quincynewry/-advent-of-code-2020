const fs = require('fs');
const path = require('path');

async function run() {
    const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
    let adapters = input.split('\n').map((x) => parseInt(x));
    adapters.push(0);

    adapters = adapters.sort(function (a, b) {
        return a - b;
    });

    adapters.push(adapters[adapters.length - 1] + 3);

    let oneDiff = 0;
    let threeDiff = 0;
    let prevDiff = 0;

    for (let x = 0; x < adapters.length - 1; x++) {
        const diff = adapters[x + 1] - adapters[x];

        console.log(adapters[x], diff);

        if (diff === 1) {
            oneDiff++;
        } else if (diff === 3) {
            threeDiff++;
        }

        prevDiff = diff;
    }

    let part2 = 1;
    let currentRun = 1;
    const tribonacciSequence = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149];

    for (let joltage of adapters) {
        if (adapters.includes(joltage + 1)) {
            currentRun++;
        } else {
            part2 *= tribonacciSequence[currentRun - 1];
            currentRun = 1;
        }
    }

    console.log(`Part 1: ${oneDiff} x ${threeDiff} = ${oneDiff * threeDiff}`);
    console.log('Part 2:', part2);
}

run();

// TODO try something with skippable numbers (check previous number diff = 1)
