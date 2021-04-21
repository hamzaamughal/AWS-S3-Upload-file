require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk')
const uuid = require('uuid').v4;


const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "")
    }
})

const s3 = new AWS.S3()
//     {
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
// }

const upload = multer({ storage }).single('image')

app.get("/", (req, res) => {
    res.render("index")
})


app.post('/upload', upload, (req, res) => {
    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    s3.upload(params, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).send(data)
    })
    let presignedGetUrl = s3.getSignedUrl("getObject", {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Expires: 1000 * 6 //time to expire
    })
    console.log(presignedGetUrl, "presignedGetUrl");
})

app.listen(port, () => {
    console.log(`server is up at ${port}`);
})