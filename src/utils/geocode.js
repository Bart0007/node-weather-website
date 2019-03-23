const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1IjoiY2hhcGVsbCIsImEiOiJjanRic3hqMncwazFsNDV0ZjIxZHo2Mm9iIn0.94ztLnaArUYrnHrwaakl2g`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        placeName: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
