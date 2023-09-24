import pieces from './pieces.json' assert { type: 'json' };

var currentAudio = "";
var currentName = "";
var currentComposer = "";
let bruh = pieces.ML3;
console.log(bruh);
const aud = document.getElementById("aud");
const audsrc = document.getElementById("audsrc");
let semester = 1;
let answertype = "Selection";

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
    let r = rand(bruh);
    let f = r.file;
    let n = r.name;
    let c = r.composer;
    currentAudio = f;
    currentName = n;
    currentComposer = c;
    playAudio(f);
}

function populateAnswers() {
    if (answertype === "Selection") {
        let a = document.getElementById("sanswer");
        bruh.forEach((element, key) => {
            a[key] = new Option(element.name + ", " + element.composer, element.file);
        });
    }
}
populateAnswers();

document.getElementById("confirm").onclick = function () {
    if (answertype === "Selection") {
        document.getElementById("sanswer").blur();
        let guess = document.getElementById("sanswer").value;
        console.log(guess, currentAudio);
        if (guess === currentAudio) {
            alert("Correct");
        }
        else {
            alert("Incorrect");
        }
    }
    else if (answertype === "Typing") {
        // Case insensitive!
        document.getElementById("tanswer").blur();
        let guess = document.getElementById("tanswer").value.toUpperCase();
        let ans = (currentName + ", " + currentComposer).toUpperCase();
        console.log(guess, ans);
        if (guess === ans) {
            alert("Correct");
        }
        else {
            alert("Incorrect");
        }
    }
    nextAudio();

};

document.getElementById("sanswer").onchange = function () {
    document.getElementById("sanswer").blur();
}

document.getElementById("answertype").onchange = function () {
    const a = document.getElementById("answertype").value;
    const f = document.getElementById("sanswer");
    const g = document.getElementById("tanswer");
    if (a === "Typing") {
        f.style.display = "none";
        g.style.display = "";
        answertype = "Typing";
    }
    else if (a === "Selection") {
        f.style.display = "";
        g.style.display = "none";
        answertype = "Selection";
    }
}

document.getElementById("semester").onchange = function () {
    semester = document.getElementById("semester").value;
}

document.getElementById("next").onclick = function () {
    nextAudio();
};

// when sem changes

const selector = document.getElementById('selector');
bruh.forEach((element, key) => {
    let label = document.createElement('label');
    label.innerHTML = element.name;
    let button = document.createElement('input');
    let br = document.createElement('br');
    button.setAttribute('type', 'checkbox');
    button.setAttribute('checked', 'true');
    button.setAttribute('style', 'float: right');
    selector.appendChild(label);
    selector.appendChild(button);
    selector.append(br);
});
