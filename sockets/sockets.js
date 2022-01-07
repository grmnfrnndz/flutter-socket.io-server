const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Rammstein'));
bands.addBand(new Band('Akira Yamoka'));
bands.addBand(new Band('Blur'));
bands.addBand(new Band('Los Tres'));


console.log(bands);

// mensajes de sockets
io.on('connection', client => {

    console.log('SOCKET: Cliente conectado');


    client.emit('active-bands', bands.getBands());


    client.on('disconnect', () => { 
        console.log('SOCKET: Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('SOCKET: mensaje!!!!!', payload);
        io.emit('mensaje', {admin: 'saludando a todos'});
    });

    client.on('emitir-mensaje', (payload) => {
        console.log('mensaje recibido: ', payload);
        // io.emit('nuevo-mensaje', payload); // emite a todos
        client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos al que lo emitio
    });

    client.on('vote-band', (payload) => {
        console.log(payload);

        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands()); //todos los servidores
    });

    
    client.on('add-band', (payload) =>{

        bands.addBand(new Band(payload.nombre));
        io.emit('active-bands', bands.getBands()); //todos los servidores
    });

    client.on('delete-band', (payload) =>{

        console.log(payload.id);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands()); //todos los servidores
    });

});
