const fs = require('fs');
const path = require('path');

function run() {
    const lines = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').split('\n');
    let mem = [];
    let mask = '';

    for (const line of lines) {
        const parts = line.split(' = ');

        if (parts[0] == 'mask') {
            mask = parts[1];
        } else {
            const regExp = /\[([^()]*)\]/;
            const address = parseInt(parts[0].match(regExp)[1]);
            const value = parseInt(parts[1]);

            let bitMask = value.toString(2).padStart(36, '0').split('');

            [...mask].forEach((x, idx) => {
                if (x !== 'X') {
                    bitMask[idx] = x;
                }
            });

            bitMask = bitMask.join('');

            mem[address] = parseInt(bitMask, 2);
        }
    }

    console.log(mem);

    console.log(
        'Part 1:',
        mem.reduce((a, b) => a + b, 0)
    );
}

run();
