const calsName = document.getElementById("name")
const calsImage = document.getElementById("image");
const calsCalories = document.getElementById("calories");
const drop = document.getElementById("character-names");
const create = document.getElementById("calories-form");


const URL = "http://localhost:3000/characters";
let cals;


document.addEventListener('DOMContentLoaded', () => {
    fetch(URL)
    .then(response => response.json())
    .then(json => displayChars(json))
       
        drop.addEventListener("change", displayCals)
        create.addEventListener("submit", createCals)
    });

function displayChars(json) {
    cals = json
    for (let i = 0; i < json.length; i++) {
        let option = document.createElement('option')
        let character = cals[i].name
        option.innerHTML = `<option value=${cals[i].id}>${character}</option>`
        drop.appendChild(option)
    }
}

function displayCals() {
    let c = drop.selectedIndex-1
    
    calsName.innerHTML = cals[c].name
    calsImage.src = cals[c].image
    calsCalories.innerText = cals[c].calories
}

    
function createCals(event) {

    event.preventDefault()
    let total = cals[drop.selectedIndex-1].calories
    total += parseInt(document.getElementById('calorieInput').value)
    calories.innerText = total

    let calsPatch = {
            method: 'PATCH',
            headers: {"Content-Type": 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({calories: total})
        }
    

    fetch(`http://localhost:3000/characters/${drop.selectedIndex}`, calsPatch)
        .then(response => response.json())
        .then(json => console.log(json))

        fetch(URL)
            .then(response => response.json())
            .then(json => displayChars(json))
    }