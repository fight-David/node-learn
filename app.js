
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json()); // 解析JSON请求体
app.use(express.urlencoded({ extended: true })); // 解析URL编码请求体
app.use(cors());

// 1. 将 ejs 设置为默认的模板引擎
app.set('view engine', 'ejs')
// 2. 设置模板引擎的存放处
app.set('views', './views')

const homeList = [
    { id: 1, name: '上海' },
    { id: 2, name: '北京' },
    { id: 3, name: '南京' }
]

app.get('/api2', (req, res) => {
    // 1. 文件名， 2. 数据
    res.render('api2', { homeList: homeList })
})

// const router = require('./routes/student');
const stuRouter = require(path.join(__dirname, 'routes', 'student'))
app.use('/student', stuRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});