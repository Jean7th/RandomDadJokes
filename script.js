// Grab a reference for neccessary HTML elements
// Link to HTML class 'joke-text'
const jokeText = document.querySelector('.joke-text');
// Link to HTML class 'new-joke-btn'
const jokeBtn = document.querySelector('.new-joke-btn');
// Link to HTML class 'speak-joke-btn'
const speakBtn = document.querySelector('.speak-joke-btn');

// Add 'click' listener to 'new-joke-btn'
jokeBtn.addEventListener('click', getJoke);

// Add 'click' listener to 'speak-joke-btn'
speakBtn.addEventListener('click', speakJoke);

// Get new Joke method
// getJoke();

// getJoke() function definition
function getJoke() {
    //Make an API request
    fetch('https://icanhazdadjoke.com/', {
    headers: {
            'Accept': 'application/json'
        }        
    }).then(function(response) {
        /* Convert Stringified JSON response to JavaScript Object */
        return response.json();
    }).then(function(data) {
        /* replace innerText of .joke-text with data.joke */
        // extract the joke text
        const joke = data.joke;
        // do the replacement
        jokeText.innerText = joke;
    }).catch(function(error) {
        // if some error occured
        jokeText.innerText = 'Oh no! Some error happened...';
        // console log the error
        console.log(error);
    });
}

// Read the Joke
speakJoke();

// speakJoke() function definition
function speakJoke() {
    // get the innerText to respond
    var joke = jokeText.innerText;
    // add to text to speech fuction
    const utterance = new SpeechSynthesisUtterance(joke);
    // control the pitch, speed and volume
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
    // get voices
    const voices = speechSynthesis
        .getVoices()
        .filter(voice => voice.lang = 'en-GB');
    utterance.voice = voices[7];
    speechSynthesis.speak(utterance);
}