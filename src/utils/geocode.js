const request = require('request');

const geocode = (address, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGVyZWlzc2FsaW0iLCJhIjoiY2p5a2c3dGs2MGU3MDNtcnU0czl4dG5tMSJ9.W5LkJC1d1IlJ2PDz-i2JCw`;

    request({url, json: true}, (error, { body })=>{
        if(error){
            callback('Unable to connect to location service!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find Location. Try another search.', undefined);
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;