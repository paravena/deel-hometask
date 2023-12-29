import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './model';
import contracts from './routes/contracts';

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.get('/', (_req, res) => {
  res.send('Hello Deel JOBS API');
});

app.use('/api/contracts', contracts);

export default app;
