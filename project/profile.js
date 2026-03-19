$(document).ready(function () {
    // Fetch user data
    $.ajax({
        url: 'get_profile.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                const user = response.data;

                $('#display-name').text(user.full_name ? user.full_name : user.username);
                $('#profile-username').val(user.username);
                $('#profile-fullname').val(user.full_name);
                $('#profile-email').val(user.email);
                $('#profile-phone').val(user.phone);
                $('#profile-question').val('Selected: ' + user.security_question);

            } else {
                alert('Session expired or invalid. Please log in again.');
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'Login.html';
            }
        },
        error: function () {
            console.error('Error fetching profile data');
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'Login.html';
        }
    });

    $('#logout-btn').on('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'logout.php';
    });
});
