const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define paths for express
const app = express()
const path = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebar engine and locations
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory for server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name: "Androw's student"
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About me',
        name: "Androw's student"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help me',
        name: "Androw's student"
    })
})


app.get('/weather', (req,res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided...'
        })
    }


    geocode(req.query.address, (error, {latitude, longitude, location } = {} ) => {
        if(error){
            return res.send({ error })
        }
   
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term...'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res) => {
    res.render('404', {
        title:'404',
        name: "Androw's student",
        errorMessage: 'Help artical not found!'
    })
})
app.get('*',(req,res) => {
    res.render('404', {
        title:'404',
        name: "Androw's student",
        errorMessage: 'Page not found!'
    })
})


app.listen(port , () => {
    console.log('Server is up on port' + port)
})





// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Androw'
//     },
//     {
//         name:'Sera'
//     }])
// })  

// app.get('/about', (req,res)  => {
//     res.send('<h1>About Express!</h1>')
// })



// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
// console.log(__filename)
// console.log(path.join(__filename,('./public')))


            // console.log(location)
            // console.log(forecastData)
    // res.send([{
    //     forecast:'It is snowing out site',
    //     location:'Philadolphia',
    //     address: req.query.address
    // }])