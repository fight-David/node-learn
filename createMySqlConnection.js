// 结合MySQL数据库
const connection = mysql.createConnection({
    host: 'mysql.sqlpub.com',
    user: 'dengwei',
    password: 'RGrVFVAfdGGID3V2',
    database: 'nodelearn'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
});

connection.query('select * from student', (err, results, fields) => {
    if (err) throw err;
    // 定义POST请求的路由
    app.post('/api', (req, res) => {
        res.send(results);
    });

    // 定义POST请求的路由
    app.get('/api', (req, res) => {
        res.send(results);
    });

    // 启动服务器
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
});

connection.end((err) => {
    if (err) {
        console.error('Error closing MySQL database connection: ' + err.stack);
        return;
    }
    console.log('MySQL database connection closed');
});
