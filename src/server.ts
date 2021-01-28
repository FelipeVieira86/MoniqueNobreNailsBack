import express from 'express';

import routes from './routes';

import './database/connection';

const PORT = 3333;
const app = express();

app.use(express.json());

app.use(routes);

app.listen(PORT, () => { console.log(`Porta ${PORT}`); });