const path = require('path');

const express = require('express');
const app = express();


const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));


app.get('', (req, res)=>{
    res.send('Help me!');
});
app.get('/salim', (req, res)=>{
    res.send('Help me please!');
});


app.listen('3000', ()=>{
    console.log('Server is running on port 3000!');
});
