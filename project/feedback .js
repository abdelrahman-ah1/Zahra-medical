let selectedStars = 0;

function openModal() {
    document.getElementById('modal-bg').style.display = 'flex';
}

document.getElementById('modal-bg').addEventListener('click', function(e){
    if(e.target === this) this.style.display = 'none';
});

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

function submitReview() {
    const name = document.getElementById('name-input').value.trim();
    const text = document.getElementById('review-text').value.trim();

    if(!name || !text || selectedStars == 0) {
        alert("Please enter your name, select stars, and write a review.");
        return;
    }

    const newCard = document.createElement('div');
    newCard.classList.add('feedback-card');
    newCard.innerHTML = `
        <div class="feedback-name">${name}</div>
        <div class="stars">${"★".repeat(selectedStars)}${"☆".repeat(5 - selectedStars)}</div>
        <div class="feedback-text">${text}</div>
    `;

    document.getElementById('feedback-list').appendChild(newCard);

    const thanks = document.createElement('div');
    thanks.classList.add('thank-you');
    thanks.innerText = "Thank you for your feedback!";
    document.body.appendChild(thanks);
    thanks.style.display = 'block';
    setTimeout(()=>thanks.remove(), 2500);

    document.getElementById('modal-bg').style.display = 'none';
    document.getElementById('name-input').value = '';
    document.getElementById('review-text').value = '';
    selectedStars = 0;
    highlightStars(0);
}
