import { query } from '../../db/index.cjs';

export const getAllTransactions = async () => {
    const { rows } = await query('SELECT * FROM transactions;', []);
    return rows;
};

export const addTransactionToPool = async (creatorSignature, data) => {
    const sql = `
        INSERT INTO transactions (creator_signature, data)
        VALUES ($1, $2);
    `;
    const { rows } = await query(sql, [creatorSignature, data]);
    return rows;
};
