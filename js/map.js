// ==========================================
// TravelMind AI
// India Travel Map
// ==========================================

let travelMap;
let markers = [];


// ==========================================
// DESTINATIONS
// ==========================================

const locations = {

    Manali: {
        lat: 32.2432,
        lng: 77.1892,
        description: "Mountain destination in Himachal Pradesh"
    },

    Delhi: {
        lat: 28.6139,
        lng: 77.2090,
        description: "Capital city of India"
    },

    Jaipur: {
        lat: 26.9124,
        lng: 75.7873,
        description: "Historic city of Rajasthan"
    },

    Goa: {
        lat: 15.2993,
        lng: 74.1240,
        description: "Popular beach destination"
    },

    Mumbai: {
        lat: 19.0760,
        lng: 72.8777,
        description: "Major city on India's west coast"
    },

    Kolkata: {
        lat: 22.5726,
        lng: 88.3639,
        description: "Major city in eastern India"
    },

    Bengaluru: {
        lat: 12.9716,
        lng: 77.5946,
        description: "Major technology hub"
    },

    Hyderabad: {
        lat: 17.3850,
        lng: 78.4867,
        description: "Major city in Telangana"
    }

};


// ==========================================
// START MAP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const mapElement =
        document.getElementById("travelMap");

    if (!mapElement) return;


    // India map

    travelMap = L.map("travelMap", {

        center: [22.5, 79],

        zoom: 5,

        minZoom: 4,

        maxZoom: 18

    });


    // OpenStreetMap

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(travelMap);


    // ======================================
    // DESTINATION MARKERS
    // ======================================

    Object.entries(locations).forEach(
        ([name, location]) => {

            const marker = L.marker([
                location.lat,
                location.lng
            ])
            .addTo(travelMap);


            marker.destinationName = name;


            marker.bindPopup(`
                
                <div style="text-align:center">

                    <strong>
                        📍 ${name}
                    </strong>

                    <p>
                        ${location.description}
                    </p>

                    <button
                        onclick="selectMapDestination('${name}')"
                    >
                        Explore ${name} →
                    </button>

                </div>

            `);


            markers.push(marker);

        }
    );


    // ======================================
    // SEARCH
    // ======================================

    const searchInput =
        document.getElementById("searchInput");

    const searchBtn =
        document.getElementById("searchBtn");


    function searchLocation() {

        if (!searchInput) return;


        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!search) {

            travelMap.setView(
                [22.5, 79],
                5
            );

            updateMapLocation("India");

            return;
        }


        const found =
            Object.entries(locations).find(
                ([name]) =>
                    name.toLowerCase() === search
            );


        if (!found) {

            alert(
                "Destination not found."
            );

            return;
        }


        const [name, location] = found;


        // Move to destination

        travelMap.flyTo(
            [
                location.lat,
                location.lng
            ],
            10,
            {
                duration: 1.5
            }
        );


        // Open marker

        const marker =
            markers.find(
                item =>
                    item.destinationName === name
            );


        if (marker) {

            setTimeout(() => {
                marker.openPopup();
            }, 1500);

        }


        updateMapLocation(name);

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            searchLocation
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {
                    searchLocation();
                }

            }
        );

    }

});


// ==========================================
// UPDATE LOCATION
// ==========================================

function updateMapLocation(name) {

    const mapLocation =
        document.getElementById("mapLocation");

    if (mapLocation) {

        mapLocation.textContent =
            name;

    }

}


// ==========================================
// EXPLORE DESTINATION
// ==========================================

function selectMapDestination(destination) {

    localStorage.setItem(
        "selectedDestination",
        destination
    );

    window.location.href =
        "itinerary.html";

}
