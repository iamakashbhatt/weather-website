const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forcast')
const app = express()
const port = process.env.PORT || 3000

// defined  paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handler bars engine  and vires location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup statjc dirtectory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Akash Bhatt'
    })

})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Akash Bhatt'
    })

})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some HelpFul text',
        title: 'Help',
        name: 'akash bhatt'
    })

})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you Must provide the address"
        })
    }

    geocode(req.query.address, (error, { latitude, longtitude, location }) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
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



app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Bhatt',
        errorMessage: 'Help page not found '
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash bhatt',
        errorMessage: 'Page Not found '
    })
})




app.listen(port, () => {
    console.log('server is up on port' + port)
})
