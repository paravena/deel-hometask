import express from 'express';
import { sequelize } from './model';
import { admin, balances, contracts, jobs } from './routes';
import { errorHandlerMiddleware } from './middleware';

const app = express();
app.use(express.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.get('/', (_req, res) => {
  res.send('Hello Deel JOBS API');
});
app.use('/api/contracts', contracts);
app.use('/api/jobs', jobs);
app.use('/api/balances', balances);
app.use('/api/admin', admin);

app.use(errorHandlerMiddleware);
export default app;
