/*
 * Project: Il Rifugio del Re - Digital Menu
 * Description: Interactive multilingual restaurant menu dynamically generated from JSON data.
 * Features: Language switch (IT/EN), smooth navigation by category, responsive layout, clean typography.
 * Technologies: HTML, CSS (Bootstrap), JavaScript, JSON
 * Author: Viviana Manunta
 * Date: October 2025
 */

// LANGUAGE TRANSLATION CONFIGURATION

// Defines static text translations used throughout the menu page.
// Elements in the HTML reference these keys via the "data-i18n" attribute.
const translations = {
    it: {
        "legend.bottle": " 🍾 : Prezzo a bottiglia",
        "page.title": "Menù",
        "frozen.indicator": " * : I prodotti potrebbero essere congelati",
        "back.home": "← Torna alla Home"
    },
    en: {
        "legend.bottle": " 🍾 : Price per bottle",
        "page.title": "Menu",
        "frozen.indicator": " * : The products may be frozen",
        "back.home": "← Back to Home"
    }
};


// MAIN MENU GROUPS CONFIGURATION

// Defines macro-categories for navigation (top bar).
// Each group contains an array of related subcategories found in the JSON files.
const macroGroups = {
    it: {
        "MENÙ ANTIPASTI": ["ANTIPASTI", "GRILL", "HAMBURGER* AL PIATTO", "STUZZICHERIA"],
        "MENÙ PIZZE GOURMET": ["PIZZE ROSSE GOURMET", "PIZZE BIANCHE GOURMET"],
        "MENÙ PIZZERIA": ["PIZZE ROSSE", "PIZZE BIANCHE", "AGGIUNTA INGREDIENTI", "Crea il tuo PANUZZO"],
        "MENÙ DOLCI": ["DESSERT"],
        "MENÙ BEVANDE": ["BEVANDE ANALCOLICHE", "BIRRE IN BOTTIGLIA", "BIRRE ALLA SPINA", "VINI ROSSI 🍾", "VINI BIANCHI 🍾", "VINI ROSATI 🍾", "BOLLICINE 🍾", "RHUM", "GRAPPE", "AMARI E LIQUORI", "WHISKY"],
        "ALTRO": ["Servizio al tavolo"]
    },
    en: {
        "APPETIZERS MENU": ["APPETIZERS", "GRILL", "PLATED HAMBURGER*", "FINGER FOOD"],
        "PIZZA GOURMET MENU": ["PIZZE ROSSE GOURMET", "PIZZE BIANCHE GOURMET"],
        "PIZZA MENU": ["PIZZE ROSSE", "PIZZE BIANCHE", "ADDITION INGREDIENTS", "Create your own PANUZZO..."],
        "DESSERTS": ["DESSERT"],
        "DRINKS MENU": ["SOFT DRINK", "BEERS IN BOTTLES", "DRAFT BEER", "RED WINES SELECTION 🍾", "WHITE WINES SELECTION 🍾", "ROSE' WINE SELECTION 🍾", "SPARKLING WINE 🍾", "RHUM", "GRAPPE", "AMARI E LIQUORI", "WHISKY"],
        "OTHER": ["Table service"]
    }
};


// TRANSLATION HANDLER

// Replaces text content of all elements containing the "data-i18n" attribute
// according to the currently selected language.
function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.textContent = translations[lang]?.[key] ?? key;
    });
}


// GLOBAL VARIABLES

let menuData = null;      // Stores menu data from JSON files
let currentLang = 'it';   // Default language


// MENU DATA LOADING

// Loads menu content from JSON files (Italian and English).
// Once loaded, renders categories and items, and applies translations.
//async function loadMenu() {
  //  try {
    //    const response = await fetch('./data/menu-it.json');
      //  const dataIt = await response.json();

        //const responseEn = await fetch('./data/menu-en.json');
        //const dataEn = await responseEn.json();

        //menuData = {
          //  it: dataIt.it ?? dataIt,
           // en: dataEn.en ?? dataEn
       // };


       // renderCategories();  // Render top navigation bar (macro-categories)
        //renderItems();       // Render full menu with subcategories and items
        //applyTranslations(currentLang);

 //   } catch (error) {
   //     console.error('Error loading menu data:', error);
     //   document.getElementById('items').innerHTML =
       //     '<p style="color: red; text-align: center; padding: 40px;">Error loading menu data. Please ensure JSON files are available in the data/ folder.</p>';
    //}

    //document.querySelector('.back-home').style.display = 'inline-block';
//}

async function loadMenu() {
    try {
        const response = await fetch('./data/menu-it.json');
        console.log('menu-it status:', response.status);
        const dataIt = await response.json();

        const responseEn = await fetch('./data/menu-en.json');
        console.log('menu-en status:', responseEn.status);
        const dataEn = await responseEn.json();

        menuData = {
            it: dataIt.it ?? dataIt,
            en: dataEn.en ?? dataEn
        };

        renderCategories();
        renderItems();
        applyTranslations(currentLang);

    } catch (error) {
        console.error('Error loading menu data:', error);
        document.getElementById('items').innerHTML =
            '<p style="color: red; text-align: center; padding: 40px;">Error loading menu data. Please ensure JSON files are available in the data/ folder.</p>';
    }

    document.querySelector('.back-home').style.display = 'inline-block';
}



// NAVIGATION BAR RENDERING

// Displays only macro-categories in the top navigation bar.
function renderCategories() {
    const categoriesNav = document.getElementById('categories');
    categoriesNav.innerHTML = '';

    const groups = macroGroups[currentLang];

    Object.keys(groups).forEach(groupName => {
        const button = document.createElement('button');
        button.textContent = groupName;
        button.classList.add('category-btn', 'nav-link');
        button.onclick = () => scrollToGroup(groups[groupName]);
        categoriesNav.appendChild(button);
    });
}


// SMOOTH SCROLL TO GROUP

// Scrolls smoothly to the first subcategory that belongs to a clicked macro-group.
function scrollToGroup(subcategories) {
    const firstExisting = subcategories.find(sub =>
        document.getElementById(`cat-${sub}`)
    );
    const el = document.getElementById(`cat-${firstExisting}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}



// SAFE ID GENERATOR

// Converts category names into safe HTML IDs by removing
// spaces, symbols, and special characters.
function safeId(text) {
    return 'cat-' + String(text).replace(/\s+/g, '-').replace(/[^\w\-]|_/g, '');
}


// MENU ITEM RENDERING

// Dynamically builds the menu layout with categories and their items.
function renderItems() {
    const itemsSection = document.getElementById('items');
    const menu = menuData[currentLang];

    itemsSection.innerHTML = '';

    for (const [categoryName, items] of Object.entries(menu)) {
        // Category section container
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.id = `cat-${categoryName}`;

        // Category title
        const categoryTitle = document.createElement('h2');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = categoryName;
        categoryDiv.appendChild(categoryTitle);

        // Items wrapper
        const itemsContainer = document.createElement('div');
        itemsContainer.classList.add('items-container');

        // Loop through each menu item
        items.forEach(item => {
            if (item.nome || item.descrizione || item.prezzo) {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('menu-item');

                // Header: name + price
                const itemHeader = document.createElement('div');
                itemHeader.classList.add('item-header');

                const itemName = document.createElement('span');
                itemName.classList.add('item-name');
                itemName.textContent = item.nome || '';

                const itemPrice = document.createElement('span');
                itemPrice.classList.add('item-price');
                itemPrice.textContent = item.prezzo || '';

                itemHeader.appendChild(itemName);
                itemHeader.appendChild(itemPrice);
                itemDiv.appendChild(itemHeader);

                // Optional description
                if (item.descrizione && item.descrizione.trim() !== '') {
                    const itemDesc = document.createElement('div');
                    itemDesc.classList.add('item-description');
                    itemDesc.textContent = item.descrizione;
                    itemDiv.appendChild(itemDesc);
                }

                itemsContainer.appendChild(itemDiv);
            }
        });

        categoryDiv.appendChild(itemsContainer);
        itemsSection.appendChild(categoryDiv);
        categoryDiv.setAttribute('data-safe-id', safeId(categoryName));
    }
}


// LANGUAGE SWITCH HANDLERS

// Italian version
document.getElementById('btn-it').addEventListener('click', () => {
    if (currentLang !== 'it') {
        currentLang = 'it';
        document.getElementById('btn-it').classList.add('active');
        document.getElementById('btn-en').classList.remove('active');
        renderCategories();
        renderItems();
        applyTranslations(currentLang);
    }
});

// English version
document.getElementById('btn-en').addEventListener('click', () => {
    if (currentLang !== 'en') {
        currentLang = 'en';
        document.getElementById('btn-en').classList.add('active');
        document.getElementById('btn-it').classList.remove('active');
        renderCategories();
        renderItems();
        applyTranslations(currentLang);
    }
});


// INITIALIZATION

// Sets the default language and loads menu data on DOM ready.
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-it').classList.add('active');
    loadMenu();
});

