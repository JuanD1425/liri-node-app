require("./lib/node_modules/dotenv").config();
const moment = require('./node_modules/moment');
const keys = require("./keys.js");
const Spotify = require("./lib/node_modules/node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("./lib/node_modules/axios");
const prompts = require('prompts');
const fs = require('fs');
// var response = {
//   liriCommand: "",
//   userInput: ""
// }



var questions = [{
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
    name: 'userInput',
    message: "Enter an artist's name",
  },
  {
    type: prev => prev == 'spotify-this-song' ? 'text' : null,
    name: 'userInput',
    message: 'Enter a song title',
  },
  {
    type: prev => prev == 'movie-this' ? 'text' : null,
    name: 'userInput',
    message: 'Enter a movie title',
  }
];

(async () => {
    const response = await prompts(questions);
     if(response.liriCommand == "do-what-it-says"){
       var file = fs.readFile("./random.txt", "utf8", function(err, data) {
         if (err) {
           throw err
         }
         var comma = data.indexOf(',');
         var apost = comma + 1;
         const fileDo = data.slice(0, comma);
         const fileUI = data.slice(apost);
         return fileDo, fileUI;
       });
       console.log(fileDo + "  " + fileUI);

     }

console.log(liriCommand, " lol");

// var liriCommand = response.liriCommand;
// ));
    // console.log(response);
    // var liriCommand = response.liriCommand;

// if (response.liriCommand == "do-what-it-says"){
//
//     if (liriCommand == "concert-this"){
//       response.liriCommand =
//       };
//       return response;
//       } else if (liriCommand == "spotify-this-song"){
//         var response = {
//           liriCommand: "spotify-this-song",
//           song: userInput
//         };
//         return response;
//       } else if (liriCommand == "movie-this"){
//         var response = {
//           liriCommand: "movie-this",
//           movie: userInput
//         };
//         return response;
//       };
//       console.log(response,"   3");
//       // return liriCommand, response;
// }


    // XXX:
    // console.log("end :" + end);
    // console.log("comma: " + comma);
    // console.log("data: " + data);
    // console.log(liriCommand);
    // console.log(userInput);
    // console.log(response);
    // console.log(textSplit);
    // return liriCommand, userInput, response


// function liri(liriCommand, response, userInput){
    switch (liriCommand) {
      case "concert-this":
        var term = data.userInput;
        var userInput = term.replace(/ /gi, "");
        var bandsURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
        console.log(bandsURL);


        axios.get(bandsURL).then(function(response) {
            var base = response.data
            // console.log(base);
            for (var i = 0; i < base.length; i++) {
              var eventTime = moment(base[i].datetime).format("MM/DD/YY")
              var info = base[i].venue
              var venue = info.name
              var location = "\n\nLocation: " + info.city + ", " + info.region + "\n          " + info.country
              console.log("==================================\n\n   Venue: " + venue + location + "\n\nDate: " + eventTime);


            }
          })
          .catch(function(err) {
            console.log(err)
            console.log("error");;
          });
        break;

      case "spotify-this-song":
        userInput = response.song;

        spotify.search({
            type: 'track',
            query: userInput
          })

          .then(function(response) {
            var info = response.tracks.items[0]
            var artistName = info.album["artists"][0]["name"]
            var songName = info.name
            var albumName = info.album["name"]
            var previewURL = info.preview;

            console.log("\n\nArtist(s): " + artistName + "\n\nSong: " + songName + "\n\nAlbum: " + albumName + "\n\nPreview: " + previewURL + "\n\n")
          })
          .catch(function(err) {
            console.log(err);
          });
        break;

      case "movie-this":
        term = response.movie;
        userInput = term.replace(/ /gi, "+");
        console.log(userInput);
        const omdbUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
        // + omdbID;
        axios.get(omdbUrl)
          .then(function(response) {
            var info = response.data;
            var movieTitle = info.Title;
            var movieYear = info.Year;
            var imdbRating = info.Ratings[0].Value;
            var rottenRating = info.Ratings[1].Value;
            var country = info.Country;
            var lang = info.Language;
            var actors = info.Actors;
            var plot = info.Plot;


            console.log("\n\n    Movie Title: " + movieTitle + "\n\n   Release Year: " + movieYear + "\n\n    IMDB Rating: " + imdbRating + "\n\nRotten Tomatoes: " + rottenRating + "\n\n        Country: " + country + "\n\n       Language: " + lang + "\n\n         Actors: " + actors + "\n\n           Plot: " + plot + "\n\n");
          }).catch(function(err) {
            console.log(err);
          });

        break;

      // case "do-what-it-says":
      //   var file = fs.readFile("./random.txt", "utf8", function(err, data) {
      //     if (err) {
      //       throw err
      //     };
      //     var comma = data.indexOf(',');
      //     var apost = comma + 1;
      //     // var end = data.lastIndexOf('"');
      //     liriCommand = data.slice(0, comma);
      //     var userInput = data.slice(apost);
      //     const response = "";
      //     // XXX:
      //     // console.log("end :" + end);
      //     // console.log("comma: " + comma);
      //     // console.log("data: " + data);
      //     console.log(liriCommand);
      //     console.log(userInput);
      //     console.log(response);
      //     // console.log(textSplit);
      //     return liriCommand, userInput, response
      //   })
        // , function ()
        // console.log(file);



        // break;
//
      // default:
      //   console.log("Error");

   };
// }
// .catch(function(err) {
//   console.log(err);
// })
// liri(liriCommand, response, userInput);

}();


// liriCase(liriCommand, response);
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
  //         var bandsURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
  //         console.log(bandsURL);
  //
  //         axios.get(bandsURL).then(function(response) {
  //           var base = response.data
  //           // console.log(base);
  //           for (var i = 0; i < base.length; i++) {
  //             var eventTime = moment(base[i].datetime).format("MM/DD/YY")
  //             var info = base[i].venue
  //             var venue = info.name
  //             var location = "\n\nLocation: " + info.city + ", " + info.region + "\n          " + info.country
  //             console.log("==================================\n\n   Venue: " + venue + location + "\n\nDate: " + eventTime);
  //             // var eventList = "\n\n    Date: " + eventTime
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
  //           var info = response.tracks.items[0]
  //           var artistName = info.album["artists"][0]["name"]
  //           var songName = info.name
  //           var albumName = info.album["name"]
  //           var previewURL = info.preview;
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
  //         var info = response.data;
  //         var movieTitle = info.Title;
  //         var movieYear = info.Year;
  //         var imdbRating = info.Ratings[0].Value;
  //         var rottenRating = info.Ratings[1].Value;
  //         var country = info.Country;
  //         var lang = info.Language;
  //         var actors = info.Actors;
  //         var plot = info.Plot;
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
