require('dotenv').config();
const express = require('express');
const {dbConnect} = require('./config/database');

const app = express()
const port = process.env.PORT || 5001

app.use(express.json())
app.use("/api", require('./routes'));




app.listen(port, ()=>{
    console.log({Server:"ON", Puerto:port})
})
dbConnect()