import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// handling uncaught error - ex - console.log(undeclared_variable)
process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
})

// dotenv config
dotenv.config(
  { path: './backend/.env' }
);

// connect to database
connectDB();

// start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// unhandled promise rejection - to remove try-catch blocks from db.js and make it unhandled
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  })
})