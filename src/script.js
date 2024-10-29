const login = document.getElementById("loginForm");

login.addEventListener("submit", function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password")

    const email = emailInput.value;
    const password = passInput.value;

    console.log(email + "   " + password);

    if (email == "admin@admin.com" && password == "admin") {
        window.location.href = "dashboard.html";
    } else {
        alert("Why is it wrong");
    }


});

