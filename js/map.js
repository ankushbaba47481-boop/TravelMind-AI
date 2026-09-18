// ==========================================
// TravelMind AI
// India Travel Map - Advanced Search
// ==========================================

let travelMap;
let markers = [];


// ==========================================
// POPULAR INDIA LOCATIONS
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
        description: "Major city of Maharashtra"
    },

    Kolkata: {
        lat: 22.5726,
        lng: 88.3639,
        description: "Major city in eastern India"
    },

    Bengaluru: {
        lat: 12.9716,
        lng: 77.5946,
        description: "Major technology hub of India"
    },

    Hyderabad: {
        lat: 17.3850,
        lng: 78.4867,
        description: "Major city in Telangana"
    },

    Patna: {
        lat: 25.5941,
        lng: 85.1376,
        description: "Capital city of Bihar"
    },

    Agra: {
        lat: 27.1767,
        lng: 78.0081,
        description: "Historic city and home of the Taj Mahal"
    },

    Varanasi: {
        lat: 25.3176,
        lng: 82.9739,
        description: "Historic spiritual city on the Ganges"
    },

    Shimla: {
        lat: 31.1048,
        lng: 77.1734,
        description: "Hill station in Himachal Pradesh"
    },

    Rishikesh: {
        lat: 30.0869,
        lng: 78.2676,
        description: "Adventure and riverside destination"
    },

    Udaipur: {
        lat: 24.5854,
        lng: 73.7125,
        description: "City of lakes in Rajasthan"
    },

    Kochi: {
        lat: 9.9312,
        lng: 76.2673,
        description: "Coastal city in Kerala"
    }

};


// ==========================================
// START MAP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const mapElement =
        document.getElementById("travelMap");

    if (!mapElement) return;


    travelMap = L.map("travelMap", {

        center: [22.5, 79],

        zoom: 5,

        minZoom: 4,

        maxZoom: 18

    });


    // ======================================
    // OPEN STREET MAP
    // ======================================

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(travelMap);


    // ======================================
    // ADD POPULAR MARKERS
    // ======================================

    Object.entries(locations).forEach(
        ([name, location]) => {

            addMarker(
                name,
                location.lat,
                location.lng,
                location.description
            );

        }
    );


    // ======================================
    // SEARCH
    // ======================================

    const searchInput =
        document.getElementById("searchInput");

    const searchBtn =
        document.getElementById("searchBtn");


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
// ADD MARKER
// ==========================================

function addMarker(
    name,
    lat,
    lng,
    description = "India travel destination"
) {

    const marker =
        L.marker([lat, lng])
            .addTo(travelMap);


    marker.destinationName = name;


    marker.bindPopup(`

        <div style="
            text-align:center;
            min-width:170px;
        ">

            <strong>
                📍 ${name}
            </strong>

            <p>
                ${description}
            </p>

            <button
                onclick="selectMapDestination('${name.replace(/'/g, "\\'")}')"
                style="
                    padding:8px 14px;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                Explore ${name} →
            </button>

        </div>

    `);


    markers.push(marker);


    return marker;

}


// ==========================================
// SEARCH LOCATION
// ==========================================

async function searchLocation() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput || !travelMap) return;


    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    // Empty search = India
    if (!search) {

        travelMap.flyTo(
            [22.5, 79],
            5,
            {
                duration: 1
            }
        );

        updateMapLocation("India");

        return;

    }


    // ======================================
    // CHECK POPULAR LOCATIONS FIRST
    // ======================================

    const found =
        Object.entries(locations).find(
            ([name]) =>
                name.toLowerCase() === search
        );


    if (found) {

        const [name, location] = found;


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


        const marker =
            markers.find(
                item =>
                    item.destinationName === name
            );


        if (marker) {

            setTimeout(() => {

                marker.openPopup();

            }, 1000);

        }


        updateMapLocation(name);

        return;

    }


    // ======================================
    // SEARCH ANY INDIA LOCATION
    // ======================================

    try {

        const url =
            "https://nominatim.openstreetmap.org/search" +
            "?format=json" +
            "&limit=1" +
            "&countrycodes=in" +
            "&q=" +
            encodeURIComponent(searchInput.value);


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "Location search failed"
            );

        }


        const data =
            await response.json();


        if (!data || data.length === 0) {

            updateMapLocation(
                "Location not found"
            );


            alert(
                "Location not found.\n\n" +
                "Try a city, state or tourist place."
            );

            return;

        }


        const result = data[0];


        const lat =
            parseFloat(result.lat);

        const lng =
            parseFloat(result.lon);


        const displayName =
            result.display_name
                .split(",")[0];


        // ==================================
        // MOVE MAP
        // ==================================

        travelMap.flyTo(
            [lat, lng],
            10,
            {
                duration: 1.5
            }
        );


        // ==================================
        // ADD SEARCH RESULT MARKER
        // ==================================

        const marker =
            addMarker(
                displayName,
                lat,
                lng,
                "Location found in India"
            );


        setTimeout(() => {

            marker.openPopup();

        }, 1000);


        updateMapLocation(
            displayName
        );


    } catch (error) {

        console.error(
            "Map search error:",
            error
        );


        updateMapLocation(
            "Search error"
        );


        alert(
            "Search service is temporarily unavailable."
        );

    }

}


// ==========================================
// UPDATE LOCATION LABEL
// ==========================================

function updateMapLocation(name) {

    const mapLocation =
        document.getElementById(
            "mapLocation"
        );


    if (mapLocation) {

        mapLocation.textContent =
            name;

    }

}


// ==========================================
// EXPLORE DESTINATION
// ==========================================

function selectMapDestination(
    destination
) {

    localStorage.setItem(
        "selectedDestination",
        destination
    );


    window.location.href =
        "itinerary.html";

}
