document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector(".forgot-input");
    const form = document.querySelector("form");
  
    // Function to validate email format
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Function to show alert messages
    function showAlert(message, isSuccess = true) {
      alert(message);
    }
  
    // Function to handle form submission
    async function handlePasswordReset(event) {
      event.preventDefault();
  
      const email = emailInput.value.trim();
  
      // Validate email input
      if (email === "") {
        showAlert("Please enter your email.", false);
        return;
      }
  
      if (!isValidEmail(email)) {
        showAlert("Please enter a valid email address.", false);
        return;
      }
  
      try {
        const response = await fetch("https://localhost:5000/api/v1/users/password-reset-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          showAlert("A password reset email has been sent. Please check your inbox!", true);
          emailInput.value = ""; 
        } else {
          showAlert(result.message || "Failed to send reset email. Try again later.", false);
        }
      } catch (error) {
        console.error("Error submitting request:", error);
        showAlert("An error occurred. Please try again later.", false);
      }
    }
  
    // Attach form submit event listener
    form.addEventListener("submit", handlePasswordReset);
  });
  