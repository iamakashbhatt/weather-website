const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWthc2hiaGF0dDExMSIsImEiOiJja2t1cWd5ZjcxZTBoMndvNjQ0MTRtZ3czIn0.suNq5AFflpC8vGvdmAUEFw&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("unable to connect to locatiob service", undefined)
        }
        else if (body.features.length === 0) {
            callback("unable to find the location .Try another search", undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode