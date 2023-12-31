import express from 'express';
import productRoute from './routes/product.route.js';
import userRoute from './routes/user.route.js';
import orderRoute from './routes/order.route.js';
import bodyParser from 'body-parser';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';

const app = express();

// middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies

// routes
app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);

// error middleware
app.use(errorMiddleware);

export default app;