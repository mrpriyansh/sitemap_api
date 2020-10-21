const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { handleError } = require('./services/handleError');

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));
app.use(morgan('tiny'));


// sitemap();

app.get('/', (req, res) => res.send('Server Up and running'));
app.use('/api', require('./api/index.js'));

app.use((err, req, res, next) =>{
    handleError(err, req, res);
});

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log('Server is running ', PORT);
})