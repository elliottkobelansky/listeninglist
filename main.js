async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

const pieces = await getData("./pieces.json");

let semester = localStorage.getItem("semester")
if (!semester) {
    semester = 1;
}
let bruh = {
    1: pieces.ML1, 
    3: pieces.ML3
}[semester];
document.getElementById("semester").value = semester;

let answertype = localStorage.getItem("answertype")
if (!answertype) {
    answertype = "Select";
}
document.getElementById("answertype").value = answertype;
loadAnswerType(false);



var currentAudio = "";
var currentName = "";
var currentComposer = "";
console.log(bruh);
const aud = document.getElementById("aud");
const audsrc = document.getElementById("audsrc");

let cor = 0;
let tot = 0;

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
    currentAudio = f;
    currentName = n;
    currentComposer = c;
    console.log(f);
    playAudio(f, play);
}

// copied from stackoverflow lmao
function removeDuplicates(originalArray, objKey) {
  var trimmedArray = [];
  var values = [];
  var value;

  for(var i = 0; i < originalArray.length; i++) {
    value = originalArray[i][objKey];

    if(values.indexOf(value) === -1) {
      trimmedArray.push(originalArray[i]);
      values.push(value);
    }
  }

  return trimmedArray;

}

function populateAnswers() {
    let x = removeDuplicates(bruh, "name");
    console.log(x)
    if (answertype === "Select") {
        let a = document.getElementById("sanswer");
        a.innerHTML = "";
        x.forEach((element, key) => {
            a[key] = new Option(element.name + ", " + element.composer, element.name);
        });
    }
    const selector = document.getElementById('selector');
    selector.innerHTML = "";
    x.forEach((element, key) => {
        let label = document.createElement('a');
        label.innerHTML = "<b>" + (key + 1) + "</b>  " + element.name;
        let br = document.createElement('br');
        selector.appendChild(label);
        selector.append(br);
    });
}
populateAnswers();

document.getElementById("confirm").onclick = function () {
    if (answertype === "Select") {
        document.getElementById("sanswer").blur();
        let guess = document.getElementById("sanswer").value;
        console.log(guess, name);
        if (guess === currentName) {
            alert("Correct");
            cor = cor + 1;
        }
        else {
            alert("Incorrect. Correct answer: " + currentName + ", " + currentComposer);

        }
    }
    else if (answertype === "Type") {
        // Case insensitive!
        document.getElementById("tanswer").blur();
        let guess = document.getElementById("tanswer").value.toUpperCase();
        let ans = (currentName + ", " + currentComposer);
        let sans = ans.toUpperCase();
        console.log(guess, ans);
        if (guess === sans) {
            alert("Correct");
            cor = cor + 1;
        }
        else {
            alert("Incorrect. Correct answer: " + ans);
        }
        document.getElementById("tanswer").value = '';
    }
    tot = tot + 1;
    document.getElementById("cor").innerHTML = cor;
    document.getElementById("tot").innerHTML = tot;
    document.getElementById("perc").innerHTML = Math.round(cor/tot * 100);
    nextAudio();

};

document.getElementById("sanswer").onchange = function () {
    document.getElementById("sanswer").blur();
}

function loadAnswerType (alt = true) {
    const a = document.getElementById("answertype").value;
    const f = document.getElementById("sanswer");
    const g = document.getElementById("tanswer");
    if (a === "Type") {
        console.log(alert);
        if (alt == true) {
            alert("Type piece name EXACTLY followed by a comma and the composers last name or common nickname (case-insensitive). Example: Rondo Alla Turca, Mozart")
        }
        f.style.display = "none";
        g.style.display = "";
        answertype = "Type";
    }
    else if (a === "Select") {
        f.style.display = "";
        g.style.display = "none";
        answertype = "Select";
        populateAnswers();
    }
    console.log(answertype);
    localStorage.setItem("answertype", answertype);
}

document.getElementById("answertype").onchange = function () {
    loadAnswerType();
};

document.getElementById("semester").onchange = function () {
    semester = document.getElementById("semester").value;
    bruh = {
        1: pieces.ML1, 
        3: pieces.ML3
    }[semester];
    localStorage.setItem("semester", semester);
    populateAnswers();
    nextAudio(false);
}

document.getElementById("next").onclick = function () {
    nextAudio();
};

document.getElementById("cat").onclick = function () {
    return aud.paused ? aud.play() : aud.pause();
};

