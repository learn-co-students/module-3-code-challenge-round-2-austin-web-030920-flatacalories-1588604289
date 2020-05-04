let calsName = document.querySelector("#name");
let calsImage = document.querySelector("#image");
let calsCalories = document.querySelector("#calories");
var drop = document.getElementById("#character.names");
let create = document.querySelector(".input")


const URL = "http://localhost:3000/characters";
let cals;
document.addEventListener('DOMContentLoaded', () => {
    fetch(URL)
    .then(response => response.json())
    .then(json => {
        cals = json
        displayCals()})
            create.addEventListener("submit", createCals)
});

function displayChars(event) {

    result +="<ul> n";
    for (let i = 0; i < drop.length; i++) {
        currentOption = drop[i];
        if(currentOption.selected == true) {
            result += "<li>" + currentOption.value + "</li> n";
            result += "</ul> n"
        }
    }

   
}

function displayCals(json) {

    calsName.innerHTML = cals.name

    calsImage.innerHTML = cals.image

    calsCalories.innerHTML = cals.calories
};

function createCals(event) {
    cals.calories++
    displayCals()

    fetch(URL, {
        method: 'PATCH',
        headers: {"Content-Type": 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({calories: cals.calories})
    })
}