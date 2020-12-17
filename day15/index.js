function run(input, max) {
    const parsedInput = input.split(',').map((x) => parseInt(x));
    let spoken = new Map(parsedInput.map((x, i) => [x, i + 1]));

    let lastSpoken = 0;

    for (let i = parsedInput.length + 1; i < max; i++) {
        if (spoken.has(lastSpoken)) {
            const index = spoken.get(lastSpoken);
            spoken.set(lastSpoken, i);
            lastSpoken = i - index;
        } else {
            spoken.set(lastSpoken, i);
            lastSpoken = 0;
        }
    }

    return lastSpoken;
}

console.log('Part 1:', run('19,20,14,0,9,1', 2020));
console.log('Part 2:', run('19,20,14,0,9,1', 30000000));
