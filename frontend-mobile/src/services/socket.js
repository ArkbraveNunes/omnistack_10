import  socketio  from "socket.io-client";

 const socket = socketio('http://192.168.0.103:3333',{
    autoConnect: false,
})

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction)
}

function connect( latitude, longitude, technologies ) {
    socket.io.opts.query = { latitude, longitude, technologies }
    
    socket.connect()

    socket.on('message', text =>{
        console.log(text);        
    })
}

function disconnect(params) {
    if (socket.connected) socket.disconnect()
}

export { connect, disconnect, subscribeToNewDevs };