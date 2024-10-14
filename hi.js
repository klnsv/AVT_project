import crypto from 'node:crypto';

const salt = crypto.randomBytes(16).toString('hex');

// Hash the password using sha512
const hash = crypto.pbkdf2Sync('userPassword123', salt, 1000, 64, `sha256`).toString(`hex`);

console.log(`Hashed password: ${hash}`);
console.log(`Salt: ${salt}`);