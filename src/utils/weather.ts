import request from 'request';

const weather_access_key: string = '64890277832c5c87145923a084f7579d';
const weather_url = "http://api.weatherstack.com/current?";

type dataType = {
  access_key: string,
  query: Location
}

type Location = string | number []

const encodeQueryData = (data: any):string => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

//lat 50.25
//long 30.5 comment

const performWeatherRequest = (location: Location, callback: any ) => {
  const data: dataType = { access_key: weather_access_key, query: location};
  
  request({url: weather_url + encodeQueryData(data), json: true}, (error, response) => {
    if (error)
    {
      callback(`Unable to connect to weather services!`)
    }
    else if(response.body.success === false)
    {
      callback(`Unable to find location. Try another search.`)
    }

    callback(undefined, response.body.current);
  })
}

export {performWeatherRequest as default}; 