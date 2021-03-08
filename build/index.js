import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

let randomBytes;
let randomIndex;
function getRandomValue() {
    if (!randomIndex || randomIndex >= randomBytes.length) {
        randomBytes = crypto.randomBytes(256);
        randomIndex = 0;
    }
    randomIndex += 1;
    return randomBytes[randomIndex];
}
function getRandomNumber(max) {
    let rand = getRandomValue();
    while (rand >= 256 - (256 % max)) {
        rand = getRandomValue();
    }
    return rand % max;
}
function getRandomPattern(length, numbers) {
    /**
     * PATTERNS:
     * N: NUMBER
     * W: WORD
     */
    const pool = (numbers) ? 'NWW' : 'WWW';
    let pattern = '';
    for (let i = 0; i < length; i += 1) {
        pattern += pool[getRandomNumber(pool.length)];
    }
    return pattern;
}
function getRandomWord() {
    const wordsArray = fs.readFileSync(path.resolve(__dirname, 'words.txt'), 'utf8').split('\n');
    const randomInt = crypto.randomInt(0, wordsArray.length);
    return wordsArray[randomInt];
}
/**
 * Generate a passphrase with options
 * @param {generateOptions} options - The options
 * @returns {string} - A passphrase
 */
function generate(options = {}) {
    const defaults = {
        length: 4,
        separator: '-',
        numbers: true,
        uppercase: false,
        titlecase: false,
        pattern: '',
    };
    const opts = { ...defaults, ...options };
    const passphraseArray = [];
    let pattern;
    if (opts.pattern) {
        pattern = opts.pattern.toUpperCase();
    }
    else {
        pattern = getRandomPattern(opts.length, opts.numbers);
    }
    const eachPattern = pattern.split('');
    for (let i = 0; i < eachPattern.length; i += 1) {
        if (eachPattern[i] === 'N') {
            passphraseArray.push(getRandomValue());
        }
        else if (eachPattern[i] === 'W') {
            const word = getRandomWord();
            if (opts.uppercase) {
                passphraseArray.push(word.toUpperCase());
            }
            else if (opts.titlecase) {
                passphraseArray.push(word.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()));
            }
            else {
                passphraseArray.push(word);
            }
        }
        else {
            throw new Error('Unknown pattern found. Use N or W instead.');
        }
    }
    const passphrase = passphraseArray.join(opts.separator);
    return passphrase;
}
/**
 * Generate multiple passphrase with the same options
 * @param {number} amount - The number of passphrase returned
 * @param {generateOptions} options - The options
 * @returns {Array<string>} - Array of passphrases
 */
function generateMultiple(amount, options = {}) {
    const passphrase = [];
    for (let i = 0; i < amount; i += 1) {
        passphrase[i] = generate(options);
    }
    return passphrase;
}

export { generate, generateMultiple };
