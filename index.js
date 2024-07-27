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