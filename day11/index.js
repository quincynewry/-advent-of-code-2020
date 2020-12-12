const fs = require('fs');
const path = require('path');

async function run() {
    const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
    let lines = input.split('\n');
    let previousGrid = [];
    let activeGrid = [];

    lines.forEach((x) => {
        activeGrid.push(x.split(''));
    });

    do {
        previousGrid = JSON.parse(JSON.stringify(activeGrid));

        for (let x = 0; x < activeGrid.length; x++) {
            const row = activeGrid[x];

            for (let y = 0; y < row.length; y++) {
                const space = row[y];

                if (space === '.') {
                    continue;
                }

                const adajacentOccupiedCount = getAdjacentOccupiedCount(previousGrid, x, y);

                if (space == 'L' && adajacentOccupiedCount === 0) {
                    activeGrid[x][y] = '#';
                } else if (space == '#' && adajacentOccupiedCount >= 5) {
                    activeGrid[x][y] = 'L';
                }
            }
        }
    } while (JSON.stringify(previousGrid) != JSON.stringify(activeGrid));

    let count = 0;

    activeGrid.forEach((x) => {
        count += x.filter((y) => y == '#').length;

        console.log(x.join(''));
    });

    console.log('Answer: ', count);
}

function getAdjacentOccupiedCount(rows, rowIdx, spaceIdx) {
    let count = 0;

    if (rows[rowIdx - 1]) {
        // top left
        count += canSeeOccupied(rows, rowIdx, spaceIdx, -1, -1);

        // above
        count += canSeeOccupied(rows, rowIdx, spaceIdx, -1, 0);

        count += canSeeOccupied(rows, rowIdx, spaceIdx, -1, 1);
    }

    // left
    count += canSeeOccupied(rows, rowIdx, spaceIdx, 0, -1);

    // right
    count += canSeeOccupied(rows, rowIdx, spaceIdx, 0, 1);

    if (rows[rowIdx + 1]) {
        // bottom left
        count += canSeeOccupied(rows, rowIdx, spaceIdx, 1, -1);

        // underneath
        count += canSeeOccupied(rows, rowIdx, spaceIdx, 1, 0);

        // bottom right
        count += canSeeOccupied(rows, rowIdx, spaceIdx, 1, 1);
    }

    return count;
}

run();

function canSeeOccupied(rows, x, y, xD, yD) {
    let count = 0;
    x += xD;
    y += yD;

    while (rows[x] && rows[x][y]) {
        if (rows[x][y] == '#' || rows[x][y] == 'L') {
            if (rows[x][y] == '#') {
                count++;
            }
            break;
        }

        x += xD;
        y += yD;
    }

    return count;
}
