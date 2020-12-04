const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function traverse(right, down) {
    let treeCount = 0;
    const fileStream = fs.createReadStream(path.join(__dirname, './input.txt'));
    const grid = [];

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        grid.push(line);
    }

    for (const x in grid) {
        if (x % down !== 0) {
            continue;
        }

        const row = grid[x];
        const location = row[((x / down) * right) % row.length];

        if (location === '#') {
            treeCount++;
        }
    }

    console.log(`Tree count (${right}:${down}): `, treeCount);

    return treeCount;
}

async function run() {
    const answer =
        (await traverse(1, 1)) *
        (await traverse(3, 1)) *
        (await traverse(5, 1)) *
        (await traverse(7, 1)) *
        (await traverse(1, 2));

    console.log('Part 2:', answer);
}

run();
