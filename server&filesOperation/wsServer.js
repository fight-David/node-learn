const WebSoket = require('ws')

const wss = new WebSoket.Server({ port: 3000 })

wss.on('connection', ws => {
    console.log('我是Soket 我连接上了')
    ws.on('message', data => {
        // 接收到指挥
        ws.send('消息结果:' + data)
    })

    ws.on('close', () => {
        console.log('走了~ 走了')
    })

})
