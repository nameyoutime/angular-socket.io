const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const body = require("body-parser");
const cors = require('cors');
app.use(body.json());
app.use(cors());

let temp = [];
app.get("/home", async (req, res) => {
    await res.send(temp);

})


app.put("/home", (req, res) => {
    let { message } = req.body;
    (async () => {
        let data = message;
        //giả sử là push lên database
        await temp.push({message:data});
        res.send(temp);
    })();
})



io.on('connection', (socket) => {
    console.log('user connected:' + socket.id);
    //mỗi khi front end emit gọi lại
    socket.on('message', data => {
        console.log(data);
        // io.emit('message', temp);

    })
});


server.listen(8080, '192.168.1.5', () => {
    console.log("running on port 192.168.1.5:8080")
})