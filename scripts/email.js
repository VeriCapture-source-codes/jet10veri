
document.addEventListener("DOMContentLoaded", async () => {
    const emailText = document.querySelector(".email"); 
    const otpInputs = document.querySelectorAll(".otp-input input");
    const verifyButton = document.querySelector(".verify-btn");
    const resendText = document.querySelector(".resend-text");

    let userEmail = localStorage.getItem("userEmail") || "";
    let countdownTimer;

    
    async function fetchUserEmail() {
        if (!userEmail) {
            try {
                const response = await fetch("https://localhost:5000/api/v1/users/reset-password");
                const data = await response.json();

                if (data && data.email) {
                    userEmail = data.email;
                    localStorage.setItem("userEmail", userEmail); 
                    emailText.textContent = maskEmail(userEmail);
                    document.getElementById("email-input").value = userEmail;
                    startCountdown();
                }
            } catch (error) {
                console.error("Error fetching email:", error);
            }
        } else {
            emailText.textContent = maskEmail(userEmail);
            startCountdown();
        }
    }

    function maskEmail(email) {
        const [name, domain] = email.split("@");
        return `${"*".repeat(name.length - 3)}${name.slice(-3)}@${domain}`;
    }

    function startCountdown() {
        let timeLeft = 60;
        resendText.innerHTML = `Didn't get a code? Resend in <strong>${timeLeft}s</strong>`;
        countdownTimer = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                resendText.innerHTML = `Didn't get a code? Resend in <strong>${timeLeft}s</strong>`;
            } else {
                clearInterval(countdownTimer);
                resendText.innerHTML = `Didn't get a code? <a href="#" class="resend-link">Resend code</a>`;
                const newLink = resendText.querySelector(".resend-link");
                newLink.addEventListener("click", resendOTP);
            }
        }, 1000);
    }

    // Restrict input to numbers only
    otpInputs.forEach((input, index) => {
        input.setAttribute("inputmode", "numeric"); 
        input.addEventListener("input", (e) => {
            const value = e.target.value.replace(/\D/g, ''); 
            input.value = value;
            if (value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && input.value === "" && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    async function verifyOTP(e) {
        e.preventDefault();

        const otpCode = Array.from(otpInputs).map(input => input.value.trim()).join("");
        if (otpCode.length !== 6 || !/^\d{6}$/.test(otpCode)) {
            alert("Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            const response = await fetch("https://localhost:5000/api/v1/users/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, otp: otpCode })
            });

            const result = await response.json();

            if (result.success) {
                alert("OTP Verified Successfully!");
                localStorage.removeItem("userEmail"); 
                window.location.href = "dashboard.html";
            } else {
                alert(result.message || "Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
        }
    }

    async function resendOTP(event) {
        event.preventDefault();

        if (!userEmail) {
            alert("Email not found. Please reload the page.");
            return;
        }

        try {
            const response = await fetch("https://localhost:5000/api/v1/users/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail })
            });

            const result = await response.json();

            if (result.success) {
                alert("A new OTP has been sent to your email.");
                startCountdown();
            } else {
                alert(result.message || "Failed to resend OTP. Try again later.");
            }
        } catch (error) {
            console.error("Resend OTP failed:", error);
        }
    }

    verifyButton.addEventListener("click", verifyOTP);
    fetchUserEmail();
});





