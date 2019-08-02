const path = require('path');

const express = require('express');
const app = express();


const publicDirectoryPath = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather Application',
        author: 'Salim Hossain'
    });
});
app.get('/salim', (req, res)=>{
    res.send('Help me please!');
});


app.listen('3000', ()=>{
    console.log('Server is running on port 3000!');
});
