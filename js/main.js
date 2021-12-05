if (window.innerWidth <= 850) {
    document.body.classList.add('menystangd');
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 800 && isSidebarClicked == 'no' ) {
        document.body.classList.add('menystangd');
    }
})

let darkBackgroundDiv = document.getElementById('darken-background-fullwidth');
let nav = document.querySelector('header');
let meritsArr = document.querySelectorAll('#container-merits > div');
let isSidebarClicked = 'no';

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

let logo = document.querySelector('header > a');
let sidebar = document.querySelector('aside');

let meritsBtn = document.getElementById('close-cv-btn');

meritsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isSidebarClicked = 'yes';
    document.body.classList.toggle('menystangd');
})

window.onscroll = () => {
    let homeText = document.querySelector('#main-home-container > div > p');
    let homeTextToTop = homeText.getBoundingClientRect().top + window.scrollY;
    let scrollDownBtn = document.querySelector('.btn-scroll-down');

    if (window.scrollY > homeTextToTop) {
        scrollDownBtn.classList.add('scrolled-down');
        scrollDownBtn.href = '#main-home-container';

    } else {
        scrollDownBtn.classList.remove('scrolled-down');
        scrollDownBtn.href = '#main-portfolio';
    }
};