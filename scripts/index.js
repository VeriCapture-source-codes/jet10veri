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

const darkModeToggle = document.getElementById('dark-mode-toggle'); // Select the dark mode toggle image
const darkModeToggle2 = document.getElementById('dark-mode-toggle2'); // Select the dark mode toggle image
const body = document.body;
const nav = document.getElementById('nav');
const navLinks = document.getElementById('nav-links');
const mainContent = document.getElementById('main-content');
const head = document.getElementById('head');
const tweetCard = document.getElementById('tweet-card');
const kstrong = document.getElementById('kstrong');
const fuel = document.getElementById('fuel');
const onAwka = document.getElementById('on-awka');
const navLinksAnchors = navLinks.querySelectorAll('li a'); // Select all <a> tags inside <li> in nav-links
const logo = document.querySelector('.logo img'); // Select the logo image inside the label
const container = document.querySelector('.container'); // Select the container

const colors = ['white', 'black']; // Array of colors
const defaultLogoSrc = './assets/image/Data For  Vericapture 2.png'; // Default logo source
const alternateLogoSrc = './assets/image/logosss___2_-removebg-preview 1.png'; // Alternate logo source

// Image paths for dark mode and light mode toggle
const darkModeImage = './assets/image/dark mode.png'; // Dark mode image
const lightModeImage = './assets/image/Property 1=Sun.png'; // Light mode image

darkModeToggle.addEventListener('click', changeBackground); // click event listener to the dark mode toggle
darkModeToggle2.addEventListener('click', changeBackground); // click event listener to the dark mode toggle

function changeBackground() {
    const colorsIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[colorsIndex];

    console.log('Selected Color:', selectedColor); // Debugging: Log the selected color

    // Get the current background color of the body
    const currentBgColor = window.getComputedStyle(body).backgroundColor;

    // Check if the current background color is white and the new color is not white
    if (currentBgColor === 'rgb(255, 255, 255)' && selectedColor !== 'white') {
        // Change text color to white for all elements
        body.style.color = 'white';
        nav.style.color = 'white';
        navLinks.style.color = 'white';
        mainContent.style.color = 'white';
        head.style.color = 'white';
        tweetCard.style.color = 'white';
        kstrong.style.color = 'white';
        fuel.style.color = 'white';
        onAwka.style.color = 'white';
        container.style.color = 'white';
        // Change text color of <a> tags inside <li> in nav-links to white
        navLinksAnchors.forEach(anchor => {
            anchor.style.color = 'white';
        });
        // Change the logo to the alternate logo when the background is black
        if (selectedColor === 'black') {
            console.log('Changing logo to alternate logo'); // Debugging: Log logo change
            console.log('Alternate Logo Path:', alternateLogoSrc); // Debugging: Log the alternate logo path
            logo.src = alternateLogoSrc;
            // Change the dark mode toggle image to the light mode image
            darkModeToggle.src = lightModeImage;
            darkModeToggle2.src = lightModeImage;
        }
    } else if (selectedColor === 'white') {
        // If the new background color is white, reset text color to black
        body.style.color = 'black';
        nav.style.color = 'black';
        navLinks.style.color = 'black';
        mainContent.style.color = 'black';
        head.style.color = 'black';
        tweetCard.style.color = 'black';
        kstrong.style.color = 'black';
        fuel.style.color = 'black';
        onAwka.style.color = 'black';
        container.style.color = 'black';
        // Reset text color of <a> tags inside <li> in nav-links to black
        navLinksAnchors.forEach(anchor => {
            anchor.style.color = 'black';
        });
        // Reset the logo to the default logo when the background is white
        console.log('Changing logo to default logo'); // Debugging: Log logo change
        logo.src = defaultLogoSrc;
        // Reset the dark mode toggle image to the dark mode image
        darkModeToggle.src = darkModeImage;
        darkModeToggle2.src = darkModeImage;
    }

    // Change the background color of the body, nav-links, main-content, and tweet-card
    body.style.backgroundColor = selectedColor;
    nav.style.backgroundColor = selectedColor;
    navLinks.style.backgroundColor = selectedColor;
    mainContent.style.backgroundColor = selectedColor;
    tweetCard.style.backgroundColor = selectedColor;
    container.style.backgroundColor = selectedColor;
}

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

  


 
