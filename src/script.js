function myFunction() {
  document.getElementById("theFrame").src = "/src/navbar/documents.html";
}

function toggleContent(button) {
  const contentId = button.getAttribute('data-target');
  const content = document.getElementById(contentId);
  button.classList.toggle('active');
  content.classList.toggle('active');
}

const coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click",   
 function() {
    toggleContent(this);
  });
}

