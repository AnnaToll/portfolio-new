let darkBackgroundDiv = document.getElementById('darken-background-fullwidth');
let nav = document.querySelector('header');
let meritsArr = document.querySelectorAll('#container-merits > div');

for (let merit of meritsArr) {
    let hiddenElements = document.getElementById('hidden-elements-container');
    merit.addEventListener('click', () => {
        for (let element of hiddenElements.children) {
            console.log(element.firstElementChild.innerText.toLowerCase().trim());
            if (merit.children[2].firstElementChild.innerText.toLowerCase().trim() == element.firstElementChild.innerText.toLowerCase().trim()) {
                darkBackgroundDiv.innerHTML = `
                    <div class="merits-popup-container">
                        ${element.innerHTML}
                    </div>
                `;
                $("#darken-background-fullwidth").fadeIn(350); 
                darkBackgroundDiv.style.display = 'grid';
            }
        }

    })
}

darkBackgroundDiv.addEventListener('click', () => {
    $("#darken-background-fullwidth").fadeOut(300); 
})



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