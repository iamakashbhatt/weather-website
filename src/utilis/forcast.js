const request = require('request')
const forcast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3252e35740f80752672d39871bdfd102/' + latitude + ',' + longtitude

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback("Unable to connect to Weather service", undefined)
        }
        else if (body.error) {
            callback("Unable to find location ", undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + 'degree out. There is a  ' + body.currently.precipProbability + ' % chance of rain ')
        }
    })
}
module.exports = forcast

