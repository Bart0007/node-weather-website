const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/a62573d792921540147affe23206aff2/${long},${lat}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } degrees out. There is a ${
          body.currently.precipProbability
        } % chance of rain. The min temp is ${
          body.daily.data[0].temperatureLow
        } and the max is ${body.daily.data[0].temperatureHigh} `
      );
    }
  });
};

module.exports = forecast;
