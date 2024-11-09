const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      const iframe = document.getElementById('theFrame');
      if (iframe) {
        iframe.addEventListener('load', updateAnchorClass);
        updateAnchorClass();
        observer.disconnect(); // Stop observing after the iframe is found
      }
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });

function updateAnchorClass() {
  const iframe = document.getElementById("theFrame");
  const currentSrc = iframe.src;

  const anchors = document.querySelectorAll("a[target='theFrame']");
  anchors.forEach(anchor => {
    if (anchor.href === currentSrc) {
      anchor.classList.add("border");
    } else {
      anchor.classList.remove("border");
    }
  });
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

