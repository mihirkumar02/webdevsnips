var count = 1;
function navbarControl(){
    document.getElementById('navbar-button').classList.toggle("changeIcon");
    document.getElementById('navbar-background').classList.toggle("extend-navbar-bg");
    if(count % 2 != 0){
        document.getElementById("home").style.animation = "show 0.2s 0.2s forwards ease";
        document.getElementById("about").style.animation = "show 0.2s 0.3s forwards ease";
        document.getElementById("gallery").style.animation = "show 0.2s 0.4s forwards ease";
        document.getElementById("contact").style.animation = "show 0.2s 0.5s forwards ease";
        count++;
    } else {
        document.getElementById("home").style.animation = "none";
        document.getElementById("about").style.animation = "none";
        document.getElementById("gallery").style.animation = "none";
        document.getElementById("contact").style.animation = "none";
        count++;
    }
}
