const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

// We will use a regex to find if there is an error
// Oh wait, JSDOM is not installed. I can't use it.
// I will just execute it via a dummy DOM.
