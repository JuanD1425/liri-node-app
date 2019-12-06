require("dotenv").config();
const moment = require("moment");
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const axios = require("axios");
const ask = require("inquirer");
const fs = require("fs");

const searchTopic = {
    type: "list",

    name: "command",
    message: "Please select one of these topics to search:",
    choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-wants"]
};

function searchQuery() {
    ask
        .prompt(searchTopic)
        .then(function(answer) {
            let ans = answer.command;
            searches(ans);
        })
        .catch(err => console.log(err));
}

function searches(answer) {
    switch (answer) {
        case "concert-this":
            ask
                .prompt({
                    type: "input",
                    name: "artist",
                    message: "Please type the name of the artist you would like to see:"
                })
                .then(function(response) {
                    concert(response.artist);
                })

            .catch(function(err) {
                console.log(err);
            });
            break;
        case "spotify-this-song":
            ask
                .prompt({
                    type: "input",
                    name: "query",
                    message: "Please type the title of the song:"
                })
                .then(function(response) {
                    spot(response.query);
                })
                .catch(function(err) {
                    console.log(err);
                });

            break;
        case "movie-this":
            ask
                .prompt({
                    type: "input",
                    name: "query",
                    message: "Please type the title of the movie:"
                })
                .then(function(response) {
                    movie(response.query);
                })
                .catch(function(err) {
                    console.log(err);
                });

            break;
        case "do-what-it-wants":
            rf();
    }
}

function concert(response) {
    let query = response.replace(/ /gi, "");
    let bandsURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
    axios
        .get(bandsURL)
        .then(function(response) {
            let info = response.data;
            // console.log(info);
            for (let i = 0; i < info.length; i++) {
                let eventTime = moment(info[i].datetime).format("MM/DD/YY");
                let place = info[i].venue;
                let venue = place.name;
                let location =
                    "\n\nLocation: " + place.city + ", " + place.region + "\n          " + place.country;
                console.log(
                    "==================================\n\n   Venue: " +
                    venue +
                    location +
                    "\n\n     Date: " +
                    eventTime
                );
            }
        })
        .catch(function(err) {
            console.log(err);
        });
}

function spot(ans) {
    spotify
        .search({
            type: "track",
            query: ans
        })
        .then(function(response) {
            let info = response.tracks.items[0];
            let artistName = info.album["artists"][0]["name"];
            let songID = info.album["artists"][0]["id"];
            let songName = info.name;
            let albumName = info.album["name"];
            let previewURL = "http://open.spotify.com/track/" + songID;

            console.log(
                "\n\nArtist(s): " +
                artistName +
                "\n\nSong: " +
                songName +
                "\n\nAlbum: " +
                albumName +
                "\n\nPreview: " +
                previewURL +
                "\n\n"
            );
        })
        .catch(function(err) {
            console.log(err);
        });
}

function movie(query) {
    let userInput = query.replace(/ /gi, "+");
    const omdbUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    axios
        .get(omdbUrl)
        .then(function(response) {
            // console.log(response);
            let info = response.data;
            let movieTitle = info.Title;
            let movieYear = info.Year;
            let imdbRating = info.Ratings[0].Value;
            let rottenRating = info.Ratings[1].Value;
            let country = info.Country;
            let lang = info.Language;
            let actors = info.Actors;
            let plot = info.Plot;

            console.log(
                "\n\n    Movie Title: " +
                movieTitle +
                "\n\n   Release Year: " +
                movieYear +
                "\n\n    IMDB Rating: " +
                imdbRating +
                "\n\nRotten Tomatoes: " +
                rottenRating +
                "\n\n        Country: " +
                country +
                "\n\n       Language: " +
                lang +
                "\n\n         Actors: " +
                actors +
                "\n\n           Plot: " +
                plot +
                "\n\n"
            );
        })
        .catch(function(err) {
            console.log(err);
        });
}

function rf() {
    fs.readFile("./random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        let arrayD = data.split(",");
        for (let i = 0; i < arrayD.length; i++) {
            console.log(arrayD[i]);
        }
        let command = arrayD[0];
        let query = arrayD[1];
        if (command[0] === "concert-this") {
            concert(query);
        } else if (command === "spotify-this-song") {
            spot(query);
        } else if (command === "movie-this") {
            movie(query);
        } else {
            console.log("Sorry something went wrong, restart");
        }
    });
}

searchQuery();
