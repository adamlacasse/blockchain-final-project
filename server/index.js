import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { createNode } from './service/nodes.js';
import { getAllTransactions, addTransactionToPool } from './service/transactions.js';
import { getAllPolls, submitPollForValidation } from './service/polls.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: 'true', limit: '100mb' }));
app.use(bodyParser.json({ limit: '1000mb' }));

const router = express.Router();

router.post('/nodes', async (req, res) => {
    const isValidatorNode = req.query.isValidatorNode === 'true';
    try {
        res.json(await createNode(isValidatorNode));
    } catch (error) {
        console.error('Error with createNode: ', error);
        res.status(error.code || 500).json(error);
    }
});

router.get('/transactions', async (req, res) => {
    try {
        res.json(await getAllTransactions());
    } catch (error) {
        console.error('Error with getAllTransactions: ', error);
        res.status(error.code || 500).json(error);
    }
});

router.post('/transactions', async (req, res) => {
    const { creatorSignature, data } = req.body;

    try {
        res.json(await addTransactionToPool(creatorSignature, data));
    } catch (error) {
        console.error('Error with addTransactionToPool: ', error);
        res.status(error.code || 500).json(error);
    }
});

router.post('/transactions/:pollId', async (req, res) => {
    const pollId = req.params.pollId;
    console.log('calling submitPollForValidation with ', pollId);
    try {
        res.json(await submitPollForValidation(pollId));
    } catch (error) {
        console.error('Error with submitPollForValidation: ', error);
        res.status(error.code || 500).json(error);
    }
});

router.get('/polls', async (req, res) => {
    try {
        res.json(await getAllPolls());
    } catch (error) {
        console.error('Error with getAllPolls: ', error);
        res.status(error.code || 500).json(error);
    }
});

app.use(router);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uiPath = `${__dirname}/../dist`;

app.use('/', express.static(uiPath));
app.use('/*', express.static(uiPath));

app.listen('3443', () => console.log('http://localhost:3443'));
