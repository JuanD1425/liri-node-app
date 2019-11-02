// require("dotenv").config();
// const moment = require('moment');
// const keys = require("./keys.js");
// const Spotify = require("node-spotify-api");
// const spotify = new Spotify(keys.spotify);
// const axios = require("axios");
const prompts =  require('prompts');
const fs = require('fs');

const questions = [{
  type: 'select',
  name: 'command',
  message: 'Please pick one of the categories to search.',
  choices: [
    {title: 'Concerts by Artist', value: 'concert-this'},
    {title: 'Songs by Track Title', value: 'spotify-this-song'},
    {title: 'Movie by Title', value: 'movie-this'},
    {title: 'Do What It Says', value: 'do-what-it-says'}
],
  initial: 0
},
  {
    type: prev => prev  === 'concert-this' ? 'text' : null,
    value: 'query',
    message: "Enter Artist's Name:"
  },
  {
    type: prev => prev  === 'spotify-this-song' ? 'text' : null,
    value: 'query',
    message: 'Enter Song Title:'
  },
  {
    type: prev => prev  === 'movie-this' ? 'text' : null,
    value: 'query',
    message: 'Enter Movie Title:'
  }];

let answers = AsyncFunction();{
    try {
    const response = await prompts(questions);
    let command = response.command;
    let input = response.query;
    return { command, input}
    } catch (e) {
    throw (e);
  }
}
)
(async function readFile() {
  const file = await fs.readFile('./random.txt', 'utf8', function(data, err){
    let first = data.indexOf('"');
    let last = data.lastIndexOf('"');
    let middle = data.indexOf(',');
    const fileCommand = data.splitText(first + 1, middle - 1), fileQuery = data.splitText(middle + 1, last - 1);
    let newVar;
    newVar = {
      command: fileCommand,
      query: fileQuery
    };
    return newVar;
  })
})();

if (answers.command !== 'do-what-it-says') {
  let promise = answers(questions)
      .then().catch();
} else {
  let response1 = readFile();
  console.log(response1);
}