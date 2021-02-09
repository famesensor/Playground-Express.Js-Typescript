import express, { Request, Response, NextFunction } from 'express';

import todoRoutes from './routes/todo';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(3000);
