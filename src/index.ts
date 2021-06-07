/**
 * @module generate-passphrase
 * @author Reinaldy Rafli <hi@reinaldyrafli.com>
 * @license MIT
 */
import crypto from 'crypto';
import {readFileSync} from 'fs';
import {resolve} from 'path/posix';

interface generateOptions {
  length?: number,
  separator?: string,
  numbers?: boolean,
  uppercase?: boolean,
  titlecase?: boolean,
  pattern?: string
}

let randomBytes: Buffer;
let randomIndex: number;

function getRandomValue(): number {
  if (randomIndex === undefined || randomIndex >= randomBytes.length) {
    randomBytes = crypto.randomBytes(256);
    randomIndex = 0;
  }

  randomIndex += 1;
  return randomBytes[randomIndex];
}

function getRandomNumber(max: number): number {
  let rand = getRandomValue();
  while (rand === undefined || rand >= 256 - (256 % max)) {
    rand = getRandomValue();
  }

  return rand % max;
}

function getRandomPattern(length: number, numbers: boolean): string {
  const pool = (numbers) ? 'NWW' : 'WWW';
  let pattern = '';
  for (let i = 0; i < length; i++) {
    pattern += pool[getRandomNumber(2)];
  }

  return pattern;
}

function getRandomWord(): string {
  const words = readFileSync(resolve(__dirname, './words.txt'), 'utf8').split('\n');
  const randomInt = crypto.randomInt(0, words.length);
  return words[randomInt];
}

/**
 * Generate a passphrase with options
 * @param {generateOptions} options - The options
 * @returns {string} - A passphrase
 * @see Usage https://github.com/aldy505/generate-passphrase#how-to-use-this
 */
export function generate(options: generateOptions = {}): string {
  const defaults = {
    length: 4,
    separator: '-',
    numbers: true,
    uppercase: false,
    titlecase: false,
    pattern: null
  };

  const opts = {...defaults, ...options};

  if (opts.length <= 0) {
    throw new Error('Length should be 1 or bigger. It should not be zero or lower.');
  }

  const passphraseArray: Array<string | number> = [];

  let pattern: string;
  if (opts.pattern) {
    pattern = opts.pattern.toUpperCase();
  } else {
    pattern = getRandomPattern(opts.length, opts.numbers);
  }

  const eachPattern = pattern.split('');
  for (let i = 0; i < eachPattern.length; i += 1) {
    if (eachPattern[i] === 'N') {
      passphraseArray.push(getRandomValue());
    } else if (eachPattern[i] === 'W') {
      const word = getRandomWord();
      if (opts.uppercase) {
        passphraseArray.push(word.toUpperCase());
      } else if (opts.titlecase) {
        passphraseArray.push(word.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()));
      } else {
        passphraseArray.push(word);
      }
    } else {
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
 * @see Usage https://github.com/aldy505/generate-passphrase#how-to-use-this
 */
export function generateMultiple(amount: number, options: generateOptions = {}): Array<string> {
  const passphrase = [];
  for (let i = 0; i < amount; i++) {
    passphrase[i] = generate(options);
  }

  return passphrase;
}
