const path = require('path');

const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

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

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Salim Hossain'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Salim Hossain'
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must send the search term!'
        });
    }
    console.log(req.query);
    res.send({
        person: []
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text!',
        title: 'About me',
        name: 'Salim Hossain'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Salim Hossain',
        errorMessage: 'Help article not found!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Salim Hossain',
        errorMessage: 'Page not found!'
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
