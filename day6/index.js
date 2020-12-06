const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function run() {
    const fileStream = fs.createReadStream(path.join(__dirname, './input.txt'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let groups = [];
    let group = [];

    for await (const line of rl) {
        if (!line) {
            if (group.length > 0) {
                groups.push(group);
            }

            group = [];

            continue;
        }

        group.push(line.split(''));
    }

    let part1Count = 0;
    let part2Count = 0;

    groups.forEach((x) => {
        const merged = [].concat.apply([], x);
        const unique = [];

        merged.forEach((y) => {
            if (!unique.find((z) => z == y)) {
                unique.push(y);

                if (merged.filter((z) => z == y).length == x.length) {
                    part2Count++;
                }
            }
        });

        part1Count += unique.length;
    });

    console.log('Part 1: ', part1Count);
    console.log('Part 2: ', part2Count);
}

run();
