let startButton = document.getElementById('startButton');
let pauseButton = document.getElementById('pauseButton');
let resetButton = document.getElementById('resetButton');
let setTimer = document.getElementById('setTimer');
let generator, paused, checker, time, lengthChecker = false, clickCounter = 0;
let oldNumbers = [];
let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];

let numberDisplay = document.getElementById('number');
let notificationDisplay = document.getElementById('notificationMessage');

generateNumbers = () => {
    let newNumber = numbers[Math.floor(Math.random() * numbers.length)];
    //checker = oldNumbers.indexOf(newNumber);
    /*if(checker === -1){
        oldNumbers.push(newNumber);
        speak(newNumber);
        numberDisplay.innerText = newNumber;
        document.getElementById('number'+newNumber).innerText = newNumber;
    }*/
    numbers.splice(numbers.indexOf(newNumber), 1);
    oldNumbers.push(newNumber);
    speak(newNumber);
    numberDisplay.innerText = newNumber;
    document.getElementById('number'+newNumber).innerText = newNumber;
    // To increase speed after 15 numbers
    if(oldNumbers.length > 15)
        lengthChecker = true;
    // When all 90 numbers have been spoken
    if(numbers.length == 0){
        clearInterval(generator);
        printMessage("END OF GAME");
        speak("END OF GAME");
    }
}

pauseGame = () =>{
    // pause the counter until next start.
    printMessage("GAME PAUSED");
    speak("GAME PAUSED");
    clearInterval(generator);
    paused = true;
}   

resetGame = () => {
    // clear all displays
    // clear counter display
    clearInterval(generator);
    count = 0;
    clickCounter = 0;
    time = undefined;
    oldNumbers = [];
    numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];
    printMessage("WELCOME");
    notificationDisplay.innerText = "";
    for(i=1; i<=90; i++)
        document.getElementById('number'+i).innerText = "";
}

printMessage = (message) => {
    numberDisplay.innerText = message;
}

speak = (numberToBeSpoken) => {
    let spokenNumber = new SpeechSynthesisUtterance();
    spokenNumber.text = numberToBeSpoken;
    window.speechSynthesis.speak(spokenNumber);
}

setTimer.addEventListener('click', () => {
    time = document.getElementById('time').value;
    if(!lengthChecker && time < 3){
        document.getElementById('time').value = "";        
        return alert("Please enter a time above 2 seconds..");
    }
    notificationDisplay.innerText = `Timer is set at ${time} seconds`;
    clearInterval(generator);
    if(clickCounter > 0 && !paused){
        generator = setInterval(generateNumbers, time*1000);
        document.getElementById('time').value = "";
    }
    document.getElementById('time').value = "";
});

startButton.addEventListener('click', () => {
    paused = false;
    if(clickCounter === 0){
        printMessage("GET READY!");
        speak("GET READY!");
    }
    clickCounter++;
    if(clickCounter > 1)
        printMessage("");
    notificationDisplay.innerText = "";
    if(time)
        generator = setInterval(generateNumbers, time*1000);
    else   
        generator = setInterval(generateNumbers, 3000);
});

pauseButton.addEventListener('click', () => {
    pauseGame();
});

resetButton.addEventListener('click', () => {
    resetGame();
});