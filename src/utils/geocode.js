const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoib3JvOTgiLCJhIjoiY2tzanZ0a2FuMDY5aTJvcXVlaDNyY3c2MyJ9.1Q4y4P0j47cq8-TU-MK9jA&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Network is broken!',undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try another location..!',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }   
    })
}

module.exports = geocode