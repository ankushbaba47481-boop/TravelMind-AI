// ==========================================
// TravelMind AI
// Destination Data & Explore Page
// ==========================================

const destinations = [

    {
        name: "Manali",
        state: "Himachal Pradesh",
        icon: "🏔️",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
        description:
            "Mountains, valleys, adventure activities and beautiful landscapes.",
        days: 5,
        budget: 10000
    },

    {
        name: "Goa",
        state: "Goa, India",
        icon: "🏖️",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
        description:
            "Beaches, coastal views, local food and relaxing travel experiences.",
        days: 4,
        budget: 8000
    },

    {
        name: "Jaipur",
        state: "Rajasthan, India",
        icon: "🏰",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
        description:
            "Historic forts, palaces, culture and traditional experiences.",
        days: 3,
        budget: 6000
    },

    {
        name: "Delhi",
        state: "Delhi, India",
        icon: "🏙️",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=85",
        description:
            "Historical monuments, markets, food and modern city experiences.",
        days: 2,
        budget: 4000
    }

];


// ==========================================
// Display Destinations
// ==========================================

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
                <p>Try searching for another destination or state.</p>
            </div>
        `;

        return;
    }


    list.forEach((destination) => {

        const card = document.createElement("div");

        card.className = "destination-card";


        card.innerHTML = `

            <div class="destination-image">

                <img
                    src="${destination.image}"
                    alt="${destination.name}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.parentElement.innerHTML='<span>${destination.icon}</span>';"
                >

            </div>


            <div class="destination-content">

                <span class="destination-state">
                    ${destination.state}
                </span>

                <h2>${destination.name}</h2>

                <p>
                    ${destination.description}
                </p>


                <div class="destination-info">

                    <span>
                        📅 ${destination.days} Days
                    </span>

                    <span>
                        💰 ₹${destination.budget.toLocaleString("en-IN")}
                    </span>

                </div>


                <button
                    class="destination-button"
                    onclick="selectDestination('${destination.name}')">

                    Explore ${destination.name} →

                </button>

            </div>

        `;

        container.appendChild(card);

    });

}


// ==========================================
// Select Destination
// ==========================================

function selectDestination(destinationName) {

    localStorage.setItem(
        "selectedDestination",
        destinationName
    );

    window.location.href = "itinerary.html";

}


// ==========================================
// Search Destination
// ==========================================

function searchDestinations() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;


    const searchText =
        input.value.trim().toLowerCase();


    const filtered =
        destinations.filter((destination) => {

            return (
                destination.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                destination.state
                    .toLowerCase()
                    .includes(searchText)

                ||

                destination.description
                    .toLowerCase()
                    .includes(searchText)
            );

        });


    displayDestinations(filtered);

}


// ==========================================
// Page Initialization
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    displayDestinations();


    const searchInput =
        document.getElementById("searchInput");

    const searchBtn =
        document.getElementById("searchBtn");


    // Search while typing

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchDestinations
        );


        // Press Enter

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    searchDestinations();

                }

            }
        );

    }


    // Search button

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            searchDestinations
        );

    }

});
