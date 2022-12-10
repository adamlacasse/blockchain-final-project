import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uiPath = `${__dirname}/../dist`;

app.use('/', express.static(uiPath));
app.use('/*', express.static(uiPath));

app.listen('3443', () => console.log('http://localhost:3443'));
