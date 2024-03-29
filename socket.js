let io;
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: process.env.CLIENT,
        allowedHeaders: [
          "Access-Control-Allow-Origin",
          "Access-Control-Allow-Credentials",
        ],
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Scoket.IO not initialized!");
    }
    return io;
  },
};
