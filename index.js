const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const notificationIcon = document.getElementById("notification-icon");
const notificationBadge = document.getElementById("notification-badge");

let notificationCount = 0;

const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Featching Receipes...</h2>";

  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const response = await data.json();
  // console.log(response);

  recipeContainer.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}"/>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `;

    const button = document.createElement("button");
    button.textContent = "Testy Recipe";
    recipeDiv.appendChild(button);

    button.addEventListener("click", (e) => {
      ButItem(e);
    });
    recipeContainer.appendChild(recipeDiv);
  });
};

// Function to display notification
function showNotification() {
  notificationCount++;
  notificationBadge.textContent = notificationCount;
  notificationIcon.classList.remove("hidden");
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    new Notification("Recipes are ready!");
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Recipes are ready!");
      }
    });
  }
}
// Function to display alert when button clicked
function ButItem(e) {
  alert(`👩‍🍳 Hi! You can search Tasty Recipes here... 🍔`);
}
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
  showNotification();
});

const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

modeToggle.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
});
