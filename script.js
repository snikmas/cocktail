// buttons
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const inputBtn = document.querySelector("#cocktail-btn");
const inputForm = document.querySelector('#cocktail-in');
const footer = document.querySelector("footer")

const resultsDiv = document.querySelector(".results");
let resultsElements;


leftBtn.addEventListener('click', leftCarousel);
rightBtn.addEventListener('click', rightCarousel);

inputBtn.addEventListener('click', inputDrink);
inputForm.addEventListener('keydown', event => {
  
  if (event.key == "Enter") {
    event.preventDefault()
    inputDrink()
  }
  
})

// 1. input drink and take this input
// 2. find drinks which match this input, create array of these drinks
// 3. generate these drinks output. i think it will 
// be new generation function (the first one just a 
// random drink. though later can implement that will be 
// only one generate function and just check what 
// the parameter)
// 4. 

function creatingDiv(){
  let resultsElements = document.createElement("div");
  resultsElements.classList.add("results");
  document.body.insertBefore(resultsElements, footer);

  return resultsElements
}



function inputDrink(){
  
  let nameDrink = document.querySelector('#cocktail-in').value;
  
  console.log(nameDrink)

  let resultsElements = document.getElementsByClassName('results')[0];
  
  //need to add elements results input gallery elements
  if (!resultsElements)
    {
      resultsElements = creatingDiv();
    }
    else{
      resultsElements.innerHTML = ''
    }
      resultsElements.innerHTML = `
    <div class="input">
    <h3>Your results: ${nameDrink}</h3>
    </div>
    <div class="gallery">
    </div>
    `
    
    
    const gallery = document.querySelector(".gallery");
    
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameDrink}`)
    .then(res => res.json())
    .then(data => {
      // NEED USE DATA DRINKS PROPERTY TO GET ACCESS
      console.log(data.drinks);
      
      // need to scrool to this place
      
      let yCoord = gallery.getBoundingClientRect();
      console.log(yCoord)
      scrollTo(0, yCoord.y + 800)
      
      gallery.innerHTML = '';
      for (let i = 0; i < data.drinks.length; i++){

        gallery.innerHTML += `
        <div class="gallery-div">
        <img class="gallery-img" src="${data.drinks[i].strDrinkThumb}">
        <h6 class="gallery-name">${data.drinks[i].strDrink}</h6>
        </div>
        `
      }  
    }
  )
  .catch(error => {
    console.log(`Error: ${error}`)
  })
        
}
      
    

// 1. the center drink moves to the right
// 2. the left drink moves to the center
// 3. get new left drink
// DONE
function leftCarousel(){
  
  document.querySelector('.drinkImg3').src = document.querySelector(".drinkImg2").src;
  document.querySelector('.drinkName3').innerText = document.querySelector(".drinkName2").innerText;
  
  document.querySelector('.drinkImg2').src = document.querySelector(".drinkImg1").src;
  document.querySelector('.drinkName2').innerText = document.querySelector(".drinkName1").innerText;
  
  generateDrink(1)
}
      
      // class bug -> class returns array, need one value // SOLVED
function rightCarousel(){

  document.querySelector('.drinkImg1').src = document.querySelector(".drinkImg2").src;
  document.querySelector('.drinkName1').innerText = document.querySelector(".drinkName2").innerText;

  document.querySelector('.drinkImg2').src = document.querySelector(".drinkImg3").src;
  document.querySelector('.drinkName2').innerText = document.querySelector(".drinkName3").innerText;
  
  generateDrink(3)
}

// generate a random drink // DONE
function generateDrink(x) {
  
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(data => {    
    let thisDrink = data.drinks[0];
    document.querySelector(`.drinkName${x}`).innerText = thisDrink.strDrink;
    document.querySelector(`.drinkImg${x}`).src = thisDrink.strDrinkThumb
    
    //output
    
    
    
    
    
  })
  .catch(err => {
    console.log(`error: ${err}`)
  })
  
}


// load drinks
function generateDrinks(){
  for(let i = 1; i <= 3; i++){
    generateDrink(i);
  }
}

generateDrinks()

// export {nameDrink}?????