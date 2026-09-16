// ==========================================
// TravelMind AI
// Smart Travel Itinerary
// ==========================================


// ==========================================
// DESTINATION PLANS
// ==========================================

const destinationPlans = {

    // ================= DELHI =================

    delhi: [
        {
            title: "India Gate & Central Delhi",
            description: "Arrival, check-in and explore Central Delhi.",
            places: "India Gate • Kartavya Path • Rashtrapati Bhavan",
            activity: "🌅 Evening sightseeing"
        },

        {
            title: "Old Delhi Heritage",
            description: "Explore the historic heart of Delhi.",
            places: "Red Fort • Chandni Chowk • Jama Masjid",
            activity: "🏛️ Heritage & local food"
        },

        {
            title: "Qutub Minar & South Delhi",
            description: "Explore famous historical attractions.",
            places: "Qutub Minar • Humayun's Tomb • Lodhi Garden",
            activity: "📸 Historical sightseeing"
        },

        {
            title: "Lotus Temple & Akshardham",
            description: "Visit major attractions and enjoy your final day.",
            places: "Lotus Temple • Akshardham • Local Market",
            activity: "🛍️ Exploration & shopping"
        }
    ],


    // ================= GOA =================

    goa: [
        {
            title: "Arrival & North Goa",
            description: "Check-in and relax at the beach.",
            places: "Baga Beach • Calangute Beach",
            activity: "🌊 Beach & sunset"
        },

        {
            title: "Fort Aguada & Beaches",
            description: "Explore Goa's coastline and historic places.",
            places: "Fort Aguada • Candolim • Sinquerim",
            activity: "📸 Sightseeing & beach"
        },

        {
            title: "Old Goa Heritage",
            description: "Explore Goa's historic and cultural attractions.",
            places: "Basilica of Bom Jesus • Se Cathedral • Old Goa",
            activity: "🏛️ Heritage exploration"
        },

        {
            title: "South Goa",
            description: "Relax at quieter beaches and explore the coast.",
            places: "Palolem Beach • Colva Beach",
            activity: "🌴 Relaxation & sunset"
        }
    ],


    // ================= MANALI =================

    manali: [
        {
            title: "Arrival & Old Manali",
            description: "Check-in and explore central Manali.",
            places: "Mall Road • Hadimba Temple • Old Manali",
            activity: "🏔️ Local exploration"
        },

        {
            title: "Solang Valley",
            description: "Enjoy mountain views and adventure activities.",
            places: "Solang Valley • Snow Point",
            activity: "🏂 Adventure & mountains"
        },

        {
            title: "Vashisht & Local Exploration",
            description: "Explore natural and cultural attractions.",
            places: "Vashisht Temple • Hot Springs • Manu Temple",
            activity: "🌲 Nature & culture"
        },

        {
            title: "Mountain Day",
            description: "Explore the high mountain region, subject to weather and access.",
            places: "Rohtang Pass area • Mountain viewpoints",
            activity: "🏔️ Mountain adventure"
        },

        {
            title: "Local Shopping & Departure",
            description: "Relax, shop for local items and prepare for departure.",
            places: "Old Manali • Local Market • Riverside",
            activity: "🛍️ Shopping & departure"
        }
    ],


    // ================= JAIPUR =================

    jaipur: [
        {
            title: "Pink City Exploration",
            description: "Start your Jaipur journey with iconic landmarks.",
            places: "Hawa Mahal • City Palace • Jantar Mantar",
            activity: "🏰 Heritage sightseeing"
        },

        {
            title: "Amber Fort & Jal Mahal",
            description: "Explore Jaipur's famous forts and lake palace.",
            places: "Amber Fort • Jal Mahal • Panna Meena Ka Kund",
            activity: "📸 Forts & photography"
        },

        {
            title: "Nahargarh & Local Markets",
            description: "Enjoy city views and explore Jaipur markets.",
            places: "Nahargarh Fort • Johari Bazaar • Bapu Bazaar",
            activity: "🌇 Viewpoints & shopping"
        },

        {
            title: "Culture & Departure",
            description: "Final exploration and local shopping.",
            places: "Albert Hall • Central Park • Local Market",
            activity: "🛍️ Culture & departure"
        }
    ]

};


// ==========================================
// DESTINATION NAME NORMALIZER
// ==========================================

function normalizeDestination(name) {

    return name
        .trim()
        .toLowerCase();

}


// ==========================================
// GENERATE ITINERARY
// ==========================================

function generateItinerary() {

    const destinationInput =
        document.getElementById("destination");

    const daysInput =
        document.getElementById("days");

    const budgetInput =
        document.getElementById("budget");

    const peopleInput =
        document.getElementById("people");


    if (
        !destinationInput ||
        !daysInput ||
        !budgetInput ||
        !peopleInput
    ) {
        return;
    }


    const destination =
        destinationInput.value.trim();


    const days =
        parseInt(daysInput.value) || 1;


    const budget =
        parseInt(budgetInput.value) || 0;


    const people =
        parseInt(peopleInput.value) || 1;


    if (!destination) {

        alert("Please enter a destination.");

        return;
    }


    const destinationKey =
        normalizeDestination(destination);


    const plan =
        destinationPlans[destinationKey];


    const itinerary = [];


    // ======================================
    // CREATE DAYS
    // ======================================

    for (let i = 0; i < days; i++) {

        let dayPlan;


        if (plan && plan[i]) {

            dayPlan = plan[i];

        } else {

            dayPlan = {

                title:
                    i === 0
                        ? `Arrival & ${destination}`
                        : i === days - 1
                            ? "Final Exploration & Departure"
                            : `Explore ${destination}`,

                description:
                    `Discover popular places and local experiences in ${destination}.`,

                places:
                    "Local sightseeing • Food • Shopping",

                activity:
                    "📍 Explore & enjoy"

            };

        }


        itinerary.push({

            day: i + 1,

            title: dayPlan.title,

            description: dayPlan.description,

            places: dayPlan.places,

            activity: dayPlan.activity

        });

    }


    // ======================================
    // DISPLAY
    // ======================================

    displayItinerary(
        destination,
        days,
        budget,
        people,
        itinerary
    );


    // ======================================
    // SAVE
    // ======================================

    localStorage.setItem(
        "currentTrip",

        JSON.stringify({

            destination,
            days,
            budget,
            people,
            itinerary

        })
    );

}


// ==========================================
// DISPLAY ITINERARY
// ==========================================
function displayItinerary(
    destination,
    days,
    budget,
    people,
    itinerary
) {

    const result =
        document.getElementById("itineraryResult");

    if (!result) return;


    // ==============================
    // BUDGET BREAKDOWN
    // ==============================

    const stay =
        Math.round(budget * 0.35);

    const food =
        Math.round(budget * 0.20);

    const transport =
        Math.round(budget * 0.20);

    const activities =
        Math.round(budget * 0.15);

    const other =
        budget - stay - food - transport - activities;


    result.innerHTML = `

        <div class="itinerary-header">

            <h2>
                ${destination} Trip
            </h2>

            <div class="trip-summary">

                📅 ${days} Days
                &nbsp;&nbsp;

                💰 ₹${budget.toLocaleString("en-IN")}
                &nbsp;&nbsp;

                👥 ${people} People

            </div>

        </div>


        <!-- ==========================
             BUDGET BREAKDOWN
        =========================== -->

        <div class="budget-card">

            <h3>
                💰 Budget Breakdown
            </h3>

            <div class="budget-item">
                <span>🏨 Stay</span>
                <strong>
                    ₹${stay.toLocaleString("en-IN")}
                </strong>
            </div>

            <div class="budget-item">
                <span>🍴 Food</span>
                <strong>
                    ₹${food.toLocaleString("en-IN")}
                </strong>
            </div>

            <div class="budget-item">
                <span>🚕 Transport</span>
                <strong>
                    ₹${transport.toLocaleString("en-IN")}
                </strong>
            </div>

            <div class="budget-item">
                <span>🎟️ Activities</span>
                <strong>
                    ₹${activities.toLocaleString("en-IN")}
                </strong>
            </div>

            <div class="budget-item">
                <span>🛍️ Other</span>
                <strong>
                    ₹${other.toLocaleString("en-IN")}
                </strong>
            </div>

            <div class="budget-total">

                <span>
                    Total Budget
                </span>

                <strong>
                    ₹${budget.toLocaleString("en-IN")}
                </strong>

            </div>

        </div>


        <!-- ==========================
             DAY BY DAY ITINERARY
        =========================== -->

        <div class="itinerary-days">

            ${itinerary.map(day => `

                <div class="day-card">

                    <div class="day-number">
                        Day ${day.day}
                    </div>

                    <h3>
                        ${day.title}
                    </h3>

                    <p>
                        ${day.description}
                    </p>

                    <p class="places">
                        📍 ${day.places}
                    </p>

                    <p class="activity">
                        ${day.activity}
                    </p>

                    <button
                        class="map-button"
                        onclick="viewOnMap('${destination}')"
                    >
                        🗺️ View on Map
                    </button>

                </div>

            `).join("")}

        </div>

    `;
}

// ==========================================
// VIEW ON MAP
// ==========================================

function viewOnMap(destination) {

    if (!destination) return;


    const mapUrl =
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
            destination + ", India"
        );


    window.open(
        mapUrl,
        "_blank"
    );

}


// ==========================================
// LOAD SAVED DESTINATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const destinationInput =
            document.getElementById(
                "destination"
            );


        const savedDestination =
            localStorage.getItem(
                "selectedDestination"
            );


        if (
            destinationInput &&
            savedDestination
        ) {

            destinationInput.value =
                savedDestination;

        }

    }
);