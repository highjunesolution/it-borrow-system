// Step 1 import package
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// configuration
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs')
const path = require('path')

// Step 4 Use middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/uploads/assets', express.static(path.join(__dirname, 'uploads/assets')));

// Step 3 Routex
fs.readdirSync('./routes').map((item) => {
    app.use('/api', require('./routes/' + item))
})

// const userRouter = require('./routes/users');
// app.use('/api', userRouter)


// Step 2 start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));