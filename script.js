//URL encoding
var sampleURL = "http://www.image.com/?username=unknown&password=unknown";
var encodedURL = "http://www.foobar.com/foo?imageurl=" + encodeURIComponent(sampleURL);
//console.log(sampleURL);

function getAddress() {
    var address = document.getElementById("textInput").value;
}

const getLatLong = function(address) {
    var encodedAddress = encodeURIComponent(address);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAy5JOBKGXUux-5VGVtWJzO2P63Qb4hW8Q`,
    ).then(function(response){
        //console.log(response);
        response = response.json();
        //console.log(response);
        return response;
    }).then(function(data){
        //console.log(data);
        var geom = data.results[0].geometry;
        //console.log(geom);
        var lat = geom.location.lat;
        var long = geom.location.lng;
        console.log("Latitude: " + lat, " Longitude: " + long);
        //var res = [lat,long];
        var geometryOutput = `
          <ul class="list-group">
            <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
            <li class="list-group-item"><strong>Longitude</strong>: ${long}</li>
          </ul>
        `
        document.getElementById('geometry').innerHTML = geometryOutput;
    })
}

function mainFunc() {
    var sampleAddress = document.getElementById("textInput").value;
    getLatLong(sampleAddress);

}

//var coord = getLatLong("1600 Amphitheatre Parkway Mountain View CA");
//alert(coord);

//getLatLong("22551 Forest Manor Drive Ashburn VA");
//getLatLong("New York, New York");

/*
function mainRes() {

    //getting Form Value
    var formInput = document.getElementById("textInput").value;
    alert(formInput);
    //console.log(formInput);

    //input address into geocode API
    var res = getLatLong(formInput);
    console.log(res);
    alert(res);
    //console.log(res);

    //document.getElementById("geometry").innerHTML = `<div class="card-block" id="geometry">${res}</div>`;
    
}*/



