/** Command-line tool to generate Markov text. */


const fs = require("fs");
const { MarkovMachine } = require("./markov");
const axios = require("axios");
const process = require("process");


/** Make Markov machine from text and generate text from it. */

function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(`\n\n${mm.makeText()}\n\n`);
}


/** read file and generate text from it. */

function readText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}


/** read URL and make text from it. */


async function readURLText(url) {
  try {
    const resp = await axios.get(url);
    generateText(resp.data);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
}



/** interpret cmdline to decide what to do. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  readText(path);
}

else if (method === "url") {
  readURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}