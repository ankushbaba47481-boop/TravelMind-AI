// TravelMind AI
// Offline Travel Pack Module

document.addEventListener("DOMContentLoaded", () => {

    const statusElement =
        document.getElementById("offlineStatus");

    const downloadButton =
        document.getElementById("downloadPackBtn");

    const destinationSelect =
        document.getElementById("packDestination");


    // Check internet connection

    function updateConnectionStatus() {

        if (!statusElement) return;

        if (navigator.onLine) {

            statusElement.textContent =
                "You are currently online.";

        } else {

            statusElement.textContent =
                "You are offline. Saved Travel Packs are still available.";

        }
    }


    updateConnectionStatus();

    window.addEventListener(
        "online",
        updateConnectionStatus
    );

    window.addEventListener(
        "offline",
        updateConnectionStatus
    );


    // Download Travel Pack

    if (downloadButton) {

        downloadButton.addEventListener("click", () => {

            const destination =
                destinationSelect.value;


            if (!destination) {

                alert(
                    "Please select a destination first."
                );

                return;
            }


            const travelPack = {

                destination: destination,

                createdAt:
                    new Date().toISOString(),

                itinerary: true,

                places: true,

                transport: true,

                emergency: true,

                notes: true,

                documents: true

            };


            localStorage.setItem(
                "travelPack_" + destination,
                JSON.stringify(travelPack)
            );


            alert(
                destination +
                " Travel Pack downloaded successfully!"
            );

        });

    }

});