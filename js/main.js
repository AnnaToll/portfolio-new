let darkBackgroundAside = createDarkBackground(12, 'aside'),
    darkBackgroundPopup = createDarkBackground(20, 'popup'),
    darkBackgroundPortfolio = createDarkBackground(20, 'portfolio'),
    isSidebarClicked = 'no',
    nav = document.querySelector('header'),
    portfolioArr = document.querySelectorAll('#portfolio-objects-container > section')
    meritsArr = document.querySelectorAll('#container-merits > div');

function createDarkBackground(zIndex, uniqueId) {
    let div = document.createElement('div');
    div.classList.add('darken-background-fullwidth');
    div.style.cssText = `z-index: ${zIndex};`;
    div.id = `dark-background-${uniqueId}`;
    return div;
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 850 && isSidebarClicked == 'no' ) {
        document.body.classList.add('menystangd');
    }
})

for (let portfolioObject of portfolioArr) {

    console.log(portfolioObject);

    portfolioObject.addEventListener('click', () => {

        document.body.append(darkBackgroundPortfolio);
        
        darkBackgroundPortfolio.innerHTML = `
            <div class="shows-when-clicked-active">
                ${portfolioObject.lastElementChild.innerHTML}
            </div>
        `;
        $("#dark-background-portfolio").fadeIn(300);
        darkBackgroundPortfolio.style.cssText += `display: grid;`;
    })

    darkBackgroundPortfolio.addEventListener('click', function() {
        $(this).fadeOut(300);
    }) 
}


for (let merit of meritsArr) {

    let hiddenElements = document.getElementById('hidden-elements-container');

    merit.addEventListener('click', (e) => {
        e.preventDefault();

        document.body.append(darkBackgroundPopup);

        merit.classList.toggle('merits-active');

        for (let element of hiddenElements.children) {
            if (merit.children[2].firstElementChild.innerText.toLowerCase().trim() == element.firstElementChild.innerText.toLowerCase().trim()) {
                darkBackgroundPopup.innerHTML = `
                    <div class="merits-popup-container">
                        ${element.innerHTML}
                    </div>
                `;
                $("#dark-background-popup").fadeToggle(300);
                darkBackgroundPopup.style.cssText += `display: grid;`;
            }
        }
    })
    
    darkBackgroundPopup.addEventListener('click', function() {
        $(this).fadeOut(300);
        merit.classList.remove('merits-active');
    }) 
}


let logo = document.querySelector('header > a');
let sidebar = document.querySelector('aside');
let sidebarBtn = document.getElementById('close-cv-btn');

darkBackgroundAside.addEventListener('click', () => {
    document.body.classList.add('menystangd');
    $("#dark-background-aside").fadeOut(300);

})

sidebarBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.append(darkBackgroundAside);
    isSidebarClicked = 'yes';
    document.body.classList.toggle('menystangd');
    if (document.body.getAttribute('class') == '' && window.innerWidth <= 850) {
        $("#dark-background-aside").fadeIn(300);
    } else if (document.body.getAttribute('class') == 'menystangd' && window.innerWidth <= 850) {
        $("#dark-background-aside").fadeOut(300);
    }
    

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

let hamburgerMenuBtn = document.querySelector('nav .bi-list');
let header = document.querySelector('header');
hamburgerMenuBtn.addEventListener('click', () => {
    header.classList.toggle('hamburger-menu-clicked')
})

document.querySelector('#mobile-nav-dark-background').addEventListener('click', () => {
    header.classList.toggle('hamburger-menu-clicked');
})