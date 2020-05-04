const url = "http://localhost:3000/characters"
let characterInfo;

const characters = document.getElementById("character-names")
const name = document.getElementById("name")
const image = document.getElementById("image")
const calories = document.getElementById("calories")
const calForm = document.getElementById("calories-form")
const resetBtn = document.getElementById("reset-btn")


document.addEventListener("DOMContentLoaded", () => {
    fetch(url)
    .then(rsp => rsp.json())
    .then(json => chooseCharacter(json))


    characters.addEventListener("change", displayCharacter)
    calForm.addEventListener("submit", addCalories)
    resetBtn.addEventListener("click", resetCalories)
    
})

function fetchUrl() {
    fetch(url)
    .then(rsp => rsp.json())
    .then(json => console.log(json))
}

function patchCalories(newTotal) {
    let e = characters.selectedIndex
    let caloriesPatch = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({calories: newTotal})
    }

    fetch(`http://localhost:3000/characters/${e}`, caloriesPatch)
    .then(rsp => rsp.json())
    .then(json => console.log(json))
}

function chooseCharacter(json) {
    characterInfo = json
    for (let i = 0; i < json.length; i++) {
        let option = document.createElement('option')
        let char = characterInfo[i].name
        option.innerHTML = `<option value=${characterInfo[i].id}>${char}</option>`
        characters.appendChild(option)
    }
}

function displayCharacter() {
    let e = characters.selectedIndex-1
    name.innerHTML = characterInfo[e].name
    image.src = characterInfo[e].image
    calories.innerText = characterInfo[e].calories
}

function addCalories(event) {
    event.preventDefault()
    fetchUrl()
    let e = characters.selectedIndex-1
    let total = parseInt(characterInfo[e].calories)
    let newTotal = total + parseInt(event.target.cals.value)
    calories.innerText = newTotal
    patchCalories(newTotal)
}

function resetCalories(event) {
    event.preventDefault()
    fetchUrl()
    let e = characters.selectedIndex-1
    let newTotal = 0
    calories.innerText = newTotal
    patchCalories(newTotal)
}    



// We have three endpoints to use:
// GET /characters
// GET /characters/:id
// PATCH /characters/:id
