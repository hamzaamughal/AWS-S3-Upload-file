require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk')
const uuid = require('uuid').v4;


const app = express();
const port = process.env.PORT || 3000;