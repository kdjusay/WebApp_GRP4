const mathLinks = document.querySelectorAll('a[id^="subjectB"]');

mathLinks.forEach(link => {
  link.addEventListener('click', () => {

    // Remove the "border" class from all links
    mathLinks.forEach(link => link.classList.remove('sideBarBorder'));

    link.classList.add('sideBarBorder');
  });
});

  const fName = document.getElementsByName('fname')
  const LName = document.getElementById('last_name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const daButton = document.getElementById('updateButton');


  daButton.addEventListener('click', () => {
    updatePlaceholder('fname', 'yay text')
  })

  function updatePlaceholder() {
    const inputelement = document.getElementById('inputId');
    inputelement.setAttribute('ariaPlaceholder', 'New textttt');
  }


function todocuments() {
document.getElementById("theFrame").src = "/src/navbar/documents.html";
}

function totranscript() {
document.getElementById("theFrame").src = "/src/navbar/transcript.html";
}

function toaccount(){
  document.getElementById("theFrame").src = "/src/navbar/account.html";
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

