const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4ba999489bec9badfa82ec7e37d383d9&query=' + latitude +','+ longitude + ' &units=m' 
    // 37.8267,-122.4233  encodeURIComponent(

    request({ url, json: true}, (error, {body}) => {
            if(error){
                callback('Unable to connect to the weather report...!',undefined)
            }else if(body.error){
                callback('Unable to find location!',undefined)
            }else {
                callback(undefined,' Weather code is:' + body.current.weather_code + '. Today is: ' + body.current.weather_descriptions + ', temperature is: ' + body.current.temperature + '. Humidity is: ' + body.current.humidity + ' , so temperature will feel like: ' + body.current.feelslike +'.')
            }   
        })
}

module.exports = forecast