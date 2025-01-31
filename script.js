// buttons
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const randomBtn = document.querySelector("#random-btn");
const inputBtn = document.querySelector("#cocktail-btn");
const inputForm = document.querySelector('#cocktail-in');

const resultsDiv = document.querySelector(".results");

// module.exports = {inputBtn};  can we?

leftBtn.addEventListener('click', leftCarousel);
rightBtn.addEventListener('click', rightCarousel);
randomBtn.addEventListener('click', generateDrinks);

inputBtn.addEventListener('click', inputDrink);
inputForm.addEventListener('keydown', keyPress => {
  console.log(keyPress)
  
  if (keyPress.key == "Enter") {
    keyPress.preventDefault()
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

function inputDrink(){
  
  let nameDrink = document.querySelector('#cocktail-in').value;
  
  let drinks = {};
  let k = 0;
  console.log(nameDrink)
  
  //need to add elements results input gallery elements
  let resultsElements = document.createElement("div");
  resultsElements.classList.add("results");
  resultsElements.innerHTML = `
    <div class="input">
    <h3>Your results: Margarita</h3>
  </div>
  <div class="gallery">
  </div>
  `
  document.body.appendChild(resultsElements);
  
  const gallery = document.querySelector(".gallery");
  
  
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameDrink}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  while(data[k]){
    drinks.push(data[k]);
    k++;
  }
      
  console.log(drinks)

  gallery.innerHTML = '';
  for (let i = 0; i < drinks.length; i++){
    gallery.innerHTML += `
      <div class="gallery-div">
        <img class="gallery-img" src="${drinks[i].strDrinkThumb}">
        <h6 class="gallery-name">${drinks[i].strDrink}</h6>
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
    console.log(data.drinks[0]);    
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