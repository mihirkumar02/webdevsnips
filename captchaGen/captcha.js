let captcha;
let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
let status = document.getElementById('status');
 
generateCaptcha = () => {
    let first = Math.floor((Math.random() * 10));
    let second = alphabets[Math.floor((Math.random() * alphabets.length))];
    let third = Math.floor((Math.random() * 10));
    let fourth = alphabets[Math.floor((Math.random() * alphabets.length))];
    let fifth = alphabets[Math.floor((Math.random() * alphabets.length))];
    let sixth = Math.floor((Math.random() * 10));
	captcha=first.toString()+second.toString()+third.toString()+fourth.toString()+fifth.toString()+sixth.toString();
	document.getElementById("generated-captcha").value = captcha;
	status.innerText = "Captcha Generator";
	document.getElementById("entered-captcha").value = "";
}
 
checkCaptcha = () => {
	let input=document.getElementById("entered-captcha").value;
 
	if(input==captcha){
		status.innerText = "Matched!";
	}
	else{
		status.innerText = "Not Matching!";
	}
}