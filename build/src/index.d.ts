interface generateOptions {
    length?: number;
    separator?: string;
    numbers?: boolean;
    uppercase?: boolean;
    titlecase?: boolean;
    pattern?: string;
}
/**
 * Generate a passphrase with options
 * @param {generateOptions} options - The options
 * @returns {string} - A passphrase
 */
export declare function generate(options?: generateOptions): string;
/**
 * Generate multiple passphrase with the same options
 * @param {number} amount - The number of passphrase returned
 * @param {generateOptions} options - The options
 * @returns {Array<string>} - Array of passphrases
 */
export declare function generateMultiple(amount: number, options?: generateOptions): Array<string>;
export {};
