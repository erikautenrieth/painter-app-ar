// const app = require("next")(); // Import Next.js
const next = require("next");
const app = next({ dev: process.env.NODE_ENV !== "production" });

const server = require("http").createServer(app); // Create an HTTP server using Next.js
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); // Create a socket.io server that listens on the HTTP server

io.on("connection", (socket) => {
  // When a user connects to the socket.io server
  console.log("a user connected"); // Log a message to the console

  socket.on("disconnect", () => {
    // When the user disconnects
    console.log("user disconnected"); // Log a message to the console
  });
});

const port = process.env.PORT || 3001; // Use the port specified by the PORT environment variable, or port 3001 if it's not defined
server.listen(port, () => {
  // Start listening on the specified port
  console.log(`listening on *:${port}`); // Log a message to the console when the server starts
});
