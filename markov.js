/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length - 1; i += 1) {
      let bigram = this.words[i] + " " + this.words[i + 1];
      let nextWord = this.words[i + 2] || null;

      if (chains.has(bigram)) chains.get(bigram).push(nextWord);
      else chains.set(bigram, [nextWord]);
    }

    this.chains = chains;
  }

  /** Pick random choice from array */

  choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }



   /** return random text from chains */

   makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = this.choice(keys);
    let out = [];
  
    // produce markov chain until reaching termination word or until no more options available
    while (out.length < numWords && key !== null) {
      let [w1, w2] = key.split(" ");
      out.push(w1);
      let nextOptions = this.chains.get(key);
      if (!nextOptions) break; // terminate if no options available
      key = `${w2} ${this.choice(nextOptions)}`;
    }
    return out.join(" ");
  }
}


module.exports = {
  MarkovMachine,
}