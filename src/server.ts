import express, { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
import errorHandler from './middleware/errorHandler';

import todoRoutes from './routes/todo';
import authRoutes from './routes/authen';

const app = express();

app.use(cors.default());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth/', authRoutes);
app.use('/api/todos', todoRoutes);

app.use(errorHandler);

const port: number = 3000;

app.listen(port, () => {
    console.log(`server running on port -> ${port}`);
});
