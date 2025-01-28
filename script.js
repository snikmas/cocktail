const rightImg = document.querySelector(".right");
const leftImg = document.querySelector(".left");
const centerImg = document.querySelector(".center");

// a scratch, later need to fix it
const button = document.querySelector('cocktail-in').addEventListener('click', getDrink);

function getDrink() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(data => {
    console.log(data.drinks[0]);    
    centerImg.querySelector('img').src = data.drinks[0].strDrinkThumb
  })
  .catch(err => {
    console.log(`error: ${err}`)
  })

}