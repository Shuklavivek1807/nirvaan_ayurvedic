// navbar toggling
const navbarShowBtn = document.querySelector('.navbar-show-btn');
const navbarCollapseDiv = document.querySelector('.navbar-collapse');
const navbarHideBtn = document.querySelector('.navbar-hide-btn');

navbarShowBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.add('navbar-show');
});
navbarHideBtn.addEventListener('click', function(){
    navbarCollapseDiv.classList.remove('navbar-show');
});


// stopping all animation and transition
let resizeTimer;
window.addEventListener('resize', () =>{
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

const keyPath = 'key.json';
let key;

fetch(keyPath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        key = data.EMAIL_KEY;
        emailjs.init(key);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });


// Function to send the email
function sendEmail(event) {
   // Fetch form values
   event.preventDefault();
   var fromEmail = document.getElementById('user-email').value;
   var subject = document.getElementById('user-name').value;
   var message = document.getElementById('user-message').value;


//    Send the email
   emailjs.send("service_ygmqpti", "template_sg1mtmx", {
       user_email: fromEmail,
       to_email: "nirvaanayurvedic.com@gmail.com",
       user_name: subject,
       message: message
   })
   .then(function(response) {
       console.log("Email sent successfully!", response);
       alert("Thank you for reaching us!");
       window.location.href = "/";
   }, function(error) {
       console.error("Error sending email:", error);
       alert("Error sending email. Please try again later.");
   });

   // Prevent the default form submission
   return false;
 }

function toggleBotOptions() {
    var options = document.getElementById("bot-options");
    options.classList.toggle("hidden");
  }
  
  function toggleBotOptions() {
    var options = document.getElementById("bot-options");
    var icon = document.getElementById("bot-icon");
    options.classList.toggle("hidden");
    icon.classList.toggle("rotated");
  }

