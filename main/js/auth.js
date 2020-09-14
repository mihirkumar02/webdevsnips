firebase.auth.Auth.Persistence.SESSION;

firebase.auth().onAuthStateChanged(function(user) {
    if(user){
        window.location.href = "./dashboard.html";
    }
});



function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;


    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Error: " + errorMessage);
        });
}


function signup() {
    var signupEmail = document.getElementById("signupEmail").value;
    var signupPassword = document.getElementById("signupPassword").value;

    firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword)
    .then(function(){
        window.alert("Registered successfully!");
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}


function forgot() {
    var auth = firebase.auth();
    var forgotEmail = document.getElementById("forgotEmail").value;

    if(forgotEmail != ""){
        auth.sendPasswordResetEmail(forgotEmail).then(function(){
            window.alert("An Email with instructions has been sent to " + forgotEmail);
        })
        .catch(err => window.alert("Error is: " + err.message));
    } else {
        window.alert("Please provide a valid Email address.");
    }
}

/* GOOGLE LOGIN code */

var provider = new firebase.auth.GoogleAuthProvider();

function googleLogin(){
    firebase.auth().signInWithPopup(provider).then(function(result){
        var token = result.credential.accessToken;
        var user = result.user;
    }) 
    .catch(function(error){
        var errorMessage = error.message;
        window.alert(errorMessage);
    })
}

/* PHONE NUMBER LOGIN Code */

// Variable to store captchaVerification result
var resultCode;

// Render Captcha box when page loads
window.onload = function(){
    captchaRender();
};
function captchaRender(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}

// =====================================

// Get the phone number from user
function getPhoneNumberFromUserInput(){
    var phoneNumber = document.getElementById('phone').value;

    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        .then(function (confirmationResult) {
          window.confirmationResult = confirmationResult;
          resultCode = confirmationResult;
          window.alert('Code sent to ' + phoneNumber);
        }).catch(function (error) {
          window.alert(error.message);
    });
}

// ======================================

// Verify the code entered by user
function verifyCode(){
    var code = document.getElementById('verificationCode').value;
    resultCode.confirm(code).then(function (result) {
        window.alert("Code Verified!");
        var user = result.user;
      }).catch(function (error) {
        window.alert(error.message);
      });
}