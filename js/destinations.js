// ==========================================
// TravelMind AI
// Destination Data & Explore Page
// ==========================================

const destinations = [

    {
        name: "Manali",
        state: "Himachal Pradesh, India",
        icon: "🏔️",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
        description: "Mountains, valleys, adventure activities and beautiful landscapes.",
        days: 5,
        budget: 10000
    },

    {
        name: "Goa",
        state: "Goa, India",
        icon: "🏖️",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
        description: "Beaches, coastal views, local food and relaxing travel experiences.",
        days: 4,
        budget: 8000
    },

    {
        name: "Jaipur",
        state: "Rajasthan, India",
        icon: "🏰",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
        description: "Historic forts, palaces, culture and traditional experiences.",
        days: 3,
        budget: 6000
    },

    {
        name: "Delhi",
        state: "Delhi, India",
        icon: "🏙️",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=85",
        description: "Historical monuments, markets, food and modern city experiences.",
        days: 2,
        budget: 4000
    },

    {
        name: "Bihar",
        state: "India",
        icon: "🏛️",
        image: "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=900&q=85",
        description: "Ancient history, Buddhist heritage, culture and historical places.",
        days: 4,
        budget: 7000
    },
    
    {
    name: "Samastipur",
    state: "Bihar, India",
    icon: "📍",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    description: "Explore Samastipur, local culture, history and nearby attractions.",
    days: 2,
    budget: 4000
},

    {
        name: "Patna",
        state: "Bihar, India",
        icon: "🏙️",
        image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=900&q=85",
        description: "Explore the capital of Bihar, museums, history and local culture.",
        days: 3,
        budget: 5000
    },

    {
        name: "Mumbai",
        state: "Maharashtra, India",
        icon: "🌆",
        image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=900&q=85",
        description: "Explore India's financial capital, beaches, landmarks and city life.",
        days: 4,
        budget: 9000
    },

    {
        name: "Kerala",
        state: "India",
        icon: "🌴",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
        description: "Backwaters, beaches, hills, nature and unique South Indian culture.",
        days: 5,
        budget: 12000
    },

    {
        name: "Agra",
        state: "Uttar Pradesh, India",
        icon: "🕌",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=85",
        description: "Visit the Taj Mahal and explore the historic heritage of Agra.",
        days: 2,
        budget: 5000
    },

    {
        name: "Varanasi",
        state: "Uttar Pradesh, India",
        icon: "🛕",
        image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=85",
        description: "Ancient ghats, Ganga river, temples and cultural experiences.",
        days: 3,
        budget: 6000
    },

    {
        name: "Rishikesh",
        state: "Uttarakhand, India",
        icon: "🏞️",
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=85",
        description: "Mountains, river adventures, nature, yoga and peaceful surroundings.",
        days: 3,
        budget: 6000
    },

    {
        name: "Shimla",
        state: "Himachal Pradesh, India",
        icon: "🏔️",
        image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=900&q=85",
        description: "Mountain views, pleasant weather, forests and colonial architecture.",
        days: 4,
        budget: 9000
    },

    {
        name: "Udaipur",
        state: "Rajasthan, India",
        icon: "🏰",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85",
        description: "Lakes, palaces, heritage architecture and beautiful city views.",
        days: 3,
        budget: 7000
    },

    {
        name: "Kolkata",
        state: "West Bengal, India",
        icon: "🌆",
        image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=900&q=85",
        description: "Culture, historical landmarks, food and the character of eastern India.",
        days: 3,
        budget: 6000
    },

    {
        name: "Bengaluru",
        state: "Karnataka, India",
        icon: "🌆",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=85",
        description: "Technology, parks, cafes and modern city experiences.",
        days: 3,
        budget: 7000
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
                <div>🌍</div>
                <h2>Location not in Travel Packs</h2>
                <p>
                    This location can still be found on the map.
                    Try searching a city, state or tourist destination.
                </p>
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
                    onerror="
                        this.style.display='none';
                        this.parentElement.innerHTML='<span>${destination.icon}</span>';
                    "
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


    // Empty search = show all
    if (!searchText) {

        displayDestinations(destinations);

        return;
    }


    // Search cards by name, state or description
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


    // Also search the map
    if (typeof searchLocation === "function") {

        searchLocation();

    }

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
