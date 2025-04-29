document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Grab form field values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Check for empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('All fields must be filled out.');
      return;
    }
  
    // Validate email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    // If all validations pass
    alert('Form submitted successfully!');
    // You can submit form data to a server here
  });
  