import { query } from '../../db/index.cjs';
import { transactionTypes } from '../constants.js';

const addQuestionsToPoll = async (pollId) => {
    const { rows } = await query('SELECT * FROM questions WHERE poll_id = $1;', [pollId]);
    return rows;
};

export const getAllPolls = async () => {
    const { rows } = await query('SELECT * FROM polls;', []);
    const pollsWithQuestions = rows.map(async (poll) => {
        const questions = await addQuestionsToPoll(poll.id);
        return { ...poll, questions };
    });
    return Promise.all(pollsWithQuestions);
};

export const submitPollForValidation = async (pollId) => {
    const pollQueryResults = await query('SELECT * FROM polls WHERE id = $1;', [pollId]);
    const poll = pollQueryResults.rows[0];
    const questions = await addQuestionsToPoll(pollId);
    const pollWithQuestions = { ...poll, questions };
    const sql = `
        INSERT INTO transactions (type, data)
        VALUES ($1, $2);
    `;
    const { rows } = await query(sql, [transactionTypes.addPoll, JSON.stringify(pollWithQuestions)]);
    return rows;
};
