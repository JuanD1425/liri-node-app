require("./lib/node_modules/dotenv").config();
const moment = require('./node_modules/moment');
const Spotify = require("./lib/node_modules/node-spotify-api");
const axios = require("./lib/node_modules/axios");
const keys = require("./keys.js");
const omdbID = process.env.OMDB_ID;
let spotify = new Spotify(keys.spotify);
let liriCommand = process.argv[2];
let userInput = "";

switch (liriCommand) {
  case "concert-this":
    if (process.argv.length <= 4) {
      userInput = process.argv[3].replace(/ /gi, "");
      console.log(userInput);
    } else {
      for (let i = 3; i < process.argv.length; i++) {
            userInput += process.argv[i]
            }
          }
      let bandsURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
      console.log(bandsURL);

      axios.get(bandsURL).then(function(response) {
        let base = response.data
        console.log(base);
        for (let i = 0; i < base.length; i++) {
          let eventTime = moment(base[i].datetime).format("MM/DD/YY")
          let info = base[i].venue
          let venue = info.name
          let location = "\n\nLocation: " + info.city + ", " + info.region + "\n          " + info.country
          console.log("==================================\n\n   Venue: " + venue + location + "\n\nDate: " + eventTime);
          // let eventList = "\n\n    Date: " + eventTime
          // j = i - 1
          // if (i > 0 && venue === base[j].venue.name) {
          //   eventList += "\n\n          " + moment(base[j].datetime).format("MM/DD/YY")
          // }
          // console.log(eventList);

        }
    })
      .catch(function(err) {
        console.log(err)
        console.log("erroe");;
      });
    break;

  case "spotify-this-song":

  if (process.argv.length <= 4) {
     userInput = process.argv[3];
    } else {
      for (let i = 3; i < process.argv.length; i++) {
          if (i >= 3 &&   i < (process.argv.length - 1)) {
            userInput += process.argv[i] + " "
          } else {
            userInput += process.argv[i]
            }
          }
        }
    spotify.search({ type: 'track', query: userInput})

      .then(function(response) {
        let info = response.tracks.items[0]
        let artistName = info.album["artists"][0]["name"]
        let songName = info.name
        let albumName = info.album["name"]
        let previewURL = info.preview;

      console.log("\n\nArtist(s): " + artistName + "\n\nSong: " + songName + "\n\nAlbum: " + albumName + "\n\nPreview: " + previewURL +"\n\n")
    })
    .catch(function(err) {
      console.log(err);
    });
    break;

  case "movie-this":

  if (process.argv.length <= 4) {
    userInput = process.argv[3].replace(/ /gi, "+");
    } else {
      for (let i = 3; i < process.argv.length; i++) {
          if (i >= 3 &&   i < (process.argv.length - 1)) {
            userInput += process.argv[i] + "+";
          } else {
            userInput += process.argv[i]
            }
          }
        }
        const omdbUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
         // + omdbID;
  axios.get(omdbUrl)
    .then(function(response) {
      let info = response.data;
      console.log(response.data.Ratings[0].Value);
      let movieTitle = info.Title;
      let movieYear = info.Year;
      let imdbRating = info.Ratings[0].Value;
      let rottenRating = info.Ratings[1].Value;
      let country = info.Country;
      let lang = info.Language;
      let actors = info.Actors;
      let plot = info.Plot;


      console.log("\n\n    Movie Title: " + movieTitle + "\n\n   Release Year: " + movieYear + "\n\n    IMDB Rating: " + imdbRating + "\n\nRotten Tomatoes: " + rottenRating + "\n\n        Country: " + country + "\n\n       Language: " + lang + "\n\n         Actors: " + actors + "\n\n           Plot: " + plot + "\n\n");
    })
    break;

  case "do-what-it-says":



    break;

  default:

}
