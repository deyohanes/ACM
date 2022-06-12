 import Server from "socket.io";
let io;
let adIo;


const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_BASE_URL,
      methods: ['*'],
      allowedHeaders: ['*'],
    },
  });
  return io;
};

const initAdIo = (server, path = '/socket/adpage') => {
  adIo = new Server(server, {
    cors: {
      origin: process.env.CLIENT_BASE_URL,
      methods: ['*'],
      allowedHeaders: ['*'],
    },
    path: path,
  });
  return adIo;
};

const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

const getAdIo = () => {
  if (!adIo) {
    throw new Error('Socket.io not initialized');
  }
  return adIo;
};

export {
  init,initAdIo,getIo,getAdIo
};