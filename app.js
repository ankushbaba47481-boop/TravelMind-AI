// TravelMind AI
// Main Application JavaScript

document.addEventListener("DOMContentLoaded", () => {

    console.log("TravelMind AI loaded successfully.");

    // Current year automatically update
    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

});