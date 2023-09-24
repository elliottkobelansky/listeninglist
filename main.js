async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

const pieces = await getData("./pieces.json");

var currentAudio = "";
var currentName = "";
var currentComposer = "";
let bruh = pieces.ML3;
console.log(bruh);
const aud = document.getElementById("aud");
const audsrc = document.getElementById("audsrc");
let semester = 1;
let answertype = "Selection";

nextAudio(false);

function rand(list) {
    console.log(list)
    let item = list[Math.floor(Math.random()*list.length)];
    return item;
}

function playAudio(input, play = true) {
    //input = "./static/ML3/" + input;
    audsrc.src = input; 
    aud.load();
    if (play) {
        aud.play();
    }
    else {
        aud.pause();
    }
}

function nextAudio(play = true) {
    let r = rand(bruh);
    let f = r.file;
    let n = r.name;
    let c = r.composer;
    // Prevent duplicates
    while (n == currentName) {
        let r = rand(bruh);
        let f = r.file;
        let n = r.name;
        let c = r.composer;
    }
    currentAudio = f;
    currentName = n;
    currentComposer = c;
    console.log(f);
    playAudio(f, play);
}

function populateAnswers() {
    if (answertype === "Selection") {
        let a = document.getElementById("sanswer");
        a.innerHTML = "";
        bruh.forEach((element, key) => {
            a[key] = new Option(element.name + ", " + element.composer, element.file);
        });
    }
    const selector = document.getElementById('selector');
    selector.innerHTML = "";
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
            alert("Incorrect. Correct answer: " + currentName + ", " + currentComposer);
        }
    }
    else if (answertype === "Typing") {
        // Case insensitive!
        document.getElementById("tanswer").blur();
        let guess = document.getElementById("tanswer").value.toUpperCase();
        let ans = (currentName + ", " + currentComposer);
        let sans = ans.toUpperCase();
        console.log(guess, ans);
        if (guess === sans) {
            alert("Correct");
        }
        else {
            alert("Incorrect. Correct answer: " + ans);
        }
        document.getElementById("tanswer").value = '';
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
        alert(
            "Type piece name EXACTLY followed by a comma and the composers last name or common nickname (case-insensitive). Example: Rondo Alla Turca, Mozart"
        )
        f.style.display = "none";
        g.style.display = "";
        answertype = "Typing";
    }
    else if (a === "Selection") {
        f.style.display = "";
        g.style.display = "none";
        answertype = "Selection";
        populateAnswers();
    }
}

document.getElementById("semester").onchange = function () {
    semester = document.getElementById("semester").value;
    if (semester == 3) {
        bruh = pieces.ML3;
    }
    else if (semester == 1) {
        bruh = pieces.ML1;
    }
    populateAnswers();
    nextAudio(false);
}

document.getElementById("next").onclick = function () {
    nextAudio();
};

document.getElementById("cat").onclick = function () {
    return aud.paused ? aud.play() : aud.pause();
};

// when sem changes

