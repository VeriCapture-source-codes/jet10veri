document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector(".forgot-input");
    const form = document.querySelector("form");
    const loader = document.getElementById("loader");
  
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

      // Show loader
      document.body.classList.add("loading");
      if (loader) loader.style.display = "block";
  
      try {
        const response = await fetch("http://localhost:5000/api/v1/users/password-reset-otp", {
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

           // Wait 5 seconds, then redirect
        
           setTimeout(() => {
          window.location.href = "./email.html"; //route to the next page
        }, 2000);
        
        } else {
          showAlert(result.message || "Failed to send reset email. Try again later.", false);
        }
      } catch (error) {
        console.error("Error submitting request:", error);
        showAlert("An error occurred. Please try again later.", false);
      }
      
      finally {
      if (loader) loader.style.display = "none";
        document.body.classList.remove("loading");
      }
    }
  
    // Attach form submit event listener
    form.addEventListener("submit", handlePasswordReset);
  });
  