import dotenv from 'dotenv';
import express from 'express';
import * as cors from 'cors';
import errorHandler from './middleware/errorHandler';
import mongoose from 'mongoose';

import authRoutes from './routes/authen';

dotenv.config();
// init express
const app: express.Express = express();

// connect db
let mongodbURL: string = process.env.MONGODB_URL!;
mongoose
    .connect(mongodbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`mongodb coonect success`);
    })
    .catch((err) => {
        console.log(
            `MongoDB connection error. Please make sure MongoDB is running. ${err}`
        );
    });

// middleware
app.use(cors.default());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// init route path
app.use('/api/auth/', authRoutes);

app.use(errorHandler);

const port: number = 3000 || process.env.PORT;

// port run
app.listen(port, () => {
    console.log(`server running on port -> ${port}`);
});
