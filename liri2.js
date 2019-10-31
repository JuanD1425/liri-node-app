
require("./lib/node_modules/dotenv").config();
const moment = require('./node_modules/moment');
const Spotify = require("./lib/node_modules/node-spotify-api");
const axios = require("./lib/node_modules/axios");
const keys = require("./keys.js");
//const omdbID = process.env.OMDB_ID;
// const inquirer = require('inquirer');
let spotify = new Spotify(keys.spotify);
let liriCommand = "";
let term = "";
const prompts = require('prompts');
const fs = require('fs');

const questions = [{
    type: 'select',
    name: 'liriCommand',
    message: 'What would you like to search for?',
    choices: [{
        title: "Concerts",
        value: "concert-this"
      },
      {
        title: "Songs",
        value: "spotify-this-song"
      },
      {
        title: "Movies",
        value: "movie-this"
      },
      {
        title: "Do What It Says",
        value: "do-what-it-says"
      }
    ],
    initial: 0
  },
  {
    type: prev => prev == 'concert-this' ? 'text' : null,
    name: 'input',
    message: "Enter an artist's name",
  },
  {
    type: prev => prev == 'spotify-this-song' ? 'text' : null,
    name: 'input',
    message: 'Enter a song title',
  },
  {
    type: prev => prev == 'movie-this' ? 'text' : null,
    name: 'input',
    message: 'Enter a movie title',
  }];

async () => {
  const response = await prompts(questions);
  console.log(response);
  liriCommand = response.liriCommand;
   userInput = response.input;

  const file = await fs.readFile

  if (liriCommand ==  "do-what-it-says") {
    fs.readFile("./random.txt", (err, data) => {
    if (err) throw err;
    console.log(data);
      var comma = data.indexOf(',');
      var apost = comma + 1;
      const liriCommand = data.slice(0, comma);
      const userInput = data.slice(apost);
      return liriCommand, userInput;
    });
  )

  }
}
  // console.log(liriCommand);
  //

  switch (liriCommand) {
    case "concert-this":
      term = response.input;
      userInput = term.replace(/ /gi, "");
      let bandsURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
      console.log(bandsURL);


      axios.get(bandsURL).then(function(response) {
          let base = response.data;
          console.log(base);
          for (let i = 0; i < base.length; i++) {
            let eventTime = moment(base[i].datetime).format("MM/DD/YY")
            let info = base[i].venue
            let venue = info.name
            let location = "\n\nLocation: " + info.city + ", " + info.region + "\n          " + info.country
            console.log("==================================\n\n   Venue: " + venue + location + "\n\nDate: " + eventTime);


          }
        })
        .catch(function(err) {
          console.log(err)
          console.log("error");;
        });
      break;

    case "spotify-this-song":

      userInput = response.input;

      spotify.search({
          type: 'track',
          query: userInput
        })

        .then(function(response) {
          let info = response.tracks.items[0]
          let artistName = info.album["artists"][0]["name"]
          let songName = info.name
          let albumName = info.album["name"]
          let previewURL = info.preview;

          console.log("\n\nArtist(s): " + artistName + "\n\nSong: " + songName + "\n\nAlbum: " + albumName + "\n\nPreview: " + previewURL + "\n\n")
        })
        .catch(function(err) {
          console.log(err);
        });
      break;

    case "movie-this":
      term = response.input;
      userInput = term.replace(/ /gi, "+");
      console.log(userInput);
      const omdbUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
      // + omdbID;
      axios.get(omdbUrl)
        .then(function(response) {
          let info = response.data;
          let movieTitle = info.Title;
          let movieYear = info.Year;
          let imdbRating = info.Ratings[0].Value;
          let rottenRating = info.Ratings[1].Value;
          let country = info.Country;
          let lang = info.Language;
          let actors = info.Actors;
          let plot = info.Plot;


          console.log("\n\n    Movie Title: " + movieTitle + "\n\n   Release Year: " + movieYear + "\n\n    IMDB Rating: " + imdbRating + "\n\nRotten Tomatoes: " + rottenRating + "\n\n        Country: " + country + "\n\n       Language: " + lang + "\n\n         Actors: " + actors + "\n\n           Plot: " + plot + "\n\n");
        }).catch(function(err) {
          console.log(err);
        });

      break;

    case "do-what-it-says":



      // , function ()
      console.log(file);



      break;

    default:
    console.log("error");
    break;

  };

// inquirer.prompt([
//   {
//     name: "type",
//     type: "list",
//     choices:
//     ["concert-this", "spotify-this-song", "movie-this" ],
//     message: "Where would you like to begin your search?"
//   },{
//     name: "input",
//     message: "Input search term:"
//   }
// ]).then(answers => {
//   term = answers.input
//   liriCommand =  answers.type;
//   console.log(userInput);
//   console.log(liriCommand);
//
//   switch (liriCommand) {
//     case "concert-this":
//         userInput = term.replace(/ /gi, "");
//         let bandsURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
//         console.log(bandsURL);
//
//         axios.get(bandsURL).then(function(response) {
//           let base = response.data
//           // console.log(base);
//           for (let i = 0; i < base.length; i++) {
//             let eventTime = moment(base[i].datetime).format("MM/DD/YY")
//             let info = base[i].venue
//             let venue = info.name
//             let location = "\n\nLocation: " + info.city + ", " + info.region + "\n          " + info.country
//             console.log("==================================\n\n   Venue: " + venue + location + "\n\nDate: " + eventTime);
//             // let eventList = "\n\n    Date: " + eventTime
//             // j = i - 1
//             // if (i > 0 && venue === base[j].venue.name) {
//             //   eventList += "\n\n          " + moment(base[j].datetime).format("MM/DD/YY")
//             // }
//             // console.log(eventList);
//
//           }
//       })
//         .catch(function(err) {
//           console.log(err)
//           console.log("error");;
//         });
//       break;
//
//     case "spotify-this-song":
//
//       userInput = term;
//
//       spotify.search({ type: 'track', query: userInput})
//
//         .then(function(response) {
//           let info = response.tracks.items[0]
//           let artistName = info.album["artists"][0]["name"]
//           let songName = info.name
//           let albumName = info.album["name"]
//           let previewURL = info.preview;
//
//         console.log("\n\nArtist(s): " + artistName + "\n\nSong: " + songName + "\n\nAlbum: " + albumName + "\n\nPreview: " + previewURL +"\n\n")
//       })
//       .catch(function(err) {
//         console.log(err);
//       });
//       break;
//
//     case "movie-this":
//     userInput = term.replace(/ /gi, "+");
//     console.log(userInput);
//           const omdbUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
//            // + omdbID;
//     axios.get(omdbUrl)
//       .then(function(response) {
//         let info = response.data;
//         let movieTitle = info.Title;
//         let movieYear = info.Year;
//         let imdbRating = info.Ratings[0].Value;
//         let rottenRating = info.Ratings[1].Value;
//         let country = info.Country;
//         let lang = info.Language;
//         let actors = info.Actors;
//         let plot = info.Plot;
//
//
//         console.log("\n\n    Movie Title: " + movieTitle + "\n\n   Release Year: " + movieYear + "\n\n    IMDB Rating: " + imdbRating + "\n\nRotten Tomatoes: " + rottenRating + "\n\n        Country: " + country + "\n\n       Language: " + lang + "\n\n         Actors: " + actors + "\n\n           Plot: " + plot + "\n\n");
//       }).catch(function(err) {
//         console.log(err);
//       });
//
//       break;
//
//     case "do-what-it-says":
//
//
//
//       break;
//
//     default:
//
//   }
// });
