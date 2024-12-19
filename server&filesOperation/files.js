
const express = require('express');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload')

const app = express();

app.use(express.json()); // 解析JSON请求体
app.use(express.urlencoded({ extended: true })); // 解析URL编码请求体
app.use(fileUpload())



app.post('/upload', (req, res) => {

    // upload file
    // move to specified folder
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send({
            message: 'No file uploaded',
            code: 400
        });
        return
    }

    let fileObject = req.files.file
    let filePath = './upload/' + fileObject.name;
    // Get the specific path

    // Get the specific path, current directory
    const fileFolder = path.join(__dirname, './upload')

    // check if upload folder exists, if not, create
    if (!fs.existsSync(fileFolder)) {
        // create folder
        fs.mkdirSync(fileFolder)
    }

    // Upload means moving the file to the upload folder
    fileObject.mv(filePath, (err) => {
        if (err) {
            res.status(500).send({
                message: 'File upload failed',
                code: 500
            });
            return
        }
        res.send({
            message: 'File uploaded successfully',
            code: 200
        });
    })

    // find file
    // get file
})


app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName
    console.log(fileName);
    
    const file = {
        name: 'icon.png',
        // path: './upload/icon.png'  // 也可自传路径
        path: path.join(__dirname, './upload', fileName)
    }
    let exists = fs.existsSync(path.resolve(file.path))
    if (exists) {
        res.download(file.path)
    } else {
        res.send({
            message: 'File not found',
            code: 404
        });
    }
})


app.listen(3000, () => {
    console.log('Server started on port 3000');
});