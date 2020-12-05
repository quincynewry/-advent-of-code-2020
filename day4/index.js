const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function run() {
    const fileStream = fs.createReadStream(path.join(__dirname, './input.txt'));

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let part1Count = 0;
    let part2Count = 0;
    let passportRecords = [];
    let passportRecord = {};
    const validProps = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    for await (const line of rl) {
        if (!line) {
            passportRecords.push(passportRecord);

            const keys = Object.keys(passportRecord);

            if (validProps.every((x) => keys.includes(x))) {
                part1Count++;

                if (validatePassport(passportRecord)) {
                    part2Count++;
                }
            }

            passportRecord = {};
            continue;
        }

        const parts = line.split(' ');

        for (const part of parts) {
            const propValue = part.split(':');
            passportRecord[propValue[0]] = propValue[1];
        }
    }

    console.log('Part 1: ', part1Count);
    console.log('Part 2: ', part2Count);
}

function validatePassport(passportRecord) {
    // validate birth year
    if (!validateRange(passportRecord.byr, 1920, 2002)) {
        return false;
    }

    // validate issue year
    if (!validateRange(passportRecord.iyr, 2010, 2020)) {
        return false;
    }

    // validate expiration year
    if (!validateRange(passportRecord.eyr, 2020, 2030)) {
        return false;
    }

    // validate height
    if (passportRecord.hgt.endsWith('cm') || passportRecord.hgt.endsWith('in')) {
        const min = passportRecord.hgt.endsWith('cm') ? 150 : 59;
        const max = passportRecord.hgt.endsWith('cm') ? 193 : 76;

        if (!validateRange(passportRecord.hgt.replace('cm', '').replace('in', ''), min, max)) {
            return false;
        }
    } else {
        return false;
    }

    // validate hair colour
    if (!/^#[0-9A-F]{6}$/i.test(passportRecord.hcl)) {
        return false;
    }

    // validate eye colours
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passportRecord.ecl)) {
        return false;
    }

    // validate passport
    if (!/^[0-9]{9}$/i.test(passportRecord.pid)) {
        return false;
    }

    return true;
}

function validateRange(value, min, max) {
    if (value && value >= min && value <= max) {
        return true;
    }

    return false;
}

run();
