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
   emailjs.send("service_83jru2p", "template_ziby4bi", {
       user_email: fromEmail,
       to_email: "shuklavivek180797@gmail.com",
       user_name: subject,
       message: message
   })
   .then(function(response) {
       console.log("Email sent successfully!", response);
       alert("Email sent successfully!");
   }, function(error) {
       console.error("Error sending email:", error);
       alert("Error sending email. Please try again later.");
   });

   // Prevent the default form submission
   return false;
 }


function initiatePayment( paykey) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    var address = document.getElementById("address").value;
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const jsonFilePath = 'const.json';
    fetch(jsonFilePath)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            let total_amount = 0;
                            let packageName = [];
                            // Compare each item in addItemArray with items in the JSON data and retrieve the amount
                            cartItems.forEach((item, index) => {
                                const matchingItem = data.package.find(packageItem => packageItem.name === item.name);
                                total_amount += matchingItem.amount;
                                packageName.push(matchingItem.name);
                            })
                            if(cartItems.length==1){
                               total_amount = total_amount;
                               console.log(name+" "+total_amount)
                            }else if(cartItems.length==2){
                               total_amount = total_amount - ((total_amount * 5) / 100)
                               console.log(name+" "+total_amount)
                            }else{
                               total_amount = total_amount - ((total_amount * 10) / 100)
                            }

                            var options = {
                                key: paykey,
                                amount: total_amount * 100, // Amount in paise (100 paise = 1 INR)
                                currency: "INR",
                                name: "Nirvaan Ayurvedic Clinic",
                                description: `Package: ${packageName.toString()} and
                                              Address: ${address}`,
                                image: 'images/logo.png', 
                                handler: function(response) {
                                    //Email send to User
                                    emailjs.send("service_83jru2p","template_gqcdtor",{
                                        user_email: email,
                                        to_email: email,
                                        user_name: name,
                                        message: `Order placed 
                                                  Yout payment id: ${response.razorpay_payment_id}
                                                  Packages:  ${packageName.toString()}
                                                  Total amount:  ${total_amount}
                                                  Address:  ${address}`
                                    })
                                    .then(function(response) {
                                        console.log("Email sent successfully!", response);
                        
                                    emailjs.send("service_83jru2p", "template_ziby4bi", {
                                        user_email: email,
                                        to_email: "shuklavivek180797@gmail.com",
                                        user_name: name,
                                        message: `Mobile no: ${mobile}
                                                  Package:  ${packageName.toString()}
                                                  Amount:  ${total_amount}
                                                  Address:  ${address}`
                                    })
                                    .then(function(response) {
                                        console.log("Email sent successfully!", response);
                                        window.location.href = "index.html";
                                    }, function(error) {
                                        console.error("Error sending email:", error);
                                    });
                        
                                    }, function(error) {
                                        console.error("Error sending email:", error);
                                    });
                        
                                    
                                    localStorage.removeItem('cartItems');
                                },
                                prefill: {
                                    name: name,
                                    email: email,
                                    contact: mobile
                                }
                            };
                            var rzp1 = new Razorpay(options);
                            rzp1.open();
                        })
                        .catch(error => {
                            console.error('There was a problem fetching the JSON data:', error);
                        });
   
    function getPackage(packages) {
        let packageName = [];
        for (let i = 0; i < packages.length; i++) {
            packageName.push(packages[i].name);
        }
        return packageName.join(', ');
    }    
    const package = getPackage(cartItems);
}

// Add event listener to the button
document.getElementById("rzp-button1").addEventListener("click", function(event) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var mobile = document.getElementById("mobile").value;
    var address = document.getElementById("address").value;
    if(!name || !mobile || !address || !email){
    }else{
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
        key = data.PAYMENT_KEY;
        initiatePayment(key);
    })
    .catch(error => {
        console.error('Error fetching JSON:', error);
    });
    }

    event.preventDefault(); // Prevent form submission
});

