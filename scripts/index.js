document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.traffic').forEach(traffic => {
    const trafficId = traffic.dataset.trafficId;
    const ratings = traffic.querySelectorAll('.traffic-rating');
    const likeRating = ratings[0]; // Assuming first rating is for "like"

    ratings.forEach(rating => {
      const button = rating.querySelector('.traffic-rating-button');
      if (button) { // Check if button exists
        const count = rating.querySelector('.traffic-rating-count');

        button.addEventListener('click', async () => {
          // Prevent if already selected
          if (rating.classList.contains('post-rating-selected')) {
            return;
          }

          count.textContent = Number(count.textContent) + 1;
          // Deselect all ratings

          ratings.forEach(rating => {
            if (rating.classList.contains('post-rating-selected')){
              const count = rating.querySelector('.traffic-rating-count');
              count.textContent = Math.max(0, Number(count.textContent) - 1);
              rating.classList.remove('post-rating-selected');
            }
          });
              
    rating.classList.add('post-rating-selected');
          // Determine if it's a like or dislike request
          const likeOrDislike = likeRating === rating ? 'like' : 'dislike';
          console.log(`Sending ${likeOrDislike} request for traffic ID: ${trafficId}`);

          // Early exit if trafficId is missing
          if (!trafficId) {
            console.error('Missing trafficId for rating.');
            return;
          }

          try {
            // Perform the POST request to update the like/dislike count
            const response = await fetch(`/traffics/${trafficId}/${likeOrDislike}`, {
              method: 'POST',  // Use POST to change the state
              headers: {
                'Content-Type': 'application/json', // Ensure the correct content type
              },
            });

            if (response.ok) {
              const trafficData = await response.json();
              console.log(trafficData); // Log to see the result
              // You can now update the UI with the new rating count if needed
              count.textContent = trafficData.newRatingCount; // Example: Update the count with the new value
            } else {
              console.error(`Failed to fetch: ${response.statusText}`);
            }
          } catch (error) {
            console.error('Error during fetch:', error);
          }
        });
      } else {
        console.error('Button not found in rating:', rating);
      }
    });
  });
});

// Elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeToggle2 = document.getElementById('dark-mode-toggle2');
const body = document.body;
const nav = document.getElementById('nav');
const navLinks = document.getElementById('nav-links');
const mainContent = document.getElementById('main-content');
const h1 = document.querySelector('h1');
const Kaycee = document.getElementById('Kaycee');
const fuel = document.getElementById('fuel');
const onAwka = document.getElementById('on-awka');
const tweetCard = document.getElementById('tweet-card');
const logo = document.querySelector('.logo img');

// Only proceed if required elements exist
if (!darkModeToggle || !darkModeToggle2 || !body || !navLinks || !logo || !nav || !mainContent || !Kaycee || !fuel || !onAwka || !tweetCard) {
    console.error('Essential elements not found!');
}

// Image paths
const defaultLogoSrc = './assets/image/Data For  Vericapture 2.png';
const alternateLogoSrc = './assets/image/logosss___2_-removebg-preview 1.png';
const darkModeImage = './assets/image/dark mode.png';
const lightModeImage = './assets/image/Property 1=Sun.png';

let isDarkMode = false; // Track state instead of random

function toggleDarkMode() {
    isDarkMode = !isDarkMode; // Toggle state
    
    if (isDarkMode) {
        // Apply dark mode
        document.documentElement.style.setProperty('--bg-color', 'black');
        document.documentElement.style.setProperty('--text-color', 'white');
        
        // Update logo and toggle images
        if (logo) logo.src = alternateLogoSrc;
        if (darkModeToggle) darkModeToggle.src = lightModeImage;
        if (darkModeToggle2) darkModeToggle2.src = lightModeImage;
        
        // Update element styles
        const elements = [body, nav, navLinks, mainContent, Kaycee, fuel, onAwka, tweetCard];
        elements.forEach(el => {
            if (el) {
                el.style.backgroundColor = 'black';
                el.style.color = 'white';
            }
        });
        
        // Update links
        if (navLinks) {
            const anchors = navLinks.querySelectorAll('a');
            anchors.forEach(a => a.style.color = 'white');
        }
    } else {
        // Apply light mode
        document.documentElement.style.setProperty('--bg-color', 'white');
        document.documentElement.style.setProperty('--text-color', 'black');
        
        // Reset images
        if (logo) logo.src = defaultLogoSrc;
        if (darkModeToggle) darkModeToggle.src = darkModeImage;
        if (darkModeToggle2) darkModeToggle2.src = darkModeImage;
        
        // Reset element styles
        const elements = [body, nav, navLinks, mainContent, Kaycee, fuel, onAwka, tweetCard];
        elements.forEach(el => {
            if (el) {
                el.style.backgroundColor = 'white';
                el.style.color = 'black';
            }
        });
        
        // Reset links
        if (navLinks) {
            const anchors = navLinks.querySelectorAll('a');
            anchors.forEach(a => a.style.color = 'black');
        }
    }
}

// Event listeners
if (darkModeToggle) darkModeToggle.addEventListener('click', toggleDarkMode);
if (darkModeToggle2) darkModeToggle2.addEventListener('click', toggleDarkMode);


document.addEventListener("DOMContentLoaded", function() {
  let bx_hides = document.querySelectorAll('#bx-hide, #bx-hide2');
  let passwords = document.querySelectorAll('#password, #password2');

  bx_hides.forEach((bx_hide, index) => {
    console.log('bx_hide:', bx_hide); // Check if the element is found
    bx_hide.onclick = function() {
      let password = passwords[index]; // Get the corresponding password field
      console.log('password:', password); // Check the password field

      if (password.type === 'password') {
        password.type = 'text';
        bx_hide.src = 'assets/image/bx-show.png';
      } else {
        password.type = 'password';
        bx_hide.src = 'assets/image/bx-hide.png';
      }
    };
  });
});

  


 
