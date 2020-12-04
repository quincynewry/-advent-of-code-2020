const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function run() {
    const expenses = [];
    const fileStream = fs.createReadStream(path.join(__dirname, './input.txt'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        expenses.push(line);
    }

    for (const x in expenses) {
        for (const y in expenses) {
            if (x == y) {
                continue;
            }

            const xySum = parseInt(expenses[x]) + parseInt(expenses[y]);

            if (xySum == 2020) {
                console.log('Answer Part 1:', parseInt(expenses[x]) * parseInt(expenses[y]));
            }

            for (const z in expenses) {
                if (x == z || y == z) {
                    continue;
                }

                const xyzSum = xySum + parseInt(expenses[z]);

                if (xyzSum == 2020) {
                    console.log(
                        'Answer Part 2:',
                        parseInt(expenses[x]) * parseInt(expenses[y]) * parseInt(expenses[z])
                    );
                }
            }
        }
    }
}

run();
