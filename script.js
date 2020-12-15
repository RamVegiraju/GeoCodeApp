var locationTest = "Ashburn Virginia"

const getLatLong = function() {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAy5JOBKGXUux-5VGVtWJzO2P63Qb4hW8Q',
    ).then(function(response){
        //console.log(response);
        response = response.json();
        console.log(response);
        return response;
    }).then(function(data){
        console.log(data);
        var geom = data.results[0].geometry;
        console.log(geom);
        var lat = geom.location.lat;
        var long = geom.location.lng;
        console.log("Latitude: " + lat, " Longitude: " + long);
    })
}

getLatLong();


