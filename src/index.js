// See all character's name in the dropdown menu by requesting data from the server
// Select a character from drop down menu and see character's info inside #detailed-info div.
// Clicks on "Add Calories" button to add calories to a Character.Persist calories value to the server and update the DOM.
// Your base URL for your API will be: http://localhost:3000

//     The endpoints you will need are:

// GET / characters
// GET / characters /: id
// PATCH / characters /: id

const URL = 'http://localhost:3000/characters'
let charBin;
let currentChar;
const dropdown = document.getElementById("character-names")
const charList = document.createElement('ul')
const deetCalories = document.getElementById('calories')
const deetName = document.getElementById('name')
const deetImage = document.getElementById('image')
const calForm = document.getElementById('calories-form')
const charId = document.getElementById("characterId")
let eventQ;

document.addEventListener('DOMContentLoaded', () => {
    fetchChars();
    dropdown.addEventListener('change', setCurrent)
    calForm.addEventListener('submit', addCals)
})

function fetchChars() {
    fetch(URL)
        .then(response => response.json())
        .then(json => {
            charBin = json
            console.log(json)
            fillDropdown();
        })
}

function fillDropdown() {
    for(let i = 0; i < charBin.length; i++) {
        let option = document.createElement('option')
        option.innerText = charBin[i].name
        option.value = charBin[i].name
        dropdown.appendChild(option)
    }
}

function setCurrent() {
    currentChar = dropdown.selectedIndex - 1
    renderChar();
}

function renderChar() {
    deetName.innerText = charBin[currentChar].name;
    deetImage.src = charBin[currentChar].image
    deetCalories.innerText = charBin[currentChar].calories
    charId.value = charBin[currentChar].id
}

function addCals(event) {
    event.preventDefault()
    eventQ = event
    let cals = parseInt(charBin[currentChar].calories) + parseInt(event.target[1].value)
    charBin[currentChar].calories = cals
    renderChar()
    updateChar()
}

function updateChar(char) {
fetch(`${URL}/${event.target[0].value}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({ calories: charBin[currentChar].calories })
})
}
