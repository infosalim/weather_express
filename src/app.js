const path = require('path');

const express = require('express');
const hbs = require('hbs');

const app = express();

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
// customized views deirecotory
//const viewsPath = path.join(__dirname, '../templates');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
// set cutomized directory
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static direcory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather Application',
        author: 'Salim Hossain'
    });
});

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Salim Hossain'
    });
});

app.get('/help', (req, res)=>{
    res.render('help',{
        helpText: 'This is some helpful text!',
        title: 'About me',
        name: 'Salim Hossain'
    });
});


app.listen('3000', ()=>{
    console.log('Server is running on port 3000!');
});
