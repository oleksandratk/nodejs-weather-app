"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const hbs_1 = __importDefault(require("hbs"));
//import * as weatherApp from '../../weather-app/src/app';
const location_1 = __importDefault(require("./utils/location"));
const weather_1 = __importDefault(require("./utils/weather"));
///Users/oleksandratkalich/Desktop/Node JS Course/web-server/dist/src
//onsole.log(__dirname);
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path_1.default.join(__dirname, "../public");
const viewsPath = path_1.default.join(__dirname, "../templates/views");
const partialsPath = path_1.default.join(__dirname, "../templates/partials");
app.set('view engine', 'hbs');
app.use(express_1.default.static(publicDirectoryPath));
app.set('views', viewsPath);
hbs_1.default.registerPartials(partialsPath);
app.get('', (_, response) => {
    response.render('index', {
        title: 'Home page',
        name: 'Oleksandra',
        footer: 'index'
    });
});
app.get('/weather', (request, response) => {
    if (!request.query.adress) {
        response.render('weather', {
            error: 'No adress has been provided!',
            title: 'Weather',
            footer: 'weather'
        });
        return 'No adress has been provided!';
    }
    else {
        (0, location_1.default)(request.query.adress, (error, name, location) => {
            if (error) {
                response.render('weather', {
                    weather: error,
                    title: 'Weather',
                    footer: 'weather'
                });
                //return error;
            }
            const city = name;
            console.log(`Latitude: ${location[1]}`);
            console.log(`Longitude: ${location[0]}`);
            (0, weather_1.default)(location.reverse(), (error, { temperature, feelslike, precip } = {}) => {
                console.log("Temperature: " + temperature);
                if (error) {
                    response.render('weather', {
                        weather: error,
                        title: 'Weather',
                        footer: 'weather'
                    });
                    //return error;
                }
                const message = 'It is currently ' +
                    temperature + ' degrees out and it feels like ' +
                    feelslike + '. There is a ' +
                    precip + '% chance of rain.';
                response.render('weather', {
                    city: city,
                    weather: message,
                    title: 'Weather',
                    footer: 'weather'
                });
                //return message;
            });
        });
        //return 'Could not fetch any data';
    }
});
app.get('*', (_, response) => {
    response.render('404', {
        title: '404',
        name: 'Oleksandra',
        errorMessage: 'Page not found.'
    });
});
/* app.listen(3000, () => {
    console.log(`Server is up and running`)
}) */
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
