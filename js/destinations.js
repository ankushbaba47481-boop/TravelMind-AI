// TravelMind AI
// Destination Data & Explore Page

const destinations = [
    {
        name: "Manali",
        state: "Himachal Pradesh",
        icon: "🏔️",
        description:
            "Mountains, valleys, adventure activities and beautiful landscapes.",
        days: 5,
        budget: 10000
    },

    {
        name: "Goa",
        state: "India",
        icon: "🏖️",
        description:
            "Beaches, coastal views, local food and relaxing travel experiences.",
        days: 4,
        budget: 8000
    },

    {
        name: "Jaipur",
        state: "Rajasthan",
        icon: "🏰",
        description:
            "Historic forts, palaces, culture and traditional experiences.",
        days: 3,
        budget: 6000
    },

    {
        name: "Delhi",
        state: "India",
        icon: "🏙️",
        description:
            "Historical monuments, markets, food and modern city experiences.",
        days: 2,
        budget: 4000
    }
];


// Display destinations

function displayDestinations(list = destinations) {

    const container =
        document.getElementById("destinationContainer");

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <div class="empty-result">
                <div>🔍</div>
                <h2>No destination found</h2>
                <p>Try another destination.</p>
            </div>
        `;

        return;
    }


    list.forEach((destination) => {

        const card = document.createElement("div");

        card.className = "destination-card";

        card.innerHTML = `

            <div class="destination-image">
                ${destination.icon}
            </div>

            <div class="destination-content">

                <span>${destination.state}</span>

                <h2>${destination.name}</h2>

                <p>
                    ${destination.description}
                </p>

                <div class="destination-info">

                    <span>📅 ${destination.days} Days</span>

                    <span>💰 ₹${destination.budget.toLocaleString("en-IN")}</span>

                </div>

                <button
                    onclick="selectDestination('${destination.name}')">

                    Explore ${destination.name} →

                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


// Select destination

function selectDestination(destinationName) {

    localStorage.setItem(
        "selectedDestination",
        destinationName
    );

    window.location.href = "itinerary.html";
}


// Search destination

function searchDestinations() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const searchText =
        input.value.trim().toLowerCase();

    const filtered =
        destinations.filter((destination) =>
            destination.name.toLowerCase().includes(searchText) ||
            destination.state.toLowerCase().includes(searchText)
        );

    displayDestinations(filtered);
}


// Page initialization

document.addEventListener("DOMContentLoaded", () => {

    displayDestinations();

    const searchInput =
        document.getElementById("searchInput");

    const searchBtn =
        document.getElementById("searchBtn");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchDestinations
        );

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {
                    searchDestinations();
                }

            }
        );
    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            searchDestinations
        );
    }

});
