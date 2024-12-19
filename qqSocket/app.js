const express = require('express');
const expressWs = require('express-ws');

const app = express();
const { app: wsApp } = expressWs(app);

// 存储当前在线的 WebSocket 连接
const clients = [];

// 已使用的用户名数组
const usedUsernames = [];

// 生成随机用户名
function generateRandomUsername() {
    const names = ['张三', '李四', '王五', '赵六', '陈七', '钱八', '孙九', '杨十'];
    let randomUsername = '';

    // 生成不重复的用户名
    do {
        const randomIndex = Math.floor(Math.random() * names.length);
        randomUsername = names[randomIndex];
    } while (usedUsernames.includes(randomUsername));

    usedUsernames.push(randomUsername);
    return randomUsername;
}


// WebSocket 路由  一次完整的socket 连接 
wsApp.ws('/chat', (ws, req) => {
    // 将新连接的 WebSocket 加入到 clients 数组中
    clients.push(ws);

    // 随机生成用户名
    const username = generateRandomUsername();

    // 5. 发送指定类型的消息 发送欢迎消息给当前用户
    ws.send(JSON.stringify({ type: 'welcome', content: `欢迎, ${username}！` }));

    // 发送在线人数给所有客户端
    const broadcastOnlineCount = () => {
        clients.forEach(client => {
            client.send(JSON.stringify({ type: 'onlineCount', count: clients.length }));
        });
    };
    broadcastOnlineCount();

    // 当接收到消息时
    ws.on('message', (message) => {
        // 将消息发送给所有客户端
        clients.forEach(client => {
            client.send(JSON.stringify({ type: 'chatMessage', sender: username, content: message }));
        });
    });

    // 当连接关闭时
    ws.on('close', () => {
        // 从列表中移除关闭的客户端
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }

        // 从已使用的用户名数组中移除已关闭连接的用户名
        const usernameIndex = usedUsernames.indexOf(username);
        if (usernameIndex > -1) {
            usedUsernames.splice(usernameIndex, 1);
        }

        // 广播在线人数给所有客户端
        broadcastOnlineCount();

        // 判断列表中是否还有其他客户端，如果没有了就可以结束 WebSocket 服务
        if (clients.length === 0) {
            wsApp.close();
        }
    });
});

// 设置静态文件目录
app.use(express.static('public'));

// 主页路由
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});