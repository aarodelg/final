var error = document.body.querySelector(".error");

var inputList = [];

var gradeList = [];

function gradeView() {
	var message = document.querySelector(".message");
	message.innerHTML = "";
	var wrapper = document.querySelector(".wrapper");
	for (var i = 0; i < gradeList.length; i++) {
		var ele = document.createElement("div");
		ele.innerHTML = gradeList[i].name + ", " + gradeList[i].grade;
		wrapper.appendChild(ele);
	}
	if (gradeList.length == 0) {
		message.innerHTML = "No grades have been entered yet.";
	}
}

function addGrade() {
	var wrapper = document.querySelector(".wrapper");
	var message = document.querySelector(".message");
	
	var button = document.createElement("button");
	button.innerHTML="Submit";
	var nameInput = document.createElement("input");
	nameInput.placeholder="Student Name";
	var gradeInput = document.createElement("input");
	gradeInput.placeholder="Grade (Numerical Value)";
	
	wrapper.innerHTML = "";
	message.innerHTML = "\n";
	wrapper.appendChild(nameInput);
	wrapper.appendChild(gradeInput);
	wrapper.appendChild(button);
	button.addEventListener ("click", function() {
		var name = nameInput.value;
		var grade = gradeInput.value.trim();
		if (validCheck(name,grade)) {
			var submission = {
				name: name.trim(),
				grade: grade
			};
			gradeList.push(submission);
			renderPage("gradeView");
		}else{
			if (name.trim() === "") {
				if (grade === "") {
					message.innerHTML = "No values were entered.";
				}else if (Number(grade)>100||Number(grade)<0) {
					message.innerHTML = "No name was entered. Grade is invalid.";
				}else{
					message.innerHTML = "No name was entered.";
				}
			}else if (isNaN(name.trim()) === false) {
				if (grade === "") {
					message.innerHTML = "Name is invalid. No grade was entered.";
				}else if (isNaN(grade)) {
					message.innerHTML = "Name and Grade are invalid.";
				}else if (Number(grade)>100||Number(grade)<0) {
					message.innerHTML = "Name and Grade are invalid.";
				}else{
					message.innerHTML = "Name is invalid.";
				}
			}else{
				if (grade === "") {
					message.innerHTML = "No grade was entered.";
				}else if (isNaN(grade)) {
					message.innerHTML = "Grade is invalid.";
				}else if (Number(grade)>100||Number(grade)<0) {
					message.innerHTML = "Grade is invalid.";
				}
			}
		}
	});
}


function validCheck(nameStr, gradeNum) {
	var validity = true;
		if (isNaN(nameStr)==false) {
			validity = false;
		}
		if (gradeNum !== "") {
			if (isNaN(Number(gradeNum))==true) {
				validity = false;
			}
		}else{
			validity = false;
		}
		if (Number(gradeNum)>100||Number(gradeNum)<0) {
			validity = false;
		}
		if (validity === true) {
			return true;
		}
}

function app() {
	renderPage("loginPage");
}

function mainMenu() {
	var wrapper = document.querySelector(".wrapper");
	wrapper.innerHTML = "";
	var pages = ["gradeView", "addGrade"];
	init();
	nav(pages);
}

function init() {
	var nav = document.createElement("nav");
	nav.classList.add("nav");
	var wrapper = document.createElement("div");
	wrapper.classList.add("wrapper");
	var message = document.createElement("div");
	message.classList.add("message");
	document.body.appendChild(nav);
	document.body.appendChild(wrapper);
	document.body.appendChild(message);
}

function nav(lists) {
	for (var i = 0; i < lists.length; i++) {
		const button = document.createElement("button");
		const val = lists[i];
		button.innerHTML = lists[i];
		button.addEventListener("click", function() {
			renderPage(val);
		});
		document.body.querySelector(".nav").appendChild(button);
	}
}

function submit(username, passphrase) {
	var inputObj = {
		name: username,
		pass: passphrase
	};
	inputList.push(inputObj);
	console.log(inputList);
	var corUser = false;
	var corPass = false;
	var blankUser = false;
	var blankPass = false;
	
	if (username === "cool") {
		corUser = true;
	} else {
		corUser = false;
		if (username === "") {
			blankUser = true;
		} else {
			blankUser = false;
		}
	}
	if (passphrase === "password") {
		corPass = true;
	} else {
		corPass = false;
		if (passphrase === "") {
			blankPass = true;
		} else {
			blankPass = false;
		}
	}

	notify(corUser, corPass, blankUser, blankPass);
}

function notify(user, pass, noUser, noPass) {
	var login = false;

	if (user) {
		console.log("");
		login = true;
	} else {
		console.log("Username is incorrect");
		if (noUser === true) {
			error.innerHTML = "No username was entered.";
		} else {
			error.innerHTML = "Username is incorrect.";
		}
		login = false;
	}

	if (pass) {
		console.log("");
	} else {
		console.log("Password is incorrect");
		if (user) {
			if (noPass === true) {
				error.innerHTML = "No password was entered.";
			}else{
				error.innerHTML = "Password is incorrect.";
			}
		} else {
			if (noPass === true) {
				if (noUser === true) {
					error.innerHTML = "Nothing was entered.";
				} else {
					error.innerHTML = "Username is incorrect. No password was entered.";
				}
			} else {
				if (noUser === true) {
					error.innerHTML = "No username was entered.";
				} else {
					error.innerHTML = "Username and password are incorrect.";
				}
			} 
			
		}
		login = false;
	}

	if (login) {
		console.log("Done.");
		document.body.innerHTML = "";
		init();
		renderPage("mainMenu");
	}
}

function loginPage() {
	document.body.querySelector(".button").addEventListener("click", function() {
		var inputName = document.getElementById("inputName").value;
		var inputPass = document.getElementById("inputPass").value;
		if (inputVal(inputName) && inputVal(inputPass)) {
			submit(inputName, inputPass);
		} else {
			if (!inputVal(inputName) && inputVal(inputPass)) {
				console.log("Diagnosis: No username entered.");
				error.innerHTML = "Enter username.";
			} else if (inputVal(inputName) && !inputVal(inputPass)) {
				console.log("Diagnosis: No password entered.");
				error.innerHTML = "Enter password.";
			} else {
				console.log("Diagnosis: No username or password entered.");
				error.innerHTML = "Enter username and password.";
			}
		}
	});
}

function inputVal(inputEle) {
	if (inputEle.value !== "") {
		return true;
	} else {
		return false;
	}
}

function renderPage(page) {
	if (page === "mainMenu") {
		mainMenu();
	} else if (page === "gradeView") {
		gradeView();
	} else if (page === "addGrade") {
		addGrade();
	} else if (page === "loginPage") {
		loginPage();
	}
}

app();