
const url =  "http://localhost:3000/characters";
let charInfo;

document.addEventListener("DOMContentLoaded", () => {
    fetch (url)
    .then (resp => resp.json())
    .then (json => dropDisplayChar(json))

});

function dropDisplayChar(json){
    let dropDown = document.getElementById('#chacter-names');
    
    let defaultChar = document.createElement('option');
        defaultChar.text = 'Select a Character';
    
    console.log(defaultChar)
    dropDown.add(defaultChar);
    
    let url = json;
          response.json().then(function(jsonP) {  
            let option;
        
            for (let i = 0; i < url.length; i++) {
              option = document.createElement('option');
                option.text = url[i].name;
                option.value = url[i].abbreviation;
                dropdown.add(option);
            }    
          });  
        };


function mainDisplayChar(option){
    let chosenOne = option;

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
    option.calories = li

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
    },
    body: JSON.stringify({calories: chosenOne.calories})
    });


}