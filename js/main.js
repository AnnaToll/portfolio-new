let darkBackgroundDiv = document.getElementById('darken-background-fullwidth');
let nav = document.querySelector('header');
let meritsArr = document.querySelectorAll('#container-merits > div');

for (let merit of meritsArr) {
    let hiddenElements = document.getElementById('hidden-elements-container');
    merit.addEventListener('click', (e) => {
        e.preventDefault();
        merit.classList.add('merits-mouseover');
        for (let element of hiddenElements.children) {
            if (merit.children[2].firstElementChild.innerText.toLowerCase().trim() == element.firstElementChild.innerText.toLowerCase().trim()) {
                darkBackgroundDiv.innerHTML = `
                    <div class="merits-popup-container">
                        ${element.innerHTML}
                    </div>
                `;
                $("#darken-background-fullwidth").fadeIn(300); 
                darkBackgroundDiv.style.display = 'grid';
            }
        }
    })
    merit.addEventListener('mouseover', () => {
        merit.classList.add('merits-mouseover');
        merit.addEventListener('mouseout', () => {
            if (darkBackgroundDiv.style.display != 'grid') {
                merit.classList.remove('merits-mouseover');
            }
        })

    })
    darkBackgroundDiv.addEventListener('click', () => {
        $("#darken-background-fullwidth").fadeOut(300);
        merit.classList.remove('merits-mouseover');
    })
}

/* darkBackgroundDiv.addEventListener('click', () => {
    $("#darken-background-fullwidth").fadeOut(300); 
}) */
/* let logo = document.querySelector('header > a');
logo.addEventListener('click', (e) => {
    e.preventDefault();
    let className = document.body.getAttribute("class");
    if(className == "menystangd") {
        document.body.className = "menyoppen";

        setTimeout(function() { 
            alert("Hello"); 
        }, 300);
    }
    else {
        document.body.className = "menystangd";
    }
  }) */

let logo = document.querySelector('header > a');
logo.addEventListener('click', () => {
    let className = document.body.getAttribute("class");
    if(className == "menystangd") {
        document.body.className = "menyoppen";
    }
    else {
        document.body.className = "menystangd";
    }
  })

/* let logo = document.querySelector('header > a');
console.log(logo);
logo.addEventListener('click', () => {
    let sidebar = document.querySelector('aside');
    console.log(sidebar)
    // $("aside").hide('slide', {direction: 'right'}, 1000);
    $("aside").animate({right: '250px'});
}) */


function openCloseSidebar() {
    let sidebar = document.querySelector('aside');
    console.log(sidebar);
}


window.onscroll = () => {
    let homeText = document.querySelector('#main-home-container > div > p');
    let homeTextToTop = homeText.getBoundingClientRect().top + window.scrollY;
    let scrollDownBtn = document.getElementById('btn-scroll-down');

    if (window.scrollY > homeTextToTop) {
        document.body.classList.add('scrolled-down');
        scrollDownBtn.href = '#main-home-container';

    } else {
        document.body.classList.remove('scrolled-down');
        scrollDownBtn.href = '#main-portfolio';
    }
};