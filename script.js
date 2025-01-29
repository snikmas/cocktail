// buttons
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');

leftBtn.addEventListener('click', leftCarousel);
rightBtn.addEventListener('click', rightCarousel);

// 1. the center drink moves to the right
// 2. the left drink moves to the center
// 3. get new left drink
// DONE
function leftCarousel(){
  
  document.getElementsByClassName('drinkImg 3').src = document.getElementsByClassName("drinkImg 2").src;
  document.getElementsByClassName('drinkName 3').innerText = document.getElementsByClassName("drinkName 2").innerText;

  document.getElementsByClassName('drinkImg 2').src = document.getElementsByClassName("drinkImg 1").src;
  document.getElementsByClassName('drinkName 2').innerText = document.getElementsByClassName("drinkName 1").innerText;

  generateDrink(1)
}

// class bug -> class returns array, need one value
function rightCarousel(){

  document.getElementsByClassName('drinkImg 1').src = document.getElementsByClassName("drinkImg 2").src;
  document.getElementsByClassName('drinkName 1').innerText = document.getElementsByClassName("drinkName 2").innerText;

  document.getElementsByClassName('drinkImg 2').src = document.getElementsByClassName("drinkImg 3").src;
  document.getElementsByClassName('drinkName 2').innerText = document.getElementsByClassName("drinkName 3").innerTextrc;

  generateDrink(3)
}

// generate a drink
function generateDrink(x) {

  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(data => {
    console.log(data.drinks[0]);    
    let thisDrink = data.drinks[0];
    document.getElementsByClassName(`drinkName ${x}`).innerText = thisDrink.strDrink;
    document.getElementsByClassName(`drinkImg ${x}`).src = thisDrink.strDrinkThumb
  })
  .catch(err => {
    console.log(`error: ${err}`)
  })

}

// load drinks
for(let i = 1; i <= 3; i++){
  generateDrink(i);
}