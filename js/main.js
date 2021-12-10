let isSidebarClicked = 'no';


responsiveCloseOpenSidebar();

addFunctionsToNavLinks();

openCloseSidebar();

popupSidebarMerits();

copyNumberToClipboard();

changeArrowBtnOnScroll();


function responsiveCloseOpenSidebar() {
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 850 && isSidebarClicked == 'no' )
            document.body.classList.add('menystangd');

        if (window.innerWidth > 850 && isSidebarClicked == 'no' )
            document.body.classList.remove('menystangd');
    })
}


function createDarkBackground(zIndex, uniqueId) {
    const div = document.createElement('div');
    div.classList.add('darken-background-fullwidth');
    div.style.cssText = `z-index: ${zIndex};`;
    div.id = `dark-background-${uniqueId}`;
    return div;
}


function addFunctionsToNavLinks() {
    const mainContentContainer = document.querySelector('#main-home-container > div');
    const darkBackground = document.querySelector('#mobile-nav-dark-background');
    const header = document.querySelector('header');
    const portfolioBtn = document.getElementById('portfolio-button');

    addContentToMain('home');
    addContentToMain('contact');
    addContentToMain('about');
    navSmallScreens();

    function addContentToMain(section) {
        let chosenBtn = document.getElementById(`${section}-button`);
        let content = document.getElementById(`${section}-content`);
        
        chosenBtn.addEventListener('click', () => {
            mainContentContainer.innerHTML = content.innerHTML;

            addRemoveSelectedClass(chosenBtn);

            if (header.classList.contains('hamburger-menu-clicked')) {
                header.classList.toggle('hamburger-menu-clicked');
            }
        })
    }

    portfolioBtn.addEventListener('click', () => {
        if (header.classList.contains('hamburger-menu-clicked')) {
            header.classList.toggle('hamburger-menu-clicked');
        }
    })


    function addRemoveSelectedClass(chosenBtn) {
        let navBtns = chosenBtn.parentElement.children;

        for (let btn of navBtns) {
            if (btn.classList.contains('selected')) 
                btn.classList.remove('selected');
            
        }

        chosenBtn.classList.add('selected');
    }

    function navSmallScreens() {
    
        const hamburgerMenuBtn = document.querySelector('nav .bi-list');
    
        hamburgerMenuBtn.addEventListener('click', () => {
            header.classList.toggle('hamburger-menu-clicked');
        })
        
        darkBackground.addEventListener('click', () => {
            header.classList.toggle('hamburger-menu-clicked');
        })
    }
}




function popupSidebarMerits() {
    let meritsArr = document.querySelectorAll('#container-merits > div');
    const hiddenElements = document.getElementById('hidden-elements-container');
    const darkBackgroundPopup = createDarkBackground(20, 'popup');

    for (let merit of meritsArr) {
     
        merit.addEventListener('click', (e) => {
            
            e.preventDefault();
            document.body.append(darkBackgroundPopup);
            merit.classList.toggle('merits-active');
            addContentMeritsPopup();
    
        })
        
        function addContentMeritsPopup() {

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
        }
        
        darkBackgroundPopup.addEventListener('click', function() {
            $(this).fadeOut(300);
            merit.classList.remove('merits-active');
        }) 
    }
}


function openCloseSidebar() {

    const darkBackgroundAside = createDarkBackground(12, 'aside');
    const sidebarBtn = document.getElementById('close-cv-btn');

    sidebarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isSidebarClicked = 'yes';
        document.body.classList.toggle('menystangd');

        addDarkBackgroundSmallScreens();
        
    })

    function addDarkBackgroundSmallScreens() {

        if (document.body.getAttribute('class') == '' && window.innerWidth <= 850) {
            document.body.append(darkBackgroundAside);
            $("#dark-background-aside").fadeIn(300);
        }
        else if (document.body.getAttribute('class') == 'menystangd' && window.innerWidth <= 850)
            $("#dark-background-aside").fadeOut(300);

        darkBackgroundAside.addEventListener('click', () => {
            document.body.classList.add('menystangd');
            $("#dark-background-aside").fadeOut(300);
            
        })
    }

}

function copyNumberToClipboard() {
    const phoneNumber = '+46733929285';
    const phoneBtn = document.querySelector('.bi-phone');

    

    function textToClipboard (text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert(`Copied ${dummy.value} to clipboard`);
    }

    phoneBtn.addEventListener('click', () => {
        textToClipboard('+46733929285');
        console.log('klick');
    })
/*     phoneBtn.addEventListener('click', () => {
        phoneNumber.select();
        document.execCommand("copy");
        console.log('klick');
    }) */

}


function changeArrowBtnOnScroll() {
    
    let homeTextToTop = document.querySelector('#main-home-container > div > p').getBoundingClientRect().top + window.scrollY;
    const arrowBtn = document.querySelector('.btn-scroll-down');

    window.onscroll = () => {
    
        if (window.scrollY > homeTextToTop) {
            arrowBtn.classList.add('scrolled-down');
            arrowBtn.href = '#main-home-container';
    
        } else {
            arrowBtn.classList.remove('scrolled-down');
            arrowBtn.href = '#main-portfolio';
        }
    };
}


let portfolioObject = {

    dark_background_portfolio : createDarkBackground(20, 'portfolio'),
    container : document.getElementById('portfolio-objects-container'),
    containerCopy : '',
    filter: document.getElementById('filtratePortfolioBtnContainer'),
    tags_arr : [],

    setUp : function() {
        this.containerCopy = this.container.cloneNode(true);
        this.filterBtnsClick();
        this.portfolioObjectsClick();
    },

    logs : function(toLog) {
        console.log(toLog);
    },

    filterBtnsClick : function() {
        for (let btn of this.filter.children) {

            btn.addEventListener('click', () => {

                if (btn.innerHTML.includes('bi-x')) {

                    btnIndex = this.tags_arr.indexOf(btn.innerText);
                    this.tags_arr.splice(btnIndex, 1);

                    btn.innerHTML = btn.innerHTML.replace('<i class="bi bi-x"></i>', '');

                    this.addPortfolioObjects();
                    btn.classList.remove('selected-filter-btn-portfolio');

                } else {

                    this.tags_arr.push(btn.innerHTML);

                    btn.innerHTML += '<i class="bi bi-x"></i>';
                    
                    this.addPortfolioObjects();
                    btn.classList.add('selected-filter-btn-portfolio');
                }
            })

        }
    },

    addPortfolioObjects : function() {
        
        this.container.innerHTML = '';

        for (let portfolioObject of this.containerCopy.children) {

            let tagsInObjectString = portfolioObject.lastElementChild.lastElementChild.innerText.replace(', ', ',').trim();
            let tagsInObjectArr = tagsInObjectString.split(',');

            for (let tag of this.tags_arr) {
                if (tagsInObjectArr.includes(tag)) {
                    this.container.innerHTML += `
                    <section class="square-img-container">
                     ${portfolioObject.innerHTML}
                    </section>
                    `;
                    break;
                }

            }
        }

        if (this.container.innerHTML == '')
            this.container.innerHTML = this.containerCopy.innerHTML;
        
        this.portfolioObjectsClick();

    },

    portfolioObjectsClick : function() {

        let portfolioObjectsArr = document.querySelectorAll('#portfolio-objects-container > section');

        for (let portfolioObject of portfolioObjectsArr) {
    
            portfolioObject.addEventListener('click', () => {
                document.body.append(this.dark_background_portfolio);
                
                this.dark_background_portfolio.innerHTML = `
                    <i class="bi bi-arrow-left-circle-fill"></i>
                    <div class="shows-when-clicked-active">
                        <i class="bi bi-x-lg"></i>
                        ${portfolioObject.lastElementChild.innerHTML}
                    </div>
                    <i class="bi bi-arrow-right-circle-fill"></i>
                `;
                $("#dark-background-portfolio").fadeIn(300);
        
                document.querySelector('.bi-arrow-left-circle-fill').addEventListener('click', () => {
                    if (!portfolioObject.previousElementSibling) return;
                    portfolioObject.previousElementSibling.click();
                })
        
                document.querySelector('.bi-arrow-right-circle-fill').addEventListener('click', () => {
                    if (!portfolioObject.nextElementSibling) return;
                    portfolioObject.nextElementSibling.click();
                })
        
                this.dark_background_portfolio.style.cssText += `display: grid;`;
                document.querySelector('.shows-when-clicked-active .bi-x-lg').addEventListener('click', () => {
                    this.dark_background_portfolio.click();
                })
        
            })
        
            this.dark_background_portfolio.addEventListener('click', function(e) {
                if (e.target !== this) return;
                $(this).fadeOut(300);
            })
        
        }

    }
}

portfolioObject.setUp();