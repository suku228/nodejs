const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://jsonplaceholder.typicode.com/todos/'+location

    request.get({url, "Content-Type": "application/json"}, (error, data) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else {
            callback(undefined, data);
        }
    })

}

module.exports = geocode;