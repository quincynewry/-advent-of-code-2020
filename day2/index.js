const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function run() {
    let part1Count = 0;
    let part2Count = 0;
    const fileStream = fs.createReadStream(path.join(__dirname, './input.txt'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        const splitLine = line.split(' ');
        const min = splitLine[0].split('-')[0];
        const max = splitLine[0].split('-')[1];
        const char = splitLine[1].replace(':', '');
        const password = splitLine[2];

        const occurrences = (password.match(new RegExp(char, 'g')) || []).length;

        if (occurrences >= min && occurrences <= max) {
            part1Count++;
        }

        const char1 = password[min - 1];
        const char2 = password[max - 1];

        if (char1 != char2 && (char1 == char || char2 == char)) {
            part2Count++;
        }
    }

    console.log('Answer Part 1: ', part1Count);
    console.log('Answer Part 2: ', part2Count);
}

run();
