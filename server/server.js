// Step 1 import package
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// configuration
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs')

// Step 4 Use middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

fs.readdirSync('./routes').map((item) => {
    app.use('/api', require('./routes/' + item))
})


// Step 3 Route
const userRouter = require('./routes/users');
app.use('/api', userRouter)


// Step 2 start server
app.listen(PORT, () => console.log(`Server is running`));