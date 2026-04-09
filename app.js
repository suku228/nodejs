const express = require('express');
const path= require('path');
const hbs = require('hbs');
const request = require('request');

const cors = require('cors');

const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'https://react-chk6dv9a.stackblitz.io'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));



require('dotenv').config();
// Access variables via process.env
console.log(process.env.PORT); 
console.log(process.env.JSONURL); 


// GET all posts
request( {url: process.env.JSONURL + '/users', json: true }, (err, _, body) => {
  if (err) return console.error(err);
  console.log(body[0].name,'--jj->',); // array of posts
});

// Define routes

const viewsPath = path.join(__dirname, './templates/views');
const partialspath = path.join(__dirname, './templates/partials');
const publicDirectoryPath = path.join(__dirname, './public');


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

app.get('/api/details', (req, res) => {
  res.send({
    name: 'Sueksh gampa',
    age: 28,
    city: 'Kathmandu'
  })
});


app.listen(process.env.PORT, () => {
  console.log('Server is running on port -->' + process.env.PORT);
});