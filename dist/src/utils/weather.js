"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const request_1 = __importDefault(require("request"));
const weather_access_key = '64890277832c5c87145923a084f7579d';
const weather_url = "http://api.weatherstack.com/current?";
const encodeQueryData = (data) => {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
};
//lat 50.25
//long 30.5 comment
const performWeatherRequest = (location, callback) => {
    const data = { access_key: weather_access_key, query: location };
    (0, request_1.default)({ url: weather_url + encodeQueryData(data), json: true }, (error, response) => {
        if (error) {
            callback(`Unable to connect to weather services!`);
        }
        else if (response.body.success === false) {
            callback(`Unable to find location. Try another search.`);
        }
        callback(undefined, response.body.current);
    });
};
exports.default = performWeatherRequest;
