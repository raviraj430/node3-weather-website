const express = require('express')
const path = require('path')
const app = express();
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const port = process.env.PORT || 3000

// console.log(__dirname);
// console.log(path.join(__dirname,'../'));

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(publicDirectoryPath);
console.log(viewsPath);

//setup hbs (handlebars) engine to serve
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directry to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: "Ravi"
    });
})

app.get('/help' , (req,res) => {
    res.render('help',{
        mob: 9852087314,
        add: 'Hyd'
    });
})

app.get('/about' , (req,res) => {
    res.render('about',{
        title: 'About Page',
        name : 'Ravi Raj'
    })
})

app.get('/products',(req,res) => {
     if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
     }
     console.log(req.query.search);
     
    res.send({
        products: []
    })
})

app.get('/weather' , (req,res) => {

    if (!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    // console.log(req.query.address);
    

    geocode(req.query.address,(error, {latitude,longitude,location}={}) => {
        if (error){
            return res.send({error});
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: "It is snowing",
    //     loc: 'Hyd',
    //     address: req.query.address
    // });
})

app.get('/help/*' , (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Ravi',
        errorMessage : 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Ravi raj',
        errorMessage: 'Page not found.'
    })
    
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
    
})

