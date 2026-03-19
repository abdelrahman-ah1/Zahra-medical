document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    const email = document.querySelector('input[type="email"]');
    const nameField = document.querySelector('input[placeholder="Enter your Name"]');
    const model = document.querySelector('input[placeholder="Enter the model"]');
    const machine = document.querySelector('input[placeholder="Enter the machine name"]');
    const compliment = document.querySelector('input[placeholder="Enter compliment"]');
    const date = document.querySelector('input[placeholder="mm/dd/yyyy"]');

    const phone = document.querySelector('input[placeholder="Enter your phone (e.g. +201012345678)"]');

    const message = document.querySelector('textarea');

    phone.addEventListener("input", function () {
        let input = phone.value.replace(/\D/g, "");
        if (input.length > 0) input = "+" + input;
        phone.value = input;
    });

    date.addEventListener("input", function () {
        let input = date.value.replace(/\D/g, "");
        if (input.length >= 3 && input.length <= 4)
            input = input.slice(0, 2) + "/" + input.slice(2);
        else if (input.length >= 5)
            input = input.slice(0, 2) + "/" + input.slice(2, 4) + "/" + input.slice(4, 8);
        date.value = input;
    });

    function validateForm() {
        let valid = true;

        function check(field) {
            if (field.value.trim() === "") {
                field.style.borderBottom = "2px solid red";
                valid = false;
            } else {
                field.style.borderBottom = "2px solid black";
            }
        }

        check(email);
        check(nameField);
        check(model);
        check(machine);
        check(compliment);
        check(date);
        check(phone);
        check(message);

        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(email.value)) {
            email.style.borderBottom = "2px solid red";
            valid = false;
        }

        if (phone.value.length < 6) {
            phone.style.borderBottom = "2px solid red";
            valid = false;
        }

        return valid;
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!validateForm()) {
            alert("⚠️ Please fill all fields correctly.");
            return;
        }

        alert("✅ Reservation submitted successfully!");

        form.reset();
    });
});
