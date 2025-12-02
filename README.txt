Author: Viviana Manunta
Date: October 2025
Technologies: HTML, CSS (Bootstrap), JavaScript, JSON

Project Description

This project was created as a multilingual digital menu for the restaurant Il Rifugio del Re.
It was developed with the goal of providing simple navigation and a clear presentation of the dishes in both Italian and English.

The menu contents (categories and dishes) are dynamically loaded from JSON files using JavaScript (fetch()).

How to Open the Project

Due to browser security restrictions, JSON files cannot be loaded via fetch() when the page is opened directly as a local file (file://).

To correctly view the menu, the project must be opened through a local server.
You can easily do this with XAMPP:

Copy the entire project folder into:

C:\xampp\htdocs\


For example:

C:\xampp\htdocs\viviana-manunta\


Start Apache from the XAMPP Control Panel.

Open your browser and go to:

http://localhost/viviana-manunta/


The menu will load correctly and will be fully navigable.

Project Structure
viviana-manunta/
│
├── index.html
├── menu.html
│
├── /js
│   └── script.js
│
├── /css
│   └── style.css
│
├── /data
│   ├── menu-it.json
│   └── menu-en.json
│
└── /media
    └── img

Technical Note

The files menu-it.json and menu-en.json are loaded using:

fetch('data/menu-it.json')
fetch('data/menu-en.json')


For security reasons, browsers block these requests when the page is opened directly.
Running the project from http://localhost/... avoids this issue.