document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.querySelector(".add-event-btn");
    const eventsList = document.getElementById("events-list");

    addBtn.addEventListener("click", () => {
        const name = prompt("Enter event name:");
        const date = prompt("Enter event date (YYYY-MM-DD):");

        if (!name || !date) {
            alert("Please fill both fields");
            return;
        }

        fetch('api/add_event.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}`
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Add new event to the front-end list
                const eventSection = document.createElement("section");
                eventSection.classList.add("about-section", "fade-up");
                eventSection.innerHTML = `<h2>${data.name}</h2><p>${data.date}</p>`;
                eventsList.appendChild(eventSection);

                alert("Event added successfully!");
            } else {
                alert(data.message || "Error connecting to server");
            }
        })
        .catch(err => {
            alert("Error connecting to server");
            console.error(err);
        });
    });

});
