$(document).ready(function () {
    const $container = $(".container");

    // Animation toggle
    $("#sign-up-btn").on("click", () => $container.addClass("sign-up-mode"));
    $("#sign-in-btn").on("click", () => $container.removeClass("sign-up-mode"));

    // Eye Icon toggle
    $(document).on("click", ".eye-icon", function () {
        const $input = $(this).siblings("input");
        const type = $input.attr("type") === "password" ? "text" : "password";

        $input.attr("type", type);
        $(this).toggleClass('fa-eye fa-eye-slash');
    });

    // Password Matching
    $("#signup-pass2").on("keyup", function () {
        const pass1 = $("#signup-pass").val();
        const pass2 = $(this).val();
        const $errorMsg = $("#signup-error");

        if (pass2 === "") {
            $errorMsg.text("");
            $(this).parent().css("border", "none");
        } else if (pass1 !== pass2) {
            $errorMsg.text("Passwords do not match").css("color", "red");
            $(this).parent().css("border", "1px solid red");
        } else {
            $errorMsg.text("Passwords Match").css("color", "green");
            $(this).parent().css("border", "1px solid green");
        }
    });

    // 4. AJAX Sign Up
    $(".sign-up-form").on("submit", function (e) {
        e.preventDefault();

        const username = $("#signup-user").val();
        const email = $("#signup-email").val();
        const full_name = $("#signup-name").val();
        const phone = $("#signup-phone").val();
        const password = $("#signup-pass").val();
        const confirmPass = $("#signup-pass2").val();
        const security_question = $("#signup-question").val();
        const security_answer = $("#signup-answer").val();

        if (password !== confirmPass) {
            $("#signup-error").text("Cannot submit: Passwords do not match");
            return;
        }

        if (!security_question) {
            $("#signup-error").text("Please select a security question");
            return;
        }

        $.ajax({
            url: "signup.php",
            type: "POST",
            data: { username, email, full_name, phone, password, security_question, security_answer },
            success: function (response) {
                if (response.status === "success") {

                    alert("Account Created! Please Login."); // One alert m4 mo4kla
                    $container.removeClass("sign-up-mode");
                } else {
                    $("#signup-error").text(response.message).css("color", "red");
                }
            }
        });
    });

    // 5. AJAX Sign In 
    $(".sign-in-form").on("submit", function (e) {
        e.preventDefault();
        $("#signin-error").text("");

        const username = $("#signin-user").val();
        const password = $("#signin-pass").val();

        $.ajax({
            url: "signin.php",
            type: "POST",
            data: { username, password },
            success: function (response) {
                if (response.status === "success") {
                    localStorage.setItem('isLoggedIn', 'true'); // Set login flag
                    window.location.href = 'index.html'; // Redirect on success
                } else {

                    $("#signin-error").text(response.message).css("color", "red");
                }
            }
        });
    });

    // 6. Forgot Password Toggle
    $("#forgot-pass-link").on("click", function (e) {
        e.preventDefault();
        $(".sign-in-form").animate({ opacity: 0 }, 300, function () {
            $(this).css("display", "none");
            $(".change-password-form").css({ display: "flex", opacity: 0 }).animate({ opacity: 1 }, 300);
        });
    });

    $("#cancel-change-btn").on("click", function () {
        $(".change-password-form").animate({ opacity: 0 }, 300, function () {
            $(this).css("display", "none");
            $(".sign-in-form").css({ display: "flex", opacity: 0 }).animate({ opacity: 1 }, 300);
        });
    });

    // 7. Change Password AJAX
    $(".change-password-form").on("submit", function (e) {
        e.preventDefault();

        const username = $("#change-user").val();
        const email = $("#change-email").val();
        const new_password = $("#change-pass").val();
        const security_question = $("#change-question").val();
        const security_answer = $("#change-answer").val();

        if (!security_question) {
            $("#change-error").text("Please select a security question").css("color", "red");
            return;
        }

        $.ajax({
            url: "change_password.php",
            type: "POST",
            data: { username, email, new_password, security_question, security_answer },
            success: function (response) {
                if (response.status === "success") {
                    alert(response.message);
                    $(".change-password-form").animate({ opacity: 0 }, 300, function () {
                        $(this).css("display", "none");
                        $(".sign-in-form").css({ display: "flex", opacity: 0 }).animate({ opacity: 1 }, 300);
                    });

                    $("#change-user").val("");
                    $("#change-email").val("");
                    $("#change-pass").val("");
                    $("#change-answer").val("");
                    $("#change-question").val("");
                } else {
                    $("#change-error").text(response.message).css("color", "red");
                }
            }
        });
    });
});