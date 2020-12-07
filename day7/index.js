const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function run() {
    const fileStream = fs.createReadStream(path.join(__dirname, './input.txt'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let records = {};

    for await (const line of rl) {
        const split = line.split('contain');

        const container = split[0]
            .match(/([\w+]+)/g)
            .slice(0, 2)
            .join('_');
        const contents = [];

        split[1].split(',').forEach((x) => {
            if (!x.includes('no other')) {
                const words = x.match(/([\w+]+)/g);
                const colour = words.slice(1, 3).join('_');

                contents.push({
                    colour,
                    quantity: parseInt(words[0]),
                });
            }
        });

        records[container] = contents;
    }

    let toCheck = ['shiny_gold'];
    let checked = [];
    let part1Count = 0;

    while (toCheck.length > 0) {
        const nextCheck = [];
        for (const [container, contents] of Object.entries(records)) {
            if (!checked.includes(container) && contents.some((x) => toCheck.includes(x.colour))) {
                part1Count++;
                nextCheck.push(container);
                checked.push(container);
            }
        }

        toCheck = nextCheck;
    }

    let part2Count = getChildrenQuantity({ colour: 'shiny_gold', quantity: 1 });

    function getChildrenQuantity(bag) {
        if (!bag) {
            return 0;
        }

        let childCount = 0;

        for (const childBag of records[bag.colour]) {
            childCount += childBag.quantity * (1 + getChildrenQuantity(childBag));
        }

        return childCount;
    }

    console.log('Part 1 count: ', part1Count);
    console.log('Part 2 count: ', part2Count);
}

run();
