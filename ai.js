// ==========================================
// TravelMind AI - Advanced AI Parser
// ==========================================


// Ask AI button
document.addEventListener("DOMContentLoaded", () => {

    const aiInput = document.getElementById("aiQuery");
    const aiButton = document.getElementById("aiAskBtn");

    if (!aiInput || !aiButton) return;


    aiButton.addEventListener("click", processAIQuery);


    // Press Enter to Ask AI
    aiInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            processAIQuery();
        }

    });

});



// ==========================================
// MAIN AI FUNCTION
// ==========================================

function processAIQuery() {

    const input = document.getElementById("aiQuery");
    const response = document.getElementById("aiResponse");

    if (!input || !response) return;


    const query = input.value.trim();


    if (!query) {

        response.innerHTML = `
            <p>⚠️ Please tell me about your trip.</p>
        `;

        return;
    }


    // Show processing message

    response.innerHTML = `
        <p>🤖 Understanding your travel request...</p>
    `;


    // Extract information

    const destination = detectDestination(query);
    const days = detectDays(query);
    const budget = detectBudget(query);
    const people = detectPeople(query);


    // Check destination

    if (!destination) {

        response.innerHTML = `
            <p>
                ❌ I couldn't understand the destination.
                <br>
                Try:
                <strong>
                    "3 days Goa trip under ₹8000 for 2 people"
                </strong>
            </p>
        `;

        return;
    }


    // Default values

    const finalDays = days || 3;
    const finalBudget = budget || 10000;
    const finalPeople = people || 1;


    // Show detected information

    response.innerHTML = `
        <div>
            <h3>🤖 TravelMind understood:</h3>

            <p>📍 Destination: <strong>${destination}</strong></p>

            <p>📅 Days: <strong>${finalDays}</strong></p>

            <p>💰 Budget: <strong>₹${finalBudget.toLocaleString("en-IN")}</strong></p>

            <p>👥 People: <strong>${finalPeople}</strong></p>

            <p>✦ Creating your itinerary...</p>
        </div>
    `;


    // Fill normal planner

    setTimeout(() => {

        const destinationInput =
            document.getElementById("destination");

        const daysInput =
            document.getElementById("days");

        const budgetInput =
            document.getElementById("budget");

        const peopleInput =
            document.getElementById("people");


        if (destinationInput)
            destinationInput.value = destination;


        if (daysInput)
            daysInput.value = finalDays;


        if (budgetInput)
            budgetInput.value = finalBudget;


        if (peopleInput)
            peopleInput.value = finalPeople;


        // Generate existing itinerary

        if (typeof generateItinerary === "function") {

            generateItinerary();

        }


        // Scroll to result

        const result =
            document.getElementById("itineraryResult");

        if (result) {

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 800);

}



// ==========================================
// DESTINATION DETECTION
// ==========================================

function detectDestination(query) {

    const text = query.toLowerCase();


    const destinations = [
        "delhi",
        "goa",
        "manali",
        "jaipur",
        "mumbai",
        "kolkata",
        "bengaluru",
        "bangalore",
        "hyderabad",
        "agra",
        "varanasi",
        "shimla",
        "rishikesh",
        "kerala",
        "udaipur"
    ];


    for (const destination of destinations) {

        if (text.includes(destination)) {

            if (destination === "bangalore") {
                return "Bengaluru";
            }

            return destination.charAt(0).toUpperCase()
                + destination.slice(1);

        }

    }


    return null;
}



// ==========================================
// DAYS DETECTION
// ==========================================

function detectDays(query) {

    const text = query.toLowerCase();


    const patterns = [
        /(\d+)\s*days?/,
        /for\s*(\d+)\s*days?/,
        /(\d+)\s*day\s*trip/
    ];


    for (const pattern of patterns) {

        const match = text.match(pattern);


        if (match) {

            return parseInt(match[1]);

        }

    }


    return null;
}



// ==========================================
// BUDGET DETECTION
// ==========================================

function detectBudget(query) {

    const text = query.toLowerCase();


    // ₹8000 / ₹ 8000

    let match = text.match(/₹\s*([\d,]+)/);


    if (match) {

        return parseInt(
            match[1].replace(/,/g, "")
        );

    }


    // 8000 rupees / 8000 rs

    match = text.match(
        /([\d,]+)\s*(?:rupees?|rs\.?)/i
    );


    if (match) {

        return parseInt(
            match[1].replace(/,/g, "")
        );

    }


    // under 8000 / budget 8000

    match = text.match(
        /(?:under|budget|within|around)\s*₹?\s*([\d,]+)/
    );


    if (match) {

        return parseInt(
            match[1].replace(/,/g, "")
        );

    }


    return null;
}



// ==========================================
// PEOPLE DETECTION
// ==========================================

function detectPeople(query) {

    const text = query.toLowerCase();


    const patterns = [

        /(\d+)\s*people/,

        /(\d+)\s*persons?/,

        /(\d+)\s*travellers?/,

        /(\d+)\s*travelers?/,

        /for\s*(\d+)\s*people/,

        /(\d+)\s*members?/

    ];


    for (const pattern of patterns) {

        const match = text.match(pattern);


        if (match) {

            return parseInt(match[1]);

        }

    }


    return null;
}