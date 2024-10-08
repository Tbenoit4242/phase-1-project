// This event listener ensures the initial data fetch happens after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

// Function to fetch initial data from the API
function fetchData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then((resp) => resp.json())
        .then((data) => {
            displayDrinks(data.drinks);  // Call to display the fetched drinks
        });
}

// Select the input, button, and various divs from the DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const drinkList = document.getElementById('drinkList');
const drinkDetail = document.getElementById('drinkDetail');
const viewedHistory = document.getElementById('viewedHistory');
const clearHistoryButton = document.getElementById('clearHistoryButton');

// Initialize an array to keep track of viewed drinks
let viewedDrinks = [];

// Function to perform search based on the search term entered by the user
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();  // Get the search term and convert to lowercase
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`)  // Fetch drinks matching the search term
        .then((resp) => resp.json())
        .then((data) => {
            if (data.drinks) {
                displayDrinks(data.drinks);  // Display the drinks if found
            } else {
                drinkList.innerHTML = '<p>No drinks found</p>';  // Show message if no drinks are found
            }
        });
}

// Event listener for search button click
searchButton.addEventListener('click', performSearch);

// Event listener for Enter key press in the search input
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Event listener for clearing the viewed history
clearHistoryButton.addEventListener('click', () => {
    viewedDrinks = [];  // Clear the viewed drinks array
    updateViewedHistory();  // Update the viewed history display
});

// Function to display a list of drinks
function displayDrinks(drinks) {
    drinkList.innerHTML = '';  // Clear the current list of drinks
    drinks.forEach(drink => {
        const drinkCard = document.createElement('div');  // Create a div for each drink
        drinkCard.classList.add('drink-card');  // Add class for styling
        drinkCard.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        `;
        drinkCard.addEventListener('click', () => {
            displayDrinkDetail(drink);  // Display drink details when clicked
            addToViewedHistory(drink);  // Add drink to viewed history
        });
        drinkList.appendChild(drinkCard);  // Add the drink card to the drink list
    });
}

// Function to display detailed information about a drink
function displayDrinkDetail(drink) {
    drinkDetail.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <p><strong>Category:</strong> ${drink.strCategory}</p>
        <p><strong>Glass:</strong> ${drink.strGlass}</p>
        <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>
            ${getIngredientsList(drink)}
        </ul>
    `;
   
}

// Function to generate a list of ingredients for a drink
function getIngredientsList(drink) {
    let ingredients = '';
    for (let i = 1; i <= 15; i++) {  // Iterate over possible ingredient and measure pairs
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
            ingredients += `<li>${measure ? measure : ''} ${ingredient}</li>`;
        }
    }
    return ingredients;  // Return the generated list of ingredients
}

// Function to add a drink to the viewed history if not already viewed
function addToViewedHistory(drink) {
    if (!viewedDrinks.some(d => d.idDrink === drink.idDrink)) {
        viewedDrinks.push(drink);  // Add the drink to the history
        updateViewedHistory();  // Update the history display
    }
}

// Function to update the viewed history display
function updateViewedHistory() {
    viewedHistory.innerHTML = '';  // Clear the current history display
    viewedDrinks.forEach(drink => {
        const historyCard = document.createElement('div');  // Create a div for each viewed drink
        historyCard.classList.add('history-card');  // Add class for styling
        historyCard.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        `;
        historyCard.addEventListener('click', () => displayDrinkDetail(drink));  // Display drink details when clicked
        viewedHistory.appendChild(historyCard);  // Add the history card to the history display
    });
}