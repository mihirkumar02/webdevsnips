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

