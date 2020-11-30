const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // io.on('connection', (socket) => {
  //   socket.on('chat message', (msg) => {
  //     io.emit('chat message', msg);
  //   });
  // });
});

http.listen(PORT, () => {
  console.log("listening on PORT");
});

// app.get("/", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     //disconnect event
//     console.log("user disconnected");
//   });
// });
