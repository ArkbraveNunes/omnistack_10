const express= require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    routes = require('./routes/routes'),
    http = require('http');

const app = express();
const server = http.Server(app);
const { setupWebSocket } = require('./webSocket');

setupWebSocket(server);

mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster01-qs3nb.mongodb.net/omnistack10?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333,() => 
    console.log('App full power on port 3333'))