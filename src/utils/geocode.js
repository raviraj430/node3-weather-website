const request = require('request')



//callback Abstraction (GeoCode)
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmF2aXJhajQzMCIsImEiOiJjazdsc3NxZWQwN2I1M25wYTRxZDk5dHQxIn0.pDvs-BnoTJAbo0CrTAxC8A';
    
    request({url: url,json: true},(error, response) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if (response.body.features.length === 0){
            callback('Unable to find location. try another search.', undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
    }

    module.exports= geocode;