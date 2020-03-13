const request = require('request');

const forecast = (longitude,latitude,callback) => {
    
    const url='https://api.darksky.net/forecast/00f1fcfe5006b9545b3923ebd1d53764/' + latitude + ',' + longitude + '?lang=en' ;

    request({url,json:true},(error,response)=>{
    if(error){
        callback('Unable to fetch weather forecast  services for given longitude & latitude', undefined)
    }
    else if(response.body.daily.length=== 0){
        callback('Unable to find location. try another search.',undefined)
    }
    else{
        console.log(response.body.daily.data[0]);
        
        callback(undefined,`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. Currently, Raining preciptype:  ${response.body.daily.data[0].precipType} `)
    }
    
})
}
 module.exports= forecast;
