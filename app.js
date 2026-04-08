const express = require('express');
const path= require('path');
const hbs = require('hbs');
const request = require('request');

const app = express();


// GET all posts
request( {url: 'https://jsonplaceholder.typicode.com/users', json: true }, (err, _, body) => {
  if (err) return console.error(err);
  console.log(body[0].name,'--jj->',); // array of posts
});

// Define routes

const viewsPath = path.join(__dirname, './templates/views');
const partialspath = path.join(__dirname, './templates/partials');
const publicDirectoryPath = path.join(__dirname, './public');
console.log("--->",publicDirectoryPath);

app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialspath);


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('home', {
        title: 'Weather',
        name: 'Sueksh gampa'
    });
});

app.get('/help', (req, res) => {
  res.render('help', {
        title: 'Help',
        name: 'Sueksh gampa'
    });
});

app.get('/about', (req, res) => {
  res.render('about', {
        title: 'About',
        name: 'Sueksh gampa'
    });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});