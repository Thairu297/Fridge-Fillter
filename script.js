// ==========================================
// 1. CORE INGREDIENTS CATALOG
// ==========================================
const INGREDIENTS_CATALOG = {
    "Produce": ["Spinach", "Tomatoes", "Onion", "Garlic", "Carrots", "Bell Pepper", "Lemon", "Potatoes", "Zucchini", "Broccoli", "Mushrooms", "Kale", "Avocado", "Cabbage"],
    "Proteins": ["Chicken Breast", "Tofu", "Eggs", "Canned Chickpeas", "Beef", "Bacon", "Shrimp", "Salmon", "Lentils", "Black Beans", "Turkey", "Pork Chorizo"],
    "Dairy & Fridge": ["Cheddar Cheese", "Milk", "Butter", "Parmesan", "Yogurt", "Feta Cheese", "Mozzarella", "Heavy Cream", "Cream Cheese"],
    "Pantry Staples": ["Pasta", "Rice", "Olive Oil", "Flour", "Soy Sauce", "Vegetable Broth", "Quinoa", "Couscous", "Tortillas", "Tomato Paste", "Honey", "Peanut Butter"]
};

// Flatten catalog into a single array for easy randomized picking
const ALL_INGREDIENTS = Object.values(INGREDIENTS_CATALOG).flat();

// Zero-waste tips associated with individual ingredients to make generated recipes realistic
const INGREDIENT_TIPS = {
    "Spinach": "Sauté wilting spinach with a splash of olive oil and garlic; it shrinks by 90% and fits into any dish.",
    "Tomatoes": "Overripe, wrinkly tomatoes are perfect for roasting down into an intense, sweet homemade pasta sauce.",
    "Onion": "Save your papery onion skins in a freezer bag to boil into a rich, golden vegetable stock later.",
    "Garlic": "If garlic starts sprouting green shoots, don't toss it! The shoots are edible and taste like mild green onions.",
    "Carrots": "Slightly floppy carrots can be completely revived and made crunchy again by submerging them in an ice-water bath.",
    "Potatoes": "Never peel your potatoes. Clean skins contain the highest fiber and prevent completely unnecessary kitchen waste.",
    "Chicken Breast": "Save the bones and trim from chicken to boil down into an immune-boosting, gelatin-rich bone broth.",
    "Eggs": "Crushed eggshells are a natural source of calcium for your backyard garden soil or indoor potted plants.",
    "Bacon": "Pour rendered bacon fat into a glass jar and store it in the fridge to use as a high-flavor cooking oil replacement.",
    "Milk": "Milk that is just slightly turning sour is perfectly safe and highly effective for making fluffy pancakes or biscuits.",
    "Parmesan": "Save the hard, unchewable Parmesan rinds in the freezer and drop them into soups or stews for an umami bomb.",
    "Bread": "Stale bread can be tossed with olive oil and baked for 10 minutes to make elite, crunchy homemade croutons.",
    "Rice": "Leftover cooked rice dries out beautifully in the fridge, making it the absolute ideal base for crispy fried rice.",
    "Lemon": "Zest your lemons completely before juicing them. You can freeze the zest in a small bag for baking or marinades."
};

// Dynamic culinary descriptors used to dynamically generate 500 unique titles
const CULINARY_PREFIXES = ["Crispy", "One-Pan", "Rustic", "Zesty", "Garlic-Infused", "Smoky", "Savory", "Sheet-Pan", "Spicy", "Slow-Roasted", "Skillet", "Creamy", "Toasted", "Ultimate", "Pantry-Style", "Homestyle"];
const CULINARY_STYLES = ["Skillet", "Stir-Fry", "Medley", "Hash", "Bowl", "Platter", "Bake", "Scramble", "Toss", "Soup", "Sauté", "Fried Rice", "Frittata", "Pasta Drop"];

// ==========================================
// 2. HIGH-SCALE DATA SEED ENGINE (500 RECIPES)
// ==========================================
const RECIPES_DB = [];

function generate500Recipes() {
    // Seed our 5 original handcrafted anchor recipes first
    const anchors = [
        { id: 1, name: "Crispy Garlic Chickpeas", ingredients: ["Canned Chickpeas", "Garlic", "Olive Oil", "Spinach"], instructions: "Drain chickpeas, dry completely, and roast with minced garlic and olive oil until crispy. Toss with spinach in the last 2 minutes.", wasteTip: INGREDIENT_TIPS["Canned Chickpeas"] || "Save the liquid (aquafaba) to whip into vegan meringues." },
        { id: 2, name: "One-Pan Lemon Rice", ingredients: ["Rice", "Lemon", "Garlic", "Olive Oil", "Spinach"], instructions: "Sauté garlic, toast rice in olive oil, boil in broth or water, and squeeze heavy fresh lemon juice over top. Stir spinach in to wilt.", wasteTip: INGREDIENT_TIPS["Lemon"] },
        { id: 3, name: "Pantry Carbonara Pasta", ingredients: ["Pasta", "Eggs", "Bacon", "Parmesan"], instructions: "Boil pasta. Crisp up bacon. Whisk egg and parmesan cheese together. Toss pasta with bacon fat, then vigorously stir in egg mix off-heat.", wasteTip: INGREDIENT_TIPS["Bacon"] },
        { id: 4, name: "Easy Vegetable Frittata", ingredients: ["Eggs", "Spinach", "Cheddar Cheese", "Onion", "Tomatoes"], instructions: "Sauté onions, tomatoes, and spinach. Pour whisked eggs over top, sprinkle cheddar, and bake until set.", wasteTip: INGREDIENT_TIPS["Eggs"] },
        { id: 5, name: "Comfort Potato Soup", ingredients: ["Potatoes", "Onion", "Garlic", "Milk", "Butter"], instructions: "Simmer diced potatoes, onions, and garlic. Mash roughly, stir in butter and milk, and season with salt and pepper.", wasteTip: INGREDIENT_TIPS["Potatoes"] }
    ];
    
    RECIPES_DB.push(...anchors);

    // Seed remaining 495 items programmatically to reach exactly 500 unique entries
    let currentId = 6;
    while (currentId <= 500) {
        // Step A: Determine a dynamic size for the ingredient pool (typically 3 to 6 items per dish)
        const size = Math.floor(Math.random() * 4) + 3; 
        const selectedIngs = [];
        
        // Step B: Pull a unique subset of random ingredients
        while (selectedIngs.length < size) {
            const randomIng = ALL_INGREDIENTS[Math.floor(Math.random() * ALL_INGREDIENTS.length)];
            if (!selectedIngs.includes(randomIng)) {
                selectedIngs.push(randomIng);
            }
        }

        // Step C: Construct a realistic culinary title based on contents
        const prefix = CULINARY_PREFIXES[Math.floor(Math.random() * CULINARY_PREFIXES.length)];
        const style = CULINARY_STYLES[Math.floor(Math.random() * CULINARY_STYLES.length)];
        const keyIngredient = selectedIngs[0];
        const secondaryIngredient = selectedIngs[1];
        
        const recipeName = `${prefix} ${keyIngredient} & ${secondaryIngredient} ${style}`;

        // Step D: Extract a contextual zero-waste tip from the items used
        let chosenTip = "Store odds and ends in your freezer to make a customized vegetable stock base later.";
        for (let ing of selectedIngs) {
            if (INGREDIENT_TIPS[ing]) {
                chosenTip = INGREDIENT_TIPS[ing];
                break; // Lock in the first relevant zero-waste tip found
            }
        }

        // Step E: Push structured item to runtime database array
        RECIPES_DB.push({
            id: currentId,
            name: recipeName,
            ingredients: selectedIngs,
            instructions: `Chop and prep your ${selectedIngs.join(' and ')}. Heat a pan over medium heat, integrate your foundational aromatic elements, combine ingredients sequentially based on density, cook until tender, and season to taste.`,
            wasteTip: chosenTip
        });

        currentId++;
    }
}

// Execute database seeding immediately on script read
generate500Recipes();


// ==========================================
// 3. UI STATE & BROWSER MANAGEMENT
// ==========================================
let selectedIngredients = new Set();
let urgentIngredients = new Set();

const searchInput = document.getElementById('ingredient-search');
const categoriesContainer = document.getElementById('categories-container');
const activePills = document.getElementById('active-pills');
const clearAllBtn = document.getElementById('clear-all-btn');
const gridPerfect = document.getElementById('grid-perfect');
const gridAlmost = document.getElementById('grid-almost');
const tierPerfect = document.getElementById('tier-perfect');
const tierAlmost = document.getElementById('tier-almost');
const noResultsView = document.getElementById('no-results-view');

document.addEventListener("DOMContentLoaded", () => {
    loadPantryStaples();
    renderIngredientsList();
    renderRecipes();
    
    searchInput.addEventListener('input', handleSearch);
    clearAllBtn.addEventListener('click', clearAllFilters);
});

function loadPantryStaples() {
    const saved = localStorage.getItem('fs_ingredients');
    if (saved) {
        selectedIngredients = new Set(JSON.parse(saved));
    }
}

function savePantryStaples() {
    localStorage.setItem('fs_ingredients', JSON.stringify([...selectedIngredients]));
}

// ==========================================
// 4. INTERACTION & DOM MANIPULATION
// ==========================================
function renderIngredientsList(searchTerm = '') {
    categoriesContainer.innerHTML = '';
    const query = searchTerm.toLowerCase();

    for (const [category, items] of Object.entries(INGREDIENTS_CATALOG)) {
        const filteredItems = items.filter(item => item.toLowerCase().includes(query));
        if (filteredItems.length === 0) continue;

        const catDiv = document.createElement('div');
        catDiv.className = 'category-group';
        
        const title = document.createElement('h3');
        title.textContent = category;
        catDiv.appendChild(title);

        filteredItems.forEach(item => {
            const isChecked = selectedIngredients.has(item);
            const isUrgent = urgentIngredients.has(item);

            const itemWrap = document.createElement('div');
            itemWrap.className = 'ingredient-item';

            itemWrap.innerHTML = `
                <label class="ingredient-label-wrap">
                    <input type="checkbox" data-ingredient="${item}" ${isChecked ? 'checked' : ''}>
                    <span>${item}</span>
                </label>
                <button type="button" class="star-priority ${isUrgent ? 'star-active' : ''}" data-ingredient="${item}" title="Flag as expiring soon">
                    ★
                </button>
            `;

            const checkbox = itemWrap.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', (e) => toggleIngredient(item, e.target.checked));

            const star = itemWrap.querySelector('.star-priority');
            star.addEventListener('click', () => toggleUrgency(item));

            catDiv.appendChild(itemWrap);
        });

        categoriesContainer.appendChild(catDiv);
    }
}

function toggleIngredient(ingredient, isChecked) {
    if (isChecked) {
        selectedIngredients.add(ingredient);
    } else {
        selectedIngredients.delete(ingredient);
        urgentIngredients.delete(ingredient);
    }
    savePantryStaples();
    updateActivePills();
    renderRecipes();
    renderIngredientsList(searchInput.value);
}

function toggleUrgency(ingredient) {
    if (!selectedIngredients.has(ingredient)) {
        selectedIngredients.add(ingredient);
    }
    if (urgentIngredients.has(ingredient)) {
        urgentIngredients.delete(ingredient);
    } else {
        urgentIngredients.add(ingredient);
    }
    savePantryStaples();
    updateActivePills();
    renderRecipes();
    renderIngredientsList(searchInput.value);
}

function handleSearch(e) {
    renderIngredientsList(e.target.value);
}

function clearAllFilters() {
    selectedIngredients.clear();
    urgentIngredients.clear();
    savePantryStaples();
    updateActivePills();
    renderRecipes();
    renderIngredientsList();
    searchInput.value = '';
}

function updateActivePills() {
    activePills.innerHTML = '';
    
    if (selectedIngredients.size === 0) {
        activePills.innerHTML = `<span class="placeholder-text">Select ingredients to start cooking...</span>`;
        clearAllBtn.style.display = 'none';
        return;
    }

    clearAllBtn.style.display = 'inline-block';

    selectedIngredients.forEach(item => {
        const isUrgent = urgentIngredients.has(item);
        const pill = document.createElement('div');
        pill.className = `pill ${isUrgent ? 'pill-urgent' : ''}`;
        pill.innerHTML = `
            ${isUrgent ? '⚠️ ' : ''}${item}
            <button class="remove-pill" aria-label="Remove ${item}">&times;</button>
        `;
        
        pill.querySelector('.remove-pill').addEventListener('click', () => {
            toggleIngredient(item, false);
        });

        activePills.appendChild(pill);
    });
}

// ==========================================
// 5. CLIENT-SIDE ARRAY FILTERING LOGIC
// ==========================================
function renderRecipes() {
    gridPerfect.innerHTML = '';
    gridAlmost.innerHTML = '';

    if (selectedIngredients.size === 0) {
        tierPerfect.style.display = 'none';
        tierAlmost.style.display = 'none';
        noResultsView.style.display = 'block';
        return;
    }

    let perfectMatches = [];
    let almostMatches = [];

    // Filter through all 500 items instantly
    RECIPES_DB.forEach(recipe => {
        const matched = recipe.ingredients.filter(ing => selectedIngredients.has(ing));
        const missing = recipe.ingredients.filter(ing => !selectedIngredients.has(ing));
        const containsUrgent = recipe.ingredients.some(ing => urgentIngredients.has(ing));
        
        const matchScore = { recipe, matched, missing, containsUrgent };

        if (missing.length === 0) {
            perfectMatches.push(matchScore);
        } else if (missing.length === 1) {
            almostMatches.push(matchScore);
        }
    });

    // Zero-Waste sort modifier: Push prioritized "Urgent Ingredient" matches to the top
    const sortUrgentFirst = (a, b) => b.containsUrgent - a.containsUrgent;
    perfectMatches.sort(sortUrgentFirst);
    almostMatches.sort(sortUrgentFirst);

    document.querySelector('#tier-perfect h2 .badge').textContent = `${perfectMatches.length} Matches`;
    document.querySelector('#tier-almost h2 .badge').textContent = `${almostMatches.length} Matches`;

    if (perfectMatches.length > 0) {
        tierPerfect.style.display = 'block';
        // Limit rendering to first 20 items at a time to keep DOM manipulation efficient
        perfectMatches.slice(0, 20).forEach(item => gridPerfect.appendChild(createRecipeCard(item)));
    } else {
        tierPerfect.style.display = 'none';
    }

    if (almostMatches.length > 0) {
        tierAlmost.style.display = 'block';
        almostMatches.slice(0, 20).forEach(item => gridAlmost.appendChild(createRecipeCard(item)));
    } else {
        tierAlmost.style.display = 'none';
    }

    if (perfectMatches.length === 0 && almostMatches.length === 0) {
        noResultsView.style.display = 'block';
        noResultsView.innerHTML = `
            <h3>No matching wasteless recipes</h3>
            <p>We searched all 500 options! Try checking a few extra base items or staple spices to surface recipes.</p>
        `;
    } else {
        noResultsView.style.display = 'none';
    }
}

function createRecipeCard({ recipe, matched, missing, containsUrgent }) {
    const card = document.createElement('article');
    // Apply styling variations if it contains urgent options
    card.className = `recipe-card ${containsUrgent ? 'urgent-border' : ''}`;
    if (containsUrgent) {
        card.style.borderColor = 'var(--accent-terracotta)';
    }
    
    const ownedIngredientsMarkup = matched.map(i => `<span class="ing-have">✓ ${i}</span>`).join(', ');
    const missingIngredientsMarkup = missing.map(i => `<span class="ing-missing">${i}</span>`).join(', ');
    
    card.innerHTML = `
        <div class="recipe-details">
            <h3 class="recipe-title">${recipe.name}</h3>
            <p class="recipe-meta">
                ${recipe.ingredients.length} Total Ingredients • ${matched.length}/${recipe.ingredients.length} in Fridge
            </p>
            <div class="recipe-ingredients-preview">
                <strong>You have:</strong> ${ownedIngredientsMarkup}
                ${missing.length > 0 ? `<br><strong>Missing:</strong> ${missingIngredientsMarkup}` : ''}
            </div>
            <div class="waste-tip-box">
                <strong>Zero-Waste Tip:</strong> ${recipe.wasteTip}
            </div>
        </div>
    `;
    return card;
}