var nameInp = document.getElementById("name");
var emailInp = document.getElementById("email");
var passwordInp = document.getElementById("password");
var allInps = document.querySelectorAll(".inputBox");


var alertAll = document.getElementById("alertAll");
var alertIncorrect = document.getElementById("alertIncorrect");
var alertCorrect = document.getElementById("alertCorrect");
var alertEmailExist = document.getElementById("alertEmailExist");

var loginBtn = document.getElementById("loginBtn");
var signUpBtn = document.getElementById("SignUpBtn");

var haveAccount = document.getElementById("haveAccount");
var makeAccount = document.getElementById("makeAccount");

var signInLink = document.getElementById("signInLink");
var signUpLink = document.getElementById("signUpLink");

var loginBox = document.getElementById("loginBox");


var usersList;
var userIndex;


if (localStorage.getItem("usersData") == null) {
    
    usersList = [];
}
else {
    usersList = JSON.parse(localStorage.getItem("usersData"));
}


if (location.href.includes("home.html")) {
    
    var welcomeUser = document.getElementById("welcomeUser");
    var nameOfTheWelcomedUser = document.getElementById("userName");
    var logoutBtn = document.getElementById("logoutBtn");
    
    userIndex = localStorage.getItem("indexOfWelcomedUser");

    console.log(userIndex);
    nameOfTheWelcomedUser.innerHTML = usersList[userIndex].name;



    logoutBtn.addEventListener("click", function () {
        location.replace("index.html");
    })


}
else if (location.href.includes("index.html")) {

    // to keep the text that user write with same color
    for (var i = 0; i < allInps.length; i++) {
        allInps[i].addEventListener("blur", function (e) {
            // e.target.classList.add("hasText");
            e.target.style.color = "white";
        })
    }

    signUpLink.addEventListener("click", function () {
        location.href = "signUp.html";

        alertAll.classList.add("d-none");
        alertEmailExist.classList.add("d-none");
        alertCorrect.classList.add("d-none");

        clearForm();
    });



    function loginValidation() {
        if (emailInp.value != "" && passwordInp.value != "") {
            if (emailExistanceValidationLogin() && passwordExistanceValidationLogin()) {

                location.href = "home.html";

                console.log(usersList[userIndex].name);

                alertCorrect.classList.remove("d-none");
                alertAll.classList.add("d-none");
                // alertEmailExist.classList.add("d-none");
                alertIncorrect.classList.add("d-none");
                clearForm();
            }
            else {
                alertCorrect.classList.add("d-none");
                alertAll.classList.add("d-none");
                // alertEmailExist.classList.add("d-none");
                alertIncorrect.classList.remove("d-none");

            }
        }
        else {
            alertAll.classList.remove("d-none");
            alertCorrect.classList.add("d-none");
            // alertEmailExist.classList.add("d-none");
            alertIncorrect.classList.add("d-none");
        }
    }

    function emailExistanceValidationLogin() {
        uEmail = emailInp.value;
        for (var i = 0; i < usersList.length; i++) {
            if (usersList[i].email == uEmail) {
                userIndex = i;
                localStorage.setItem("indexOfWelcomedUser", userIndex);
                return true;
            }
        }
        return false;
    }


    function passwordExistanceValidationLogin() {
        uPassword = passwordInp.value;
        for (var i = 0; i < usersList.length; i++) {
            if (usersList[i].password == uPassword) {
                return true;
            }
        }
        return false;
    }


    loginBtn.addEventListener("click", loginValidation);

    function clearForm() {
        nameInp.value = "";
        emailInp.value = "";
        passwordInp.value = "";
    }
}
else if (location.href.includes("signUp.html")) {

    // to keep the text that user write with same color
    for (var i = 0; i < allInps.length; i++) {
        allInps[i].addEventListener("blur", function (e) {
            // e.target.classList.add("hasText");
            e.target.style.color = "white";
        })
    }

    signInLink.addEventListener("click", function () {
        location.href = "index.html";

        alertAll.classList.add("d-none");
        alertEmailExist.classList.add("d-none");
        alertCorrect.classList.add("d-none");

        clearForm();
    });

    function addUser() {
        if (nameInp.value != "" && emailInp.value != "" && password.value != "") {
            if (emailExistanceValidationSignUp()) {
                var user = {
                    name: nameInp.value,
                    email: emailInp.value,
                    password: passwordInp.value
                };

                usersList.push(user);

                localStorage.setItem("usersData", JSON.stringify(usersList));

                console.log(usersList);

                alertCorrect.classList.remove("d-none");
                alertAll.classList.add("d-none");
                alertEmailExist.classList.add("d-none");

                clearForm();
            }
            else {
                alertCorrect.classList.add("d-none");
                alertAll.classList.add("d-none");
                alertEmailExist.classList.remove("d-none");
            }
        }
        else {
            alertAll.classList.remove("d-none");
            alertCorrect.classList.add("d-none");
            alertEmailExist.classList.add("d-none");

        }
    }

    signUpBtn.addEventListener("click", addUser);

    function emailExistanceValidationSignUp() {
        uEmail = emailInp.value;
        for (var i = 0; i < usersList.length; i++) {
            if (usersList[i].email == uEmail) {
                return false;
            }
        }
        return true;
    }

    function clearForm() {
        nameInp.value = "";
        emailInp.value = "";
        passwordInp.value = "";
    }
}
