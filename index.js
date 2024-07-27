document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

function fetchData() {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            displayDrinks(data.drinks);
        });
}
