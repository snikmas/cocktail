import { nameDrink } from "./script";

const gallery = document.querySelector(".gallery");
// also can import from another file, but using module..?

function inputDrink(){

  let drinks = {};
  let k = 0;
  console.log(nameDrink)
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameDrink}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    while(data[k]){
      drinks.push(data[k]);
      k++;
    }

    console.log(drinks)

    // implemething gallery

    // is it better to initilize one variable outside the loop
    // and always use it or it doesn't matter: inside/outside loop 
    let innerGallery;
    gallery.innerHTML = '';
    for (let i = 0; i < drinks.length; i++){
      gallery.innerHTML += `
        <div class="gallery-div">
          <img class="gallery-img" src="${drinks[i].strDrinkThumb}">
          <h6 class="gallery-name">${drinks[i].strDrink}</h6>
        </div>
      `

    }



    // showGallery(drinks); 
    // I wanted to showgallery as another function
    // but then we need to fetch again -> time
    // so I will write gallery code here, but it this code.. looks messy a little bit
  }
  )
  .catch(error => {
    console.log(`Error: ${error}`)
  })

}

inputDrink();