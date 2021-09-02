const d = document;

window.addEventListener('DOMContentLoaded', () => {

    //sliders

    const firstScreenSlider = new Swiper(".main-slider", {
        speed: 1000,
        pagination: {
          el: ".main-slider__pagination",
        },
        slidesPerView: 1,
        lazy: true,
        autoplay: {
            delay: 4000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          },
        effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
      });

      const popupSlider = new Swiper(".popup__slider", {
        navigation: {
            nextEl: '.popup__next',
            prevEl: '.popup__prev',
          },
          slidesPerView: 1,
          spaceBetween: 50,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
        });


    function togglePopup(){

        const popupTriggers = d.querySelectorAll('.assistant__btn');
        const popup = d.querySelector('.popup');
        const popupCloseBtn = d.querySelector('.popup__close-btn');

        const header = d.querySelector('.header');
       
        if (popupTriggers) {

            popupTriggers.forEach(( trigger ) => {

                trigger.addEventListener('click', () => {

                    header.style.top = `-${header.offsetHeight}px`;
                    popup.classList.add('opened');
                    d.body.classList.toggle('noscroll');

                })

            })

            popupCloseBtn.addEventListener('click', () => {
                popup.classList.remove('opened');
                d.body.classList.toggle('noscroll');
            })

            popup.addEventListener('click', function(e){

                if(e.target == popup) {
                    popup.classList.remove('opened');
                    d.body.classList.toggle('noscroll');
                }

            })
        }
     
    }

    togglePopup();


    function sendRequest(method, url, body = null) {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            xhr.responseType = 'json'
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => {

                if (xhr.status >= 400) {
                    reject(xhr.response)
                } else {
                    resolve(xhr.response);
                }

            }

            xhr.onerror = () => {
                reject(xhr.response);
            }

            xhr.send(JSON.stringify(body));

        })

    }

    //

    function formValidation(name, email, checkbox) {

        let error = false;

        name.parentElement.classList.remove('_error');
        email.parentElement.classList.remove('_error');
        checkbox.nextElementSibling.classList.remove('_error');

        if (name.value === '') {
            name.parentElement.classList.add('_error')
            error = true;

        } else if (email.value === '') {
            email.parentElement.classList.add('_error');
            error = true;
        } else if (!checkbox.checked) {

            checkbox.nextElementSibling.classList.add('_error');
            error = true;
        }


        return error;
    }

    function toggleCheckbox(){

        const checkboxes = d.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach((checkbox) => {

            checkbox.addEventListener('click', function() {
                checkbox.toggleAttribute('checked');
            })

        })

    }

    toggleCheckbox();

    function sendPopupForm(name, phone, email, text, checkbox, assistance) {

        let error = formValidation(name, email, checkbox);         

        if (error === false) {

            //тестовый урл
            const requestURL = "https://jsonplaceholder.typicode.com/users";


            const requestBody = {

                name: name.value,
                phone: phone.value,
                e_mail: email.value,
                question: text.value,
                specialist: assistance,

            }

            sendRequest("POST", requestURL, requestBody).then();

            name.value = '';
            phone.value = '';
            text.value = '';
            email.value = '';
    
    }

}



function popupForm() {

    const form = d.querySelector('.popup-form');
    const submit = d.querySelector('.popup-form__btn');

    if(form) {

        const name = form.querySelector('input[name="name"]');
        const phone = form.querySelector('input[name="phone"]');
        const email = form.querySelector('input[name="e_mail"]');
        const text = form.querySelector('textarea');
        const checkbox = form.querySelector('input[type="checkbox"]');

        submit.addEventListener('click', function() {

            const assistance = getAssistantName();
            sendPopupForm(name, phone, email, text, checkbox, assistance);

        })

        phone.oninput = function () {
            const regex = /[a-z]/g;
            this.value = this.value.replace(regex, '');
        }

    }

}

function getAssistantName(){
  
    const slides = d.querySelectorAll('.popup__slide');
    let assistantName = null;

    slides.forEach(( slide ) => {

        if (slide.classList.contains('swiper-slide-active')) {
     
            assistantName = slide.querySelector('.assistant__name').textContent;

        }

    })

    return assistantName;

}

popupForm();



    function appearAnimation(){
 
        const hiddenBlocks = d.querySelectorAll('.appear-animation');

        hiddenBlocks.forEach(( block ) => {

            if (block) {

                window.addEventListener('scroll', () => {

                    const scrollTop = window.pageYOffset;
                    const blockIntoView = block.offsetTop - window.innerHeight/2;


                    if(scrollTop > blockIntoView) {
                        block.style.opacity = '1'
                    }

                })

            }

        })
    }

    appearAnimation()

    function cardCounter(){

        const cards = d.querySelectorAll('.card');

        if (cards) {

            const cardsArr = Array.from( cards )

            cardsArr.forEach(( card ) => {

                const cardCount = card.querySelector('.card__count');
                cardCount.textContent = '0' + (cardsArr.indexOf( card ) + 1);

            })

        }
    }

    cardCounter();



    function headerSearch(){

        const triggerBtn = d.querySelector('.search-trigger-js');
        const seacrhInput = d.querySelector('.header__input-wrap');
        const closeBtn = d.querySelector('.header__input-close');
        
        triggerBtn.addEventListener('click', () => {
            seacrhInput.classList.add('active')
        })    

        closeBtn.addEventListener('click', () => {
            seacrhInput.classList.remove('active')
        })

    }

    headerSearch();

    function clearSearch(){
        const searchFields = d.querySelectorAll('input[type=search]');
        
        searchFields.forEach(( search ) => {
            search.addEventListener('blur', function(){
                this.value = '';
            })
        })
    }

    clearSearch();

    function stickyHeader(){
        
        const header = d.querySelector('.header');
        const partToHide = d.querySelector('.header__static').offsetHeight;
        const bottomPart = d.querySelector('.header__sticky');
        const seacrhInput = d.querySelector('.header__input-wrap');

        const sideMenu = d.querySelector('.mobile-nav');
        
        let lastScrollPos = 0;

        window.addEventListener('scroll', ()=> {

            seacrhInput.classList.remove('active')

            let scrollingTop = window.pageYOffset;

            if(scrollingTop > lastScrollPos) {

                header.style.top = `-${header.offsetHeight}px`;

            } else {

                header.style.top =  `-${partToHide}px`;
            }


            if(scrollingTop === 0) {
                sideMenu.style.top = `${header.offsetHeight}px`;

                if(window.innerHeight < 700) {
                    sideMenu.style.height = '85vh';
                }
                
            } else {
                sideMenu.style.top = `${bottomPart.offsetHeight}px`;
                sideMenu.style.height = '100vh';
            }


            lastScrollPos = scrollingTop;

        })

        toggleHeaderTopPart( header );
    }


    function toggleHeaderTopPart(header){

        const triggerBtn = d.querySelector('.search-trigger-js');

        triggerBtn.addEventListener('click', () => {

            if(window.innerWidth >= 601) {

                header.style.top = `-2px`;

            }        

        })

    }

    stickyHeader();

    function toggleSideMenu(){

            const burger = d.querySelector('.burger');
            const sideMenu = d.querySelector('.mobile-nav');

            burger.addEventListener('click', function(){

                sideMenu.classList.toggle('active');
                this.classList.toggle('active');
                d.body.classList.toggle('noscroll');

            })

    }

    if(window.innerWidth <= 1400) {
        toggleSideMenu();
    }


})