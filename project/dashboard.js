
document.addEventListener("DOMContentLoaded", () => {
    fetchFeedbacks();
    fetchReservations();

    showSection('overview');
});

let allReservations = [];
let allFeedbacks = [];


function fetchReservations() {
    fetch('reservation.php')
        .then(res => res.json())
        .then(data => {
            allReservations = data;
            loadOverview();       // Update stats
            loadReservationsTable(); // Update table
        })
        .catch(err => console.error("Error loading reservations:", err));
}

function fetchFeedbacks() {
    fetch('get_feedback.php')
        .then(res => res.json())
        .then(data => {
            if (data.feedbacks) {
                allFeedbacks = data.feedbacks;
            } else if (Array.isArray(data)) {
                allFeedbacks = data;
            }

            loadOverview();
            loadFeedbacksGrid();
        })
        .catch(err => console.error("Error loading feedbacks:", err));
}


function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(sectionId + '-section').style.display = 'block';

    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));

    const navIndex = { 'overview': 1, 'reservations': 2, 'feedbacks': 3 };
    if (navIndex[sectionId]) {
        document.querySelector(`.nav-links li:nth-child(${navIndex[sectionId]})`).classList.add('active');
    }
}

function loadOverview() {
    // Reservations Stats
    const totalRes = allReservations.length;
    const pending = allReservations.filter(r => r.status === 'Pending').length;

    // Feedback Stats
    let totalStars = 0;
    allFeedbacks.forEach(fb => totalStars += parseInt(fb.stars || 0));
    const avg = allFeedbacks.length ? (totalStars / allFeedbacks.length).toFixed(1) : 0;

    // Update HTML
    if (document.getElementById('total-reservations'))
        document.getElementById('total-reservations').innerText = totalRes;

    if (document.getElementById('pending-tasks'))
        document.getElementById('pending-tasks').innerText = pending;

    if (document.getElementById('avg-rating'))
        document.getElementById('avg-rating').innerText = avg;

    const recentBody = document.getElementById('recent-table-body');
    if (recentBody) {
        recentBody.innerHTML = '';
        allReservations.slice(0, 3).forEach(res => {
            let color = res.status === 'Completed' ? 'green' : (res.status === 'Pending' ? 'orange' : 'purple');

            let row = `<tr>
                <td>${res.name}</td>
                <td>${res.machine}</td>
                <td><span class="status ${color}"></span>${res.status}</td>
            </tr>`;
            recentBody.innerHTML += row;
        });
    }
}

function loadReservationsTable() {
    const tbody = document.getElementById('all-reservations-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    allReservations.forEach(res => {
        let row = `<tr>
            <td>${res.date_requested || res.created_at}</td>
            <td>${res.name}</td>
            <td>${res.machine} <br><small style="color:#888">${res.model}</small></td>
            <td>${res.compliment || 'No issue stated'}</td>
            <td>${res.phone}</td>
            <td>
                <select class="status-select" onchange="updateStatus(${res.id}, this)">
                    <option value="Pending" ${res.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${res.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${res.status === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td>
                <button style="background:red; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;" onclick="deleteRes(${res.id})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function loadFeedbacksGrid() {
    const grid = document.getElementById('feedback-grid-container');
    if (!grid) return;
    grid.innerHTML = '';

    allFeedbacks.forEach(fb => {
        let starCount = parseInt(fb.stars);
        let starsHtml = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
        let item = `
        <div class="feedback-item">
            <button class="delete-btn" onclick="deleteFeedback(${fb.id})"><i class="fa-solid fa-xmark"></i></button>
            <h4 style="color:#9B2F77">${fb.name}</h4>
            <div style="color:#FFC107; margin: 5px 0;">${starsHtml}</div>
            <p style="color:#555; font-size: 0.9rem;">"${fb.message}"</p>
        </div>`;
        grid.innerHTML += item;
    });
}

function deleteFeedback(id) {
    if (confirm('Are you sure you want to delete this feedback?')) {
        fetch('delete_feedback.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    fetchFeedbacks(); // Refresh data
                } else {
                    alert('Failed to delete: ' + data.message);
                }
            })
            .catch(err => console.error("Error deleting feedback:", err));
    }
}

function updateStatus(id, selectElement) {
    const newStatus = selectElement.value;

    fetch('reservation.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', id: id, status: newStatus })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // alert('Status updated'); 
                fetchReservations(); 
            } else {
                alert('Failed to update status');
            }
        });
}

function deleteRes(id) {
    if (confirm('Are you sure you want to delete this reservation?')) {
        fetch('reservation.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete', id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    fetchReservations(); // Refresh data
                } else {
                    alert('Failed to delete');
                }
            });
    }
}

function filterTable() {
    let input = document.getElementById("searchRes");
    let filter = input.value.toUpperCase();
    let table = document.getElementById("all-reservations-body");
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1]; // Column 1 is Name
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}