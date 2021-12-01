let darkBackgroundDiv = document.getElementById('darken-background-fullwidth');
let nav = document.querySelector('header');

nav.addEventListener('click', darkenBackground);

function darkenBackground() {
    if (darkBackgroundDiv.style.display == 'block') {
        $("#darken-background-fullwidth").fadeOut(500);   
    } else {
        $("#darken-background-fullwidth").fadeIn(500); 
    }
}

function openCloseSidebar() {
    let className = document.body.getAttribute("class");
    if(className == "menyoppen") {
        document.body.className = "menystangd";
    }
    else {
        document.body.className = "menyoppen";
    }
  }