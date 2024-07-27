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