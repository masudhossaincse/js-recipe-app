const mealsEl = document.getElementById('meals');
const favouriteContainer = document.getElementById('fav-meals');

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    const respData = await resp.json();
    const randomMeal = respData.meals[0];


    addMeal(randomMeal, true);

    // console.log(randomMeal);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

    const respData = await resp.json();

    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);

    const respData = await resp.json();
    const meals = respData.meals;

    // console.log(meals);
    return meals;
}

function addMeal(mealData, random = false) {

    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
    <div class="meal-header">
        ${random ? `<span class="random">
        Random Recipes
        </span>` : ''}

        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn">
            <i class="fa fa-heart-o" aria-hidden="true"></i>
        </button>
    </div>
`;

// meal.querySelector('.meal-body .fav-btn').addEventListener('click', (e) => {
//     if(e.target.classList.contains('active')) {
//         removeMealLS(mealData.idMeal);
//         e.target.classList.remove("active");
//     } else {
//         addMealLS(mealData.idMeal);
//         e.target.classList.add("active");
//     }
//     e.target.classList.toggle("active");
// });

const btn = meal.querySelector(".meal-body .fav-btn");

btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
        removeMealLS(mealData.idMeal);
        btn.classList.remove("active");
    } else {
        addMealLS(mealData.idMeal);
        btn.classList.add("active");
    }

    fetchFavMeals();
});

mealsEl.appendChild(meal);

}

function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem(
        "mealIds", 
        JSON.stringify(mealIds.filter((id) => id != mealId))
    );

}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {

    // clean the container
    favouriteContainer.innerHTML = "";

    const mealIds = getMealsLS();

    for(let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];

        meal = await getMealById(mealId);
        
        addMealFav(meal);

    }

}


function addMealFav(mealData) {
    const favMeal = document.createElement('li');

    favMeal.innerHTML = `
    <img src="${ mealData.strMealThumb }" alt="${ mealData.strMeal }">
        <span>${ mealData.strMeal }</span>
    <button class="clear"><i class="fas fa-window-close"></i></button>

`;

const btn = favMeal.querySelector('.clear');
btn.addEventListener('click', () => {
    removeMealLS(mealData.idMeal);

    fetchFavMeals();

});

    favouriteContainer.appendChild(favMeal);

}

searchBtn.addEventListener('click', async () => {
    // clean the container
    mealsEl.innerHTML = '';
    const search = searchTerm.value;

    const meals = await getMealsBySearch(search);
    // console.log(await getMealsBySearch(search));
    if(meals) {
    meals.forEach((meal) => {
        addMeal(meal);
    });
}

});