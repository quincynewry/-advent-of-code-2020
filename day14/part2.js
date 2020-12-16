const fs = require('fs');
const path = require('path');

function run() {
    const lines = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf8').split('\n');
    let mem = {};
    let mask = '';
    let x = 0;

    for (const line of lines) {
        const parts = line.split(' = ');

        if (parts[0] == 'mask') {
            mask = parts[1];
        } else {
            const regExp = /\[([^()]*)\]/;
            const address = parseInt(parts[0].match(regExp)[1]);
            const value = parseInt(parts[1]);

            let bitMask = address.toString(2).padStart(36, '0').split('');

            [...mask].forEach((x, idx) => {
                if (x != 0) {
                    bitMask[idx] = x;
                }
            });

            bitMask = bitMask.join('');

            const addresses = getWildcardAddresses(bitMask.split(''), 0, []);

            addresses.forEach((x) => {
                const address = parseInt(x, 2);
                mem[parseInt(x, 2)] = value;
            });
        }

        x++;
    }

    let sum = 0;

    for (const key of Object.keys(mem)) {
        sum += mem[key];
    }

    console.log('Part 2:', sum);
}

const getWildcardAddresses = (address, index = 0, addresses) => {
    if (index === address.length) {
        addresses.push(address.join(''));
        return;
    }

    if (address[index] === 'X') {
        address[index] = '0';
        getWildcardAddresses(address, index + 1, addresses);
        address[index] = '1';
        getWildcardAddresses(address, index + 1, addresses);

        address[index] = 'X';
    } else {
        getWildcardAddresses(address, index + 1, addresses);
    }

    return addresses;
};

run();
