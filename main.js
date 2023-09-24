import pieces from './pieces.json' assert { type: 'json' };

var currentAudio = "";
let bruh = pieces.ML3;
console.log(bruh);
const aud = document.getElementById("aud");
const audsrc = document.getElementById("audsrc");

setTimeout(nextAudio(), 3000);


function rand(list) {
    console.log(list)
    let item = list[Math.floor(Math.random()*list.length)];
    return item;
}

function playAudio(input) {
    input = "./static/ML3/" + input;
    audsrc.src = input; 
    aud.load();
    aud.play();
}

function nextAudio() {
    let f = rand(bruh).file;
    currentAudio = f;
    playAudio(f);
}

let a = document.getElementById("answer");
bruh.forEach((element, key) => {
    a[key] = new Option(element.name + ", " + element.composer, element.file);
});

document.getElementById("confirm").onclick = function () {
    document.getElementById("answer").blur();
    let guess = document.getElementById("answer").value;
    console.log(guess, currentAudio);
    if (guess === currentAudio) {
        alert("Correct");
    }
    else {
        alert("Incorrect");
    }
    nextAudio();

};

document.getElementById("answer").onchange = function () {
    document.getElementById("answer").blur();
}

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        event.preventDefault();
        let guess = document.getElementById("answer").value;
        console.log(guess, currentAudio);
        if (guess === currentAudio) {
            alert("Correct");
        }
        else {
            alert("Incorrect");
        }
    }
})

document.getElementById("next").onclick = function () {
    nextAudio();
};
