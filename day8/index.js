const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function run() {
    const fileStream = fs.createReadStream(path.join(__dirname, './input.txt'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let commands = [];

    for await (const line of rl) {
        const split = line.split(' ');

        commands.push({
            instruction: split[0],
            value: parseInt(split[1]),
        });
    }

    const part1 = runProgram(commands)[0];

    let broke = true;
    let part2 = 0;
    let lastModifiedIndex = 0;

    while (broke) {
        // deep copy array
        let alteredCommands = JSON.parse(JSON.stringify(commands));

        const toModify = alteredCommands.findIndex(
            (x, index) =>
                index > lastModifiedIndex && (x.instruction == 'jmp' || x.instruction == 'nop')
        );
        lastModifiedIndex = toModify;

        alteredCommands[toModify].instruction =
            alteredCommands[toModify].instruction == 'nop' ? 'jpm' : 'nop';

        [part2, broke] = runProgram(alteredCommands);
    }

    console.log('Part 1 count: ', part1);
    console.log('Part 2 count: ', part2);
}

function runProgram(commands) {
    let runCommands = [];
    let x = 0;
    let acc = 0;
    let broke = false;

    while (x < commands.length) {
        const command = commands[x];

        if (runCommands.includes(x)) {
            broke = true;
            break;
        }

        runCommands.push(x);

        switch (command.instruction) {
            case 'acc':
                acc += command.value;
                x++;
                break;
            case 'jmp':
                x += command.value;
                break;
            case 'nop':
                x++;
                break;
        }
    }

    return [acc, broke];
}

run();
