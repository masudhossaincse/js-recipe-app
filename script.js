const meals = document.getElementById('meals');

getRandomMeal();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

    const resData = await resp.json();
    const randomMeal = resData.meals[0];


    addMeal(randomMeal, true);

    console.log(randomMeal);
}

addmeal(mealData, random = false) {

        const meal = document.createElement('div');
        meal.classList.add('meal');

        meal.innerHTML = `
    <div class="meal-header">
        ${random ? `<span class="random">
        Random Recipes
        </span>` : ''}

        <img src="${mealData.strMealThumb}" alt="">
    </div>
    <div class="meal-body">
        <h4>Veggie Veggies</h4>
        <button class="fav-btn active">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
    </div>
`

}

async function getMealById(id) {
    const meal = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
}

async function getMealsBySearch(term) {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
}