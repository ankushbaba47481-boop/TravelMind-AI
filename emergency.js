// TravelMind AI
// Emergency Module

document.addEventListener("DOMContentLoaded", () => {

    const hospitalInfo =
        document.getElementById("hospitalInfo");

    const contactInfo =
        document.getElementById("contactInfo");

    const emergencyNotes =
        document.getElementById("emergencyNotes");


    const savedHospital =
        localStorage.getItem("emergencyHospital");

    const savedContact =
        localStorage.getItem("emergencyContact");

    const savedNotes =
        localStorage.getItem("emergencyNotes");


    if (savedHospital && hospitalInfo) {
        hospitalInfo.textContent = savedHospital;
    }

    if (savedContact && contactInfo) {
        contactInfo.textContent = savedContact;
    }

    if (savedNotes && emergencyNotes) {
        emergencyNotes.textContent = savedNotes;
    }

});


// Save emergency information

function saveEmergencyInfo(hospital, contact, notes) {

    if (hospital) {
        localStorage.setItem(
            "emergencyHospital",
            hospital
        );
    }

    if (contact) {
        localStorage.setItem(
            "emergencyContact",
            contact
        );
    }

    if (notes) {
        localStorage.setItem(
            "emergencyNotes",
            notes
        );
    }

}


// Clear saved emergency information

function clearEmergencyInfo() {

    localStorage.removeItem("emergencyHospital");
    localStorage.removeItem("emergencyContact");
    localStorage.removeItem("emergencyNotes");

    location.reload();

}