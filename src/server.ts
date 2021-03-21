import express, { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';

import todoRoutes from './routes/todo';

const app = express();

app.use(cors.default());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

const port: number = 3000;

app.listen(port, () => {
    console.log(`server running on port -> ${port}`);
});
