import crypto from 'crypto';
import { query } from '../../db/index.cjs';

const generateKeyPair = () => crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'der',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'der',
    }
});
const generateHash = (input) => crypto.createHash('sha256').update(input).digest('base64');

export const createNode = async (isValidatorNode) => {
    const { publicKey, privateKey } = generateKeyPair();
    const address = generateHash(privateKey.toString('base64'));
    const sql = `
        INSERT INTO nodes (type, address, public_key)
        VALUES ($1, $2, $3);
    `;
    const { rows } = await query(sql, [isValidatorNode ? 'VALIDATOR' : 'NON_VALIDATOR', address, publicKey.toString('base64')]);
    return rows;
};
