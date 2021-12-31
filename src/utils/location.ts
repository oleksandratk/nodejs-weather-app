import request from 'request';

const location_access_key = "pk.eyJ1Ijoib2xla3NhbmRyYXRrIiwiYSI6ImNreGhxa3MxNDBiMHQycXBlNTRtcTE5ODIifQ.5VmXzKpr42d4bxQtQ15TUg";
const localtion_url = (city: string, access_key: string) => 
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${access_key}`;

const performLocationRequest = (city: string, callback: any):void => {
    const url:string = localtion_url(city, location_access_key)
    
    request({url: url, json: true}, (error, response) => {
        //console.log(response.body.features[0].center);
        if (error){
            callback(`Unable to connect to location services!`)
        } else if(response.body.features.length === 0) {
            callback(`Unable to find location. Try another search.`)
        }
        callback(undefined, response.body.features[0].place_name, response.body.features[0].center);
         
  })
}

export {performLocationRequest as default}