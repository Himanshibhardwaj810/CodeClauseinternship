// Get DOM elements
const addRecipeForm = document.getElementById('add-recipe-form');
const recipesContainer = document.getElementById('recipes-container');

// Load recipes from local storage
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Display recipes
function displayRecipes() {
    recipesContainer.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <img src="${recipe.image}" alt="${recipe.name}">
            <h4>Ingredients:</h4>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h4>Instructions:</h4>
            <p>${recipe.instructions}</p>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipesContainer.appendChild(recipeCard);
    });
}

// Add new recipe
addRecipeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value.split('\n');
    const instructions = document.getElementById('recipe-instructions').value;
    const imageFile = document.getElementById('recipe-image').files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newRecipe = {
                name,
                ingredients,
                instructions,
                image: event.target.result
            };
            recipes.push(newRecipe);
            saveRecipes();
            displayRecipes();
            addRecipeForm.reset();
        };
        reader.readAsDataURL(imageFile);
    } else {
        const newRecipe = {
            name,
            ingredients,
            instructions,
            image: 'https://via.placeholder.com/300x200.png?text=No+Image'
        };
        recipes.push(newRecipe);
        saveRecipes();
        displayRecipes();
        addRecipeForm.reset();
    }
});

// Edit recipe
function editRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('recipe-ingredients').value = recipe.ingredients.join('\n');
    document.getElementById('recipe-instructions').value = recipe.instructions;
    recipes.splice(index, 1);
    saveRecipes();
    displayRecipes();
}

// Delete recipe
function deleteRecipe(index) {
    recipes.splice(index, 1);
    saveRecipes();
    displayRecipes();
}

// Save recipes to local storage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Initial display of recipes
displayRecipes();