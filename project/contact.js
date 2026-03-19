$(document).ready(function() {
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[+\d][\d\s\-]{5,}$/;
    return re.test(phone);
  }

  $('#contactForm').submit(function(event) {
    event.preventDefault(); 
    
    const messageBox = $('#formMessage');
    messageBox.removeClass('success').css('color', '#9B2F77').text('Sending...');
    
    // Gather data
    const formData = {
      firstName: $('#firstName').val().trim(),
      lastName: $('#lastName').val().trim(),
      phone: $('#phone').val().trim(),
      email: $('#email').val().trim(),
      message: $('#message').val().trim()
    };

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
      messageBox.text('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      messageBox.text('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      messageBox.text('Please enter a valid phone number.');
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'contact.php', 
      data: JSON.stringify(formData),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(response) {
        messageBox.addClass('success').css('color', 'green').text(response.message);
        $('#contactForm')[0].reset();
      },
      error: function(xhr, status, error) {
        let errorMsg = "An error occurred.";
        if (xhr.responseJSON && xhr.responseJSON.message) {
            errorMsg = xhr.responseJSON.message;
        }
        messageBox.text(errorMsg);
      }
    });
  });
});