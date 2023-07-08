// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Get references to the necessary DOM elements
const errorModal = document.getElementById('modal');
const errorMessage = document.getElementById('modal-message');

// Hide the error modal initially
errorModal.classList.add('hidden');

// Function to handle the click event on an empty heart
function handleEmptyHeartClick(event) {
  const heart = event.target;
  // Simulate making a server request
  mimicServerCall()
    .then(() => {
      // On success, change the heart to full and add the activated-heart class
      heart.innerText = FULL_HEART;
      heart.classList.add('activated-heart');
      heart.removeEventListener('click', handleEmptyHeartClick)
      heart.addEventListener('click', handleFullHeartClick)
    })
    .catch(error => {
      // On failure, display the error modal and set the error message
      errorMessage.innerText = error;
      errorModal.classList.remove('hidden');
      // Hide the modal after 3 seconds
      setTimeout(() => {
        errorModal.classList.add('hidden');
      }, 3000);
    });
}

// Function to handle the click event on a full heart
function handleFullHeartClick(event) {
  console.log("hello")
  const heart = event.target;
  // Change the heart back to empty and remove the activated-heart class
  heart.innerText = EMPTY_HEART;
  heart.classList.remove('activated-heart');
  heart.removeEventListener('click', handleFullHeartClick)
      heart.addEventListener('click', handleEmptyHeartClick)
}

// Attach event listeners to the empty and full hearts
const emptyHearts = document.querySelectorAll('.like-glyph');
emptyHearts.forEach(heart => {
  heart.addEventListener('click', handleEmptyHeartClick);
});

const fullHearts = document.querySelectorAll('.activated-heart');
fullHearts.forEach(heart => {
  heart.addEventListener('click', handleFullHeartClick);
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
