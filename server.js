const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const morgan = require('morgan');
const http = require('http');

const { handleError } = require('./services/handleError');

const app = express();
const server = http.createServer(app);

const io = socketio(server);
io.origins('*:*');

app.use(cors());
app.use(express.json({ extended: false }));
app.use(morgan('tiny'));

app.use(require('./api/socket')(io));

console.log('b');
// sitemap();

app.get('/', (req, res) => res.send('Server Up and running'));
app.use('/api', require('./api/index.js'));

app.all('*', (req, res) => {
  res.status(404).json('Invalid Request');
});
app.use((err, req, res) => {
  handleError(err, req, res);
});

const PORT = process.env.PORT || 3001;
// app.listen(PORT, ()=>{
//     console.log('Server is running ', PORT);
// })
server.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
