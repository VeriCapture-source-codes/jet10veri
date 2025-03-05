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
            };
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

document.addEventListener("DOMContentLoaded", function() {
  let bx_hide = document.getElementById('bx-hide');
  let password = document.getElementById('password');

  bx_hide.onclick = function(){
 if(password.type == 'password'){
    password.type = 'text';
    bx_hide.src = 'assets/image/bx-show.png';
   }else{
    password.type = 'password';
    bx_hide.src = 'assets/image/bx-hide.png';

  }
  }
}
);
  


 
