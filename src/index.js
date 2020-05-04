const url = "http://localhost:3000/characters"
let characterInfo;

const characters = document.getElementById("character-names")
const name = document.getElementById("name")
const image = document.getElementById("image")
const calories = document.getElementById("calories")
const calForm = document.getElementById("calories-form")


document.addEventListener("DOMContentLoaded", () => {
    fetch(url)
    .then(rsp => rsp.json())
    .then(json => chooseCharacter(json))

    characters.addEventListener("change", displayCharacter)
    calForm.addEventListener("submit", addCalories)
})

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


// add calories is sooooo close to being functional omg
// the patch isn't right, ofc. also since i'm pulling the info in displayCharacter from the basic GET 
// instead of the GEt/id, the patched information won't show up anyway.

// notes: fix patch & fix GET info pulled in displayCharacter

function addCalories(event) {
    event.preventDefault()
    let total = characterInfo[characters.selectedIndex].calories
    total += event.target.cals.value
    calories.innerText = total
    
    let caloriesPatch = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({calories: characterInfo.calories})
    }

    fetch(`http://localhost:3000/characters/${characters.selectedIndex}`, caloriesPatch)
    .then(rsp => rsp.json())
    .then(json => console.log(json))
}






// We have three endpoints to use:
// GET /characters
// GET /characters/:id
// PATCH /characters/:id
// 
// which means that we can use the second get/id with our display function to show the chosen character's info
// but we need to figure out the dropdown menu first so that we know which character to show