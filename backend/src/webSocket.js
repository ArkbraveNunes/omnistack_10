const socketio = require('socket.io');
const parseStringAsArray = require('./controllers/utils/Str_to_Array');
const calculateDistance = require('./controllers/utils/calculateDistance');

let io;
const connections = [];

exports.setupWebSocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    const { latitude, longitude, technologies } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      technologies: parseStringAsArray(technologies),
    });
  });
};

exports.findConnections = (coordinates, technologies) => {
  connections.filter((connection) => {
    const arrayTech = connection.technologies.some((tech) => technologies.includes(tech));

    return calculateDistance(coordinates, connection.coordinates) < 10 && arrayTech;
  });
};

exports.sendMessage = (to, message, data) => {
  if (to) {
    to.forEach(connection => io.to(connection.id).emit(message, data))}
  };
