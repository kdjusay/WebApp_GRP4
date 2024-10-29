var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

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

