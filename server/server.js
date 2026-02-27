// Step 1 import package
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// configuration
const app = express();
const PORT = process.env.PORT || 3000;

// Step 4 Use middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// Step 3 Route
const userRouter = require('./routes/users');
app.use('/api', userRouter)


// Step 2 start server
app.listen(PORT, () => console.log(`Server is running`));