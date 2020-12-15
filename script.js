//URL encoding
var sampleURL = "http://www.image.com/?username=unknown&password=unknown";
var encodedURL = "http://www.foobar.com/foo?imageurl=" + encodeURIComponent(sampleURL);
//console.log(sampleURL);

const renderCountry = function(data, className = '') {
    const countryInfo = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
      document.getElementById("countryInfoGraph").innerHTML = countryInfo;
};

const getCountryData = function(country) {
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json(),
    err => alert(err))
    .then(data => {
        console.log(data);
        renderCountry(data[0]);
    })
  };

/*
function searchCountries(sampCountriesList) {
    countryList = ["usa", "india", "portugal"];
    return countryList.some(item => arr2.includes(item));
}*/

const getLatLong = function(address) {

    if(!address) {
        alert("Need to input an address for function to work.")
    }

    var encodedAddress = encodeURIComponent(address);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyAy5JOBKGXUux-5VGVtWJzO2P63Qb4hW8Q`,
    ).then(function(response){
        //console.log(response);
        response = response.json();
        console.log(response);
        return response;
    }).then(function(data){
        //console.log(data);

        //address data with country, state
        var addressComponents = data.results[0].address_components;
        console.log(addressComponents);

        //get country names
        longNames = [];
        shortNames = [];
        for (var i = 0; i < addressComponents.length; i++) {
            longNames.push(addressComponents[i].long_name);
            shortNames.push(addressComponents[i].short_name);
        }
        console.log(longNames);
        console.log(shortNames);

        //countries supported right now
        countryList = ["usa", "india", "portugal", "USA", "INDIA", "PORTUGAL", "United States", "united states"];

        //check for any of these countries in the address inputted
        const filteredArray = countryList.filter(value => longNames.includes(value)).toString();
        console.log(filteredArray);
        var countryName = "";
        if (filteredArray == "United States" || "united states" || "United States of America") {
          countryName = "usa";
        }else{
          countryName = filteredArray;
        }
        console.log(countryName);

        //Dealing with lat long coordinates
        var geom = data.results[0].geometry;
        //console.log(geom);
        var lat = geom.location.lat;
        var long = geom.location.lng;
        console.log("Latitude: " + lat, " Longitude: " + long);
        //var res = [lat,long];
        var geometryOutput = `
        <br>
        <h2>Coordinates</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
            <li class="list-group-item"><strong>Longitude</strong>: ${long}</li>
          </ul>
          <br>
          <br>
          <br>
          <br>
        `
        document.getElementById('geometry').innerHTML = geometryOutput;

        //rendering country information for address given
        getCountryData(countryName);
    })
}



function mainFunc() {
    var sampleAddress = document.getElementById("textInput").value;
    getLatLong(sampleAddress);

}

/*
var coord = getLatLong("1600 Amphitheatre Parkway Mountain View CA");
alert(coord);

getLatLong("22551 Forest Manor Drive Ashburn VA");
getLatLong("New York, New York");



function getAddress() {
    var address = document.getElementById("textInput").value;
}

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

