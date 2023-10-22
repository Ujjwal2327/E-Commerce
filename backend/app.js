import express from 'express';
const app = express();
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';

// middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies

// routes
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);


// error middleware
app.use(errorMiddleware);

export default app;