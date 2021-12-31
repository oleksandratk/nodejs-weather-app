import express from 'express'
import path from 'path'
import hbs from 'hbs'

//import * as weatherApp from '../../weather-app/src/app';

import getLocation from './utils/location';
import getWeather from './utils/weather';

///Users/oleksandratkalich/Desktop/Node JS Course/web-server/dist/src
//onsole.log(__dirname);

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath:string = path.join(__dirname, "../templates/views")
const partialsPath:string = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (_:any, response:any) => {
    response.render('index', {
        title: 'Home page',
        name: 'Oleksandra',
        footer: 'index'
    })
})

app.get('/weather', (request:any, response:any) => { 
    if(!request.query.adress){
        response.render('weather', {
            error: 'No adress has been provided!',
            title: 'Weather',
            footer: 'weather'
        });
    }
    else {
        const data = getLocation(request.query.adress, (error:string, name: string, location: number[]) => {
            if (error)
            {  
                response.render('weather', {
                    weather: error,
                    title: 'Weather',
                    footer: 'weather'
                })
            }

            const city = name;
            /* console.log(`Latitude: ${location[1]}`);
            console.log(`Longitude: ${location[0]}`); */
        
            getWeather(location.reverse(), (error: string, { temperature, feelslike, precip }: any = {}) => {
                //console.log(temperature);
                if (error) {
                    response.render('weather', {
                        weather: error,
                        title: 'Weather',
                        footer: 'weather'
                    })
                }
                const message: string = 'It is currently ' +
                    temperature + ' degrees out and it feels like ' +
                    feelslike + '. There is a ' +
                    precip + '% chance of rain.';
                
                response.render('weather', {
                    city: city,
                    weather: message,
                    title: 'Weather',
                    footer: 'weather'
                })
              })
            })

    }
})

app.get('*', (_:any, response:any) => {
    response.render('404', {
        title: '404',
        name: 'Oleksandra',
        errorMessage: 'Page not found.'
    })
})


/* app.listen(3000, () => {
    console.log(`Server is up and running`)
}) */

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})