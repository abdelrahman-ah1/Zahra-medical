document.addEventListener("DOMContentLoaded", function () {
    const authLink = document.getElementById('auth-link');
    if (!authLink) return; 

    function updateAdminLink(username) {
        const adminLinkId = 'admin-dashboard-link';
        let adminLink = document.getElementById(adminLinkId);

        if (username === 'admin') {
            if (!adminLink) {
                const li = document.createElement('li');
                li.id = adminLinkId;
                li.innerHTML = '<a href="dashboard.html" style="color: #9B2F77;"><b>Dashboard</b></a>'; 
                authLink.parentNode.insertBefore(li, authLink); 
            }
        } else {
            if (adminLink) {
                adminLink.remove();
            }
        }
    }

    if (localStorage.getItem('isLoggedIn') === 'true') {
        authLink.innerHTML = '<a href="profile.html"><b>My Profile</b></a>';
        const storedUser = localStorage.getItem('username');
        if (storedUser) updateAdminLink(storedUser);
    }

    // 2. Verify with server 
    fetch('check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', data.username); // Store username
                authLink.innerHTML = '<a href="profile.html"><b>My Profile</b></a>';
                updateAdminLink(data.username);
            } else {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');

                // Remove admin link if exists
                updateAdminLink(null);

                if (authLink.innerHTML.includes('My Profile')) {
                    authLink.innerHTML = '<a href="Login.html">Sign in</a>';
                }
            }
        })
        .catch(err => console.error("Session check failed", err));
});
