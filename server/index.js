const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket Connected: ${socket.id}`);

  socket.on("room:join", (data) => {
    const { email, room } = data;

    console.log(
      `User ${email} joined room ${room} with socket ID ${socket.id}`
    );

    socket.join(room);

    socket.to(room).emit("user:joined", { email, id: socket.id });

    io.to(socket.id).emit("room:join", { email, room });
  });

  socket.on("disconnect", () => {
    console.log(`Socket Disconnected: ${socket.id}`);
  });
});
