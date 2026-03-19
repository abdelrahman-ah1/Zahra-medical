let selectedStars = 0;

// Open modal
function openModal() {
    document.getElementById('modal-bg').style.display = 'flex';
}

// Close modal when clicking outside
document.getElementById('modal-bg').addEventListener('click', function(e){
    if(e.target === this) this.style.display = 'none';
});

// Star hover and click logic
document.querySelectorAll('.modal-stars span').forEach(star => {
    star.addEventListener('mouseover', function() {
        highlightStars(this.getAttribute('data-value'));
    });
    star.addEventListener('mouseout', function() {
        highlightStars(selectedStars);
    });
    star.addEventListener('click', function() {
        selectedStars = this.getAttribute('data-value');
        highlightStars(selectedStars);
    });
});

function highlightStars(count) {
    document.querySelectorAll('.modal-stars span').forEach((s, i) => {
        s.style.color = (i < count) ? '#FFC107' : 'lightgray';
        s.classList.toggle('active', i < count);
    });
}

// Load feedbacks from database
function loadFeedbacks() {
    fetch("get_feedback.php")
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            const container = document.getElementById("feedback-list");
            container.innerHTML = ""; // Clear existing cards
            data.feedbacks.forEach(fb => {
                let stars = "★".repeat(fb.stars) + "☆".repeat(5 - fb.stars);
                const card = document.createElement("div");
                card.className = "feedback-card";
                card.innerHTML = `
                    <div class="feedback-name">${fb.name}</div>
                    <div class="stars">${stars}</div>
                    <div class="feedback-text">${fb.message}</div>
                `;
                container.appendChild(card);
            });
        } else {
            console.error("Failed to load feedbacks:", data.message);
        }
    });
}

// Submit feedback
function submitReview() {
    const name = document.getElementById('name-input').value.trim();
    const text = document.getElementById('review-text').value.trim();

    if (!name || !text || selectedStars == 0) {
        alert("Please enter all fields.");
        return;
    }

    fetch("submit_feedback.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(text)}&stars=${selectedStars}`
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // Feedback saved, update the page
            loadFeedbacks(); 
            // Clear form
            document.getElementById('name-input').value = '';
            document.getElementById('review-text').value = '';
            selectedStars = 0;
            highlightStars(0);
            document.getElementById('modal-bg').style.display = 'none';
            alert("Feedback saved!");
        } else {
            alert("Error saving feedback: " + data.message);
        }
    });
}

// Load feedbacks when page loads
window.addEventListener("DOMContentLoaded", loadFeedbacks);
