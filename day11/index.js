const fs = require('fs');
const path = require('path');

function run(maxOccupied, mode) {
    const input = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8');
    let lines = input.split('\n');
    let previousGrid = [];
    let activeGrid = [];
    let count = 0;

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

                const occupiedCount = getOccupiedCount(previousGrid, x, y, mode);

                if (space == 'L' && occupiedCount === 0) {
                    activeGrid[x][y] = '#';
                } else if (space == '#' && occupiedCount >= maxOccupied) {
                    activeGrid[x][y] = 'L';
                }
            }
        }
    } while (JSON.stringify(previousGrid) != JSON.stringify(activeGrid));

    activeGrid.forEach((x) => {
        count += x.filter((y) => y == '#').length;
    });

    return count;
}

function getOccupiedCount(rows, rowIdx, spaceIdx, mode) {
    let count = 0;

    if (rows[rowIdx - 1]) {
        // top left
        count += checkOccupied(rows, rowIdx, spaceIdx, -1, -1, mode);

        // above
        count += checkOccupied(rows, rowIdx, spaceIdx, -1, 0, mode);

        count += checkOccupied(rows, rowIdx, spaceIdx, -1, 1, mode);
    }

    // left
    count += checkOccupied(rows, rowIdx, spaceIdx, 0, -1, mode);

    // right
    count += checkOccupied(rows, rowIdx, spaceIdx, 0, 1, mode);

    if (rows[rowIdx + 1]) {
        // bottom left
        count += checkOccupied(rows, rowIdx, spaceIdx, 1, -1, mode);

        // underneath
        count += checkOccupied(rows, rowIdx, spaceIdx, 1, 0, mode);

        // bottom right
        count += checkOccupied(rows, rowIdx, spaceIdx, 1, 1, mode);
    }

    return count;
}

function checkOccupied(rows, x, y, xD, yD, mode) {
    let counter = 0;
    x += xD;
    y += yD;

    while (rows[x] && rows[x][y]) {
        if (mode == 'direct' && counter > 0) {
            break;
        }

        if (rows[x][y] != '.') {
            if (rows[x][y] == '#') {
                return 1;
            }

            break;
        }

        x += xD;
        y += yD;
        counter++;
    }

    return 0;
}

console.log('Part 1:', run(4, 'direct'));
console.log('Part 2:', run(5, 'visible'));
