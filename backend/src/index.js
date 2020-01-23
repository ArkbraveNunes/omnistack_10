const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes/routes');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');

const app = express();
const server = http.Server(app);
const { setupWebSocket } = require('./webSocket');

setupWebSocket(server);

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster01-qs3nb.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).then(result => console.warn(`Database connection sucessfull`))
  .catch((err) => console.error(err.message));

app.use(cors());
app.use(express.json());
app.use('/api-documentation',swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use(routes);

server.listen(3333, () => console.warn(`Connection Sucessfull on port 3333`));
