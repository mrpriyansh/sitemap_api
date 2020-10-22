const express = require('express');
const sitemap = require('./controllers/puppet');
const router = express.Router();

module.exports = function(io) {
    console.log('a');
    io.on('connect', socket => {
        socket.on('join', () =>{
            console.log('hello');
            socket.emit('connected');
            // return callback();
        });

        socket.on('sendMessage', async(url, npages)=>{
            console.log(url, npages);
            console.log('received request');
            const results = await sitemap(url, npages,  socket);
            socket.emit('recieved', results);
        });
    })

    return router;
};