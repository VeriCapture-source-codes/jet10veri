document.addEventListener('DOMContentLoaded', function() {
  // Get the traffic container
  const trafficContainer = document.querySelector('.traffic');
  
  // Like functionality
  const likeButton = trafficContainer.querySelector('.traffic-rating:nth-child(1) .traffic-rating-button');
  const likeCount = trafficContainer.querySelector('.traffic-rating:nth-child(1) .traffic-rating-count');
  
  likeButton.addEventListener('click', function() {
    let currentLikes = parseInt(likeCount.textContent);
    likeCount.textContent = currentLikes + 1;
    
    // Change color to indicate active state
    likeButton.style.color = '#4267B2'; // Facebook blue for like
  });
  
  // Dislike functionality
  const dislikeButton = trafficContainer.querySelector('.traffic-rating:nth-child(2) .traffic-rating-button');
  const dislikeCount = trafficContainer.querySelector('.traffic-rating:nth-child(2) .traffic-rating-count');
  
  dislikeButton.addEventListener('click', function() {
    let currentDislikes = parseInt(dislikeCount.textContent);
    dislikeCount.textContent = currentDislikes + 1;
    
    // Change color to indicate active state
    dislikeButton.style.color = '#FF0000'; // Red for dislike
  });
  
  // Comment functionality
  const commentButton = trafficContainer.querySelector('.traffic-rating:nth-child(3) .traffic-rating-button');
  const commentCount = trafficContainer.querySelector('.traffic-rating:nth-child(3) .traffic-rating-count');
  
  commentButton.addEventListener('click', function() {
    let currentComments = parseInt(commentCount.textContent);
    commentCount.textContent = currentComments + 1;
    
    // Prompt user for comment (simple implementation)
    const comment = prompt('Add your comment:');
    if (comment) {
      // In a real app, you would send this to a server
      console.log('New comment:', comment);
    }
  });
  
  // Share functionality
  const shareButton = trafficContainer.querySelector('.traffic-rating:nth-child(4) .traffic-rating-button');
  
  shareButton.addEventListener('click', function() {
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: 'Traffic Alert',
        text: 'Fuel tanker falls and caused serious traffic on Awka Onitsha Express Way',
        url: window.location.href
      })
      .then(() => console.log('Shared successfully'))
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers without Web Share API
      alert('Share this URL: ' + window.location.href);
    }
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

  


 
