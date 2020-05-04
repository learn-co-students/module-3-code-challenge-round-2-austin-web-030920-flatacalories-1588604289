
const url =  "http://localhost:3000/characters";
let charInfo;



document.addEventListener("DOMContentLoaded", () => {
    fetch (url)
    .then (resp => resp.json())
    .then (json => dropDisplayChar(json))

});

function dropDisplayChar(json){
    let dropDown = document.getElementById('character-names');
    let x = json;
    let chosenOne;

            for (let i = 0; i < x.length; i++) {

                option = document.createElement('option');
                option.text = x[i].name;
                let yes = option.value = x[i].id;
                    yes.innerText = chosenOne
                dropDown.add(option);
            }
        mainDisplayChar(chosenOne)
        };


function mainDisplayChar(chosenOne){
    let name = document.querySelector('.name')
        name.inerText = chosenOne.name;
    
    let img = document.querySelector('.image')
        img.src = chosenOne.image;
        
    let cals = document.querySelector('.calories')
        cals.innerText = chosenOne.calories;
}

function addCals(event){
    let li = document.createElement('li');
        li.innerHTML = event.target.input.value
        

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
    },
    body: JSON.stringify({calories: chosenOne.calories})
    });
}