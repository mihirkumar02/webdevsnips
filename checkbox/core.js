function change(){
    var container = document.getElementById('container');
    var dayNight = document.getElementById('day-night');
    
    if(dayNight.checked){
        container.style.backgroundColor = "#1d0230";
    } else {
        container.style.backgroundColor = "#fafafa";
    }
}
