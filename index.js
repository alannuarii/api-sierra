// const express = require("express");
// const app = express();
// const port = 3000;
// const bodyParser = require("body-parser");
// const morgan = require("morgan");
// const router = require("./routes/router");
// const cors = require("cors");

// // Add Middleware
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(morgan("dev"));

// // Main Route
// app.use("/", router);

// // Running Port
// app.listen(port, () => {
//   // Command : npm run dev
//   console.log(`Example app listening on port http://127.0.0.1:${port}`);
// });

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("./routes/router");
const cors = require("cors");

// Add Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// WebSocket
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // Kirim data beban PLTS setiap 1 detik
  const interval = setInterval(() => {
    const bebanPlts = Math.random() * 100; // contoh data beban PLTS acak
    socket.emit("bebanPlts", bebanPlts);
  }, 1000);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Main Route
app.use("/", router);

// Running Port
server.listen(port, () => {
  // Command : npm run dev
  console.log(`Example app listening on port http://127.0.0.1:${port}`);
});

