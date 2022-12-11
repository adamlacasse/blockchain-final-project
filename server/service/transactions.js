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

export const getTransactionByPollId = async (pollId) => {
    const sql = `
        SELECT * FROM transactions
        WHERE ($1, $2);
    `;
    const { rows } = await query(sql, [creatorSignature, data]);
    return rows;
};

const transactionDataOfPoll = {"id":1,"timestamp":"2022-12-11T20:34:25.442Z","meta_data":null,"respondent_award":44,"creator_address":"4Dijy2iNrV+Y+ovfYAhuCqKDl/y/o7OOKMRryRh2zaw=","questions":[{"id":1,"timestamp":"2022-12-11T20:37:25.341Z","creator_signature":null,"meta_data":null,"poll_id":1,"question":"how much wood would a woodchuck chuck?"},{"id":2,"timestamp":"2022-12-11T20:37:56.509Z","creator_signature":null,"meta_data":null,"poll_id":1,"question":"sample question #2"},{"id":3,"timestamp":"2022-12-11T20:38:01.371Z","creator_signature":null,"meta_data":null,"poll_id":1,"question":"sample question #3"},{"id":4,"timestamp":"2022-12-11T20:38:06.494Z","creator_signature":null,"meta_data":null,"poll_id":1,"question":"sample question #4444444"}]}
