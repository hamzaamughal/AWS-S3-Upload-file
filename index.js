require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk')
const uuid = require('uuid').v4;


const app = express();
const port = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`server is up at ${port}`);
})