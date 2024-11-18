const mathLinks = document.querySelectorAll('a[id^="subjectB"]');

mathLinks.forEach(link => {
  link.addEventListener('click', () => {

    // Remove the "border" class from all links
    mathLinks.forEach(link => link.classList.remove('sideBarBorder'));

    link.classList.add('sideBarBorder');
  });
});

function updateall(fname, lname, email, pass) {

  const fnamePlaceholder = document.getElementById(fname);
  const lnamePlaceholder = document.getElementById(lname);
  const emailPlaceholder = document.getElementById(email);
  const passPlaceholder = document.getElementById(pass);

  const fvalue = fnamePlaceholder.value;
  const lvalue = lnamePlaceholder.value;
  const evalue = emailPlaceholder.value;
  const pvalue = passPlaceholder.value;

  fnamePlaceholder.placeholder = fvalue;
  lnamePlaceholder.placeholder = lvalue;
  emailPlaceholder.placeholder = evalue;
  passPlaceholder.placeholder = pvalue;

  fnamePlaceholder.value = "";
  lnamePlaceholder.value = "";
  emailPlaceholder.value = "";
  passPlaceholder.value = "";

}

function todocuments() {
document.getElementById("theFrame").src = "/src/navbar/documents.html";
}

function totranscript() {
document.getElementById("theFrame").src = "/src/navbar/transcript.html";
}
function tocourses() {
document.getElementById("theFrame").src = "/src/navbar/courses.html";
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

