
// main.js

require("dotenv").config();
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const { mySqlPool } = require('./config/db');
const { excel_Router } = require('./router/excel_Router');



const app = express();

app.use(cors({origin : `http://localhost:5173`, credentials : true}));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(excel_Router);


const PORT = 4545;

mySqlPool.query("SELECT 1").then(() => {
    
    console.log(`Database connection Success`.bgGreen);
    
    app.listen(PORT, () => {
    
        console.log(`Server running on http://localhost:${PORT}`.bgGreen);
    })

}).catch((err) => {
    
    console.log(`Error in Database connection : ${err.message}`.bgRed);

});

