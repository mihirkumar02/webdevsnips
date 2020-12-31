let form = document.getElementById("signupForm");
let button = document.getElementById("regBtn");
let inputField = document.getElementById("password");
let message = document.getElementById("text");

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})");
const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})");
const weakRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.{10,})");
const capitalWeak = new RegExp("^(?=.*[A-Z])(?=.{10,})");
const smallWeak = new RegExp("^(?=.*[a-z])(?=.{10,})");

function checkPassword(){
    let signupPassword = document.getElementById("password").value;
    if(signupPassword.length < 10){
        if(signupPassword.length == 0){
            form.style.boxShadow = "0 0 12px -2px lightgray";
            message.innerHTML = "<h4>Password Strength Checker</h4>";
        } else {
            form.style.boxShadow = "0 0 6px -2px #c20202";
            message.innerHTML = "<h4>Too Short! Get to 10...</h4>";
        }
    } else if(signupPassword.length >= 10){
        if(!strongRegex.test(signupPassword)){
            if(mediumRegex.test(signupPassword)){
                form.style.boxShadow = "0 0 6px -2px #747400";
                message.innerHTML = "<h4>Almost there! Can be stronger...</h4>";
            } else if(weakRegex.test(signupPassword) || smallWeak.test(signupPassword) || capitalWeak.test(signupPassword)){
                form.style.boxShadow = "0 0 6px -2px #c20202";
                message.innerHTML = "<h4>Oops! This can be cracked easily...</h4>";
            } 
        } else {
            form.style.boxShadow = "0 0 6px -2px green";
            message.innerHTML = "<h4>Now that's more like a Password!</h4>";
        }
    } 
}
