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


function addFunctionsToNavLinks() {
    const mainContentContainer = document.querySelector('#main-home-container > div');
    const darkBackgroundTest = createDarkBackground(5, 'nav');
    const header = document.querySelector('header');
    const portfolioBtn = document.getElementById('portfolio-button');

    addContentToMainClick('home');
    addContentToMainClick('contact');
    addContentToMainClick('about');
    navSmallScreens();
    

    function addContentToMainClick(section) {
        let chosenBtn = document.getElementById(`${section}-button`);
        let content = document.getElementById(`${section}-content`);
        
        chosenBtn.addEventListener('click', () => {
            mainContentContainer.innerHTML = content.innerHTML;

            if (section == 'about')
                document.getElementById('portrait-img').src = 'img/portratt6.png';
            else
                document.getElementById('portrait-img').src = 'img/sitting-window-2.png';

            addRemoveSelectedClass(chosenBtn);
            toggleMobileNavMenu();
        })
    }

    portfolioBtn.addEventListener('click', () => {
        toggleMobileNavMenu();
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
            document.body.append(darkBackgroundTest);
            darkBackgroundTest.style.cssText += ' background-color: rgba(0, 0, 0, 0.85);';
            toggleMobileNavMenu();
        })
        
        darkBackgroundTest.addEventListener('click', () => {
            toggleMobileNavMenu();
        })
    }


    function toggleMobileNavMenu() {
        if (header.classList.contains('hamburger-menu-clicked')) {
            header.classList.remove('hamburger-menu-clicked');
            $("#dark-background-nav").fadeOut(200);
        } else {
            header.classList.add('hamburger-menu-clicked');
            $("#dark-background-nav").fadeIn(200);
        }
    }
}


function openCloseSidebar() {

    const darkBackgroundAside = createDarkBackground(12, 'aside');
    const sidebarBtn = document.querySelector('#close-cv-btn > section');

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


function popupSidebarMerits() {
    let meritsArr = document.querySelectorAll('#container-merits > div');
    const hiddenElements = document.getElementById('hidden-elements-container');
    const darkBackgroundPopup = createDarkBackground(20, 'popup');

    // for (let merit of meritsArr) {
     
    //     merit.addEventListener('click', (e) => {
            
    //         e.preventDefault();
    //         document.body.append(darkBackgroundPopup);
    //         merit.classList.toggle('merits-active');
    //         addContentMeritsPopup();
    
    //     })
        
    //     function addContentMeritsPopup() {

    //         for (let element of hiddenElements.children) {
    //             if (merit.children[2].firstElementChild.innerText.toLowerCase().trim() == element.firstElementChild.innerText.toLowerCase().trim()) {
    //                 darkBackgroundPopup.innerHTML = `
    //                     <div class="merits-popup-container">
    //                         ${element.innerHTML}
    //                     </div>
    //                 `;
    //                 $("#dark-background-popup").fadeToggle(300);
    //                 darkBackgroundPopup.style.cssText += `display: grid;`;
    //             }
    //         }
    //     }
        
    //     darkBackgroundPopup.addEventListener('click', function() {
    //         $(this).fadeOut(300);
    //         merit.classList.remove('merits-active');
    //     }) 
    // }
}


function copyNumberToClipboard() {
    const phoneBtn = document.querySelector('.bi-phone');

    function textToClipboard (text) {
        var dummy = document.createElement("textarea");
        dummy.style.cssText = 'display: none;';
        let messageContainer = document.createElement('div');

        document.body.appendChild(dummy);
        document.body.appendChild(messageContainer);
        
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");

        messageContainer.innerText = `Copied ${dummy.value} to clipboard`;
        document.body.removeChild(dummy);
        messageContainer.classList.add('copy-to-clipboard-message');
        $(".copy-to-clipboard-message").fadeIn(150);

        setTimeout(function(){
            $(".copy-to-clipboard-message").fadeOut(200);
       }, 1700);

    }

    phoneBtn.addEventListener('click', () => {
        textToClipboard('+46733929285');
    })
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



function createDarkBackground(zIndex, uniqueId) {
    const div = document.createElement('div');
    div.classList.add('darken-background-fullwidth');
    div.style.cssText = `z-index: ${zIndex};`;
    div.id = `dark-background-${uniqueId}`;
    return div;
}


let portfolioObject = {

    dark_background_portfolio : createDarkBackground(20, 'portfolio'),
    container : document.getElementById('portfolio-objects-container'),
    containerCopy : '',
    filter: document.getElementById('filtratePortfolioBtnContainer'),
    chosen_tags_arr : [],
    tags_arr : [],

    setUp : function() {
        this.containerCopy = this.container.cloneNode(true);
        this.addTagsToArr();
        this.filterBtnsClick();
        this.portfolioObjectsClick();
    },

    addTagsToArr : function() {
        for (let btn of this.filter.children) {
            this.tags_arr.push({ 
                name: btn.innerHTML,
                active: false
            });
        }
    },

    filterBtnsClick : function() {
        for (let btn of this.filter.children) {

            btn.addEventListener('click', () => {
                this.setSelectedTag(btn);
            })

        }
    },

    setSelectedTag : function(btn) {

        let name = btn.innerText.trim();

        for (let tag of this.tags_arr) {
            if (tag.name === name) {
                tag.active = !tag.active
                if (tag.active) {
                    btn.classList.add('selected-filter-btn-portfolio');
                    btn.innerHTML += ' <i class="bi bi-x"></i>';
                } else {
                    btn.classList.remove('selected-filter-btn-portfolio');
                    btn.innerHTML = btn.innerHTML.replace(' <i class="bi bi-x"></i>', '');
                }

            }
        }
        
        this.addPortfolioObjects();

    },

    addPortfolioObjects : function() {
        
        this.container.innerHTML = '';
        
        for (let portfolioObject of this.containerCopy.children) {
            
            let tagsInObjectString = portfolioObject.lastElementChild.lastElementChild.innerText.trim();
            let tagsInObjectArr = tagsInObjectString.split(',');            
            
            for (let tag of this.tags_arr) {
                if (tagsInObjectArr.includes(tag.name)) {
                    if (tag.active) {
                        this.container.innerHTML += `
                            <section class="square-img-container">
                                ${portfolioObject.innerHTML}
                            </section>
                        `;
                        break;
                    }
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
                    <div class="portfolio-object-popup-content">
                        <div class="arrow-left-portfolio-object">
                            <i class="bi bi-arrow-left-circle-fill"></i>
                        </div>
                        <i class="bi bi-x-lg close-portfolio-btn"></i>
                        ${portfolioObject.lastElementChild.innerHTML}
                        <div class="arrow-right-portfolio-object">
                            <i class="bi bi-arrow-right-circle-fill"></i>
                        </div>
                    </div>
                `;
                $("#dark-background-portfolio").fadeIn(300);

                let popupContainer = document.getElementsByClassName('portfolio-object-popup-content')[0];
                let arrowRight = document.querySelector('.arrow-right-portfolio-object');
                let arrowLeft = document.querySelector('.arrow-left-portfolio-object');
                let closeBtn = document.querySelector('.close-portfolio-btn');

                arrowRight.style.cssText = `right: ${this.fixedIConsPositionSide(popupContainer, 'arrow')}`;
                arrowLeft.style.cssText = `left: ${this.fixedIConsPositionSide(popupContainer, 'arrow')}`;
                closeBtn.style.cssText = `left: ${this.fixedIConsPositionSide(popupContainer, 'close')}`;

                window.addEventListener('resize', () => {
                    arrowRight.style.cssText = `right: ${this.fixedIConsPositionSide(popupContainer, 'arrow')}`;
                    arrowLeft.style.cssText = `left: ${this.fixedIConsPositionSide(popupContainer, 'arrow')}`;
                    closeBtn.style.cssText = `left: ${this.fixedIConsPositionSide(popupContainer, 'close')}`;
                })
        
                arrowLeft.addEventListener('click', () => {
                    if (!portfolioObject.previousElementSibling) return;
                    portfolioObject.previousElementSibling.click();
                })
        
                arrowRight.addEventListener('click', () => {
                    if (!portfolioObject.nextElementSibling) return;
                    portfolioObject.nextElementSibling.click();
                })
        
                this.dark_background_portfolio.style.cssText += `display: grid;`;
                document.querySelector('.portfolio-object-popup-content .bi-x-lg').addEventListener('click', () => {
                    this.dark_background_portfolio.click();
                })
        
            })
        
            this.dark_background_portfolio.addEventListener('click', function(e) {
                if (e.target !== this) return;
                $(this).fadeOut(300);
            })        
        }

    },


    fixedIConsPositionSide : function(popupContainer, arrowOrCLose) {
        let viewportWidth = window.innerWidth;
        let portfolioPopupWidth = popupContainer.offsetWidth;
        if (arrowOrCLose == 'arrow') {
            if (window.innerWidth <= 1100)
                return `calc(${(viewportWidth - portfolioPopupWidth) / 2 - 20}px + 5.5vw);`;
            else
                return `calc(${(viewportWidth - portfolioPopupWidth) / 2 - 20}px + 65px);`;   
        }
        if(arrowOrCLose == 'close')
            return `${(viewportWidth - portfolioPopupWidth) / 2 + 15}px;`;
    }
}

portfolioObject.setUp();