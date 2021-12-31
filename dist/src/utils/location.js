"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const request_1 = __importDefault(require("request"));
const location_access_key = "pk.eyJ1Ijoib2xla3NhbmRyYXRrIiwiYSI6ImNreGhxa3MxNDBiMHQycXBlNTRtcTE5ODIifQ.5VmXzKpr42d4bxQtQ15TUg";
const localtion_url = (city, access_key) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${access_key}`;
const performLocationRequest = (city, callback) => {
    const url = localtion_url(city, location_access_key);
    (0, request_1.default)({ url: url, json: true }, (error, response) => {
        //console.log(response.body.features[0].center);
        if (error) {
            callback(`Unable to connect to location services!`);
        }
        else if (response.body.features.length === 0) {
            callback(`Unable to find location. Try another search.`);
        }
        callback(undefined, response.body.features[0].place_name, response.body.features[0].center);
    });
};
exports.default = performLocationRequest;
