const login = document.getElementById("loginForm");

  login.addEventListener("submit", function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password")

    const email = emailInput.value;
    const password = passInput.value;

    console.log(email + "   " + password);

    if (email == "student@learnv.com" && password == "student") {
        window.location.href = "dashboard.html";
    } else {
        alert("Wrong user Credentials");
    }


});