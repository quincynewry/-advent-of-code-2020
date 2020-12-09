const fs = require('fs');
const path = require('path');

async function run() {
    const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
    const numberSeries = input.split('\n').map((x) => parseInt(x));

    let part1 = 0;
    let upperIndex = 0;
    const preambleLength = 25;

    for (const x in numberSeries) {
        const current = numberSeries[x];

        if (x > preambleLength - 1) {
            const previousSet = numberSeries.slice(x - preambleLength, x);
            let match = false;

            previousSet.forEach((y) => {
                if (previousSet.some((z) => z != y && z + y == current)) {
                    match = true;
                }
            });

            if (!match) {
                part1 = current;
                upperIndex = parseInt(x);
                break;
            }
        }
    }

    const filteredSet = numberSeries.slice(0, upperIndex);
    let lowerIndex = null;

    while (!lowerIndex) {
        let sum = part1;
        upperIndex--;

        for (let x = upperIndex; x >= 0; x--) {
            sum -= filteredSet[x];

            if (sum < 0) {
                break;
            } else if (sum == 0) {
                console.log('Match', x, upperIndex);
                lowerIndex = x;
                break;
            }
        }
    }

    const matchRange = filteredSet.slice(lowerIndex, upperIndex + 1);

    console.log(
        'Double check:',
        matchRange.reduce((a, b) => a + b, 0)
    );

    console.log('Part 1: ', part1);
    console.log('Part 2: ', Math.max(...matchRange) + Math.min(...matchRange));
}

run();
