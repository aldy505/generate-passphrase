/**
 * @module generate-passphrase
 * @author Reinaldy Rafli <aldy505@proton.me>
 * @license MIT
 */
import crypto from 'node:crypto';
import {readFileSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {type Buffer} from 'node:buffer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type GenerateOptions = {
  length: number;
  separator: string;
  numbers: boolean;
  uppercase: boolean;
  titlecase: boolean;
  pattern?: string;
  fast: boolean;
};

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

function getRandomNumber(max: number, fast = false): number {
  if (fast) {
    return Math.floor(Math.random() * max);
  }

  let rand = getRandomValue();
  while (rand === undefined || rand >= 256 - (256 % max)) {
    rand = getRandomValue();
  }

  return rand % max;
}

function getRandomPattern(length: number, numbers: boolean, fast = false): string {
  const pool = (numbers) ? 'NWW' : 'WWW';
  let pattern = '';
  for (let i = 0; i < length; i++) {
    pattern += pool[getRandomNumber(2, fast)];
  }

  return pattern;
}

const words = readFileSync(resolve(__dirname, './words.txt'), 'utf8').split('\n');
function getRandomWord(fast = false): string {
  const randomInt = fast ? Math.floor(Math.random() * words.length) : crypto.randomInt(0, words.length);
  return words[randomInt];
}

/**
 * Generate a passphrase with options
 * @param {GenerateOptions} options - The options
 * @returns {string} - A passphrase
 * @see Usage https://github.com/aldy505/generate-passphrase#how-to-use-this
 */
export function generate(options: Partial<GenerateOptions> = {}): string {
  const defaults: GenerateOptions = {
    length: 4,
    separator: '-',
    numbers: true,
    uppercase: false,
    titlecase: false,
    pattern: undefined,
    fast: false,
  };

  const options_ = {...defaults, ...options};

  if (options_.length <= 0) {
    throw new Error('Length should be 1 or bigger. It should not be zero or lower.');
  }

  const passphraseArray: Array<string | number> = [];

  const pattern = options_.pattern ? options_.pattern.toUpperCase() : getRandomPattern(options_.length, options_.numbers, options_.fast);

  const eachPattern = [...pattern];
  for (const element of eachPattern) {
    if (element === 'N') {
      passphraseArray.push(getRandomValue());
    } else if (element === 'W') {
      const word = getRandomWord(options_.fast);
      if (options_.uppercase) {
        passphraseArray.push(word.toUpperCase());
      } else if (options_.titlecase) {
        passphraseArray.push(word.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()));
      } else {
        passphraseArray.push(word);
      }
    } else {
      throw new Error('Unknown pattern found. Use N or W instead.');
    }
  }

  const passphrase = passphraseArray.join(options_.separator);
  return passphrase;
}

/**
 * Generate multiple passphrase with the same options
 * @param {number} amount - The number of passphrase returned
 * @param {GenerateOptions} options - The options
 * @returns {string[]} - Array of passphrases
 * @see Usage https://github.com/aldy505/generate-passphrase#how-to-use-this
 */
export function generateMultiple(amount: number, options: Partial<GenerateOptions> = {}): string[] {
  const passphrase = [];
  for (let i = 0; i < amount; i++) {
    passphrase[i] = generate(options);
  }

  return passphrase;
}
