;(function(speed) {
    const FRAME_SPEED = speed;
    const FRAME_TIME = 20;

    const sliderWidth = document.querySelector(".slider-wrap").offsetWidth;

    const sliderTrack = document.querySelector(".slider-track");

    const slides = document.querySelectorAll(".slider-wrap .slide");
    let countSlides = slides.length;

    renderSliderDots();
    function renderSliderDots(){
        const sliderNav = document.querySelector(".slider-nav");
        for(let i = 1; i <= countSlides; i++) {
            let active = (i == 1) ? 'active-item' : '';
            sliderNav.innerHTML += `<li class="slider-nav-item ${active}" data-item-index="${i}"><button class="slider-nav-item-btn">${i}</button></li>`;   
        }
    }

    renderVirtualFirstSlide()
    function renderVirtualFirstSlide(){
        const newFirstSlide =  cloneSlide(countSlides-1, slides);
        newFirstSlide.dataset.slideIndex = 0;
        sliderTrack.prepend(newFirstSlide);  
    }
    countSlides++;

    renderVirtualLastSlide()
    function renderVirtualLastSlide() {
        const newLastSlide =  cloneSlide(0, slides);  
        deleteClassName(newLastSlide, "active");
        newLastSlide.dataset.slideIndex = countSlides-1;
        sliderTrack.appendChild(newLastSlide);   
    }
    countSlides++;

    function cloneSlide(indexSlide, allSlides) {
        const newSlide = allSlides[indexSlide].cloneNode(true);
        newSlide.classList.add("clone");
        return newSlide;
    }
    function deleteClassName(slide, clsName){
        if (slide.classList.contains(clsName)) {
            slide.classList.remove(clsName);
        }                
    }
    function findDeleteCLassName(slides, clsName) {
        for (let slide of slides) {
            deleteClassName(slide, clsName);
        }
    }

    const sliderTrackWidth = sliderWidth * countSlides;
    sliderTrack.style.width = sliderTrackWidth + 'px';


    const dotsSlider = document.querySelectorAll(".slider-nav-item");


    let frame = -sliderWidth;
    sliderTrack.style.transform = 'translate3d(' + frame + 'px, 0px, 0px)';

    let currentSlide = 1;

    function animationPrev(btn, funcName, stopFrame='-') {  
        const stop = (stopFrame == '-') ? frame + sliderWidth : stopFrame;
        const animation = setInterval(function() {  
            btn.removeEventListener('click', funcName);
            sliderTrack.style.transform = 'translate3d(' + frame + 'px, 0px, 0px)';
            if (frame >= stop) {
                clearInterval(animation);
                btn.addEventListener('click', funcName);
                return;
            }   
            frame += FRAME_SPEED;
        }, FRAME_TIME);
    }

    function animationNext(btn, funcName, stopFrame = '-') {        
        const stop = (stopFrame == '-') ? frame - sliderWidth : stopFrame;
        const animation = setInterval(function() { 
            btn.removeEventListener('click', funcName); 
            sliderTrack.style.transform = 'translate3d(' + frame + 'px, 0px, 0px)';
            if (frame <= stop) {
                clearInterval(animation);
                btn.addEventListener('click', funcName);
                return;
            }   
            frame -= FRAME_SPEED;
        }, FRAME_TIME);
    }

    let btnPrev = document.querySelector(".slider-prev");

    btnPrev.addEventListener('click', function handler() {
        if (frame >= -sliderWidth) {
            frame = -sliderTrackWidth + sliderWidth;    
        }
        animationPrev(this, handler);

        let activeSlide = document.querySelector(".active");
        let nextSlideIndex = Number(activeSlide.dataset.slideIndex)-1;

        if (nextSlideIndex == 0) {
            nextSlideIndex = countSlides - 2;
        }

        deleteClassName(activeSlide, "active")
        document.querySelector(`[data-slide-index="${nextSlideIndex}"]`).classList.add("active");
        findDeleteCLassName(dotsSlider, 'active-item');
        dotsSlider[nextSlideIndex-1].classList.add('active-item');  
        currentSlide = nextSlideIndex;
    });



    let btnNext = document.querySelector(".slider-next");

    btnNext.addEventListener('click', function handler() {
        if (frame <= -sliderTrackWidth + (2*sliderWidth)) {
            frame = 0;
        }  
        animationNext(this, handler);

        let activeSlide = document.querySelector(".active");
        let nextSlideIndex = Number(activeSlide.dataset.slideIndex)+1;

        if (nextSlideIndex == countSlides-1) {
            nextSlideIndex = 1;
        }

        deleteClassName(activeSlide, "active")
        document.querySelector(`[data-slide-index="${nextSlideIndex}"]`).classList.add("active");
        findDeleteCLassName(dotsSlider, 'active-item');
        dotsSlider[nextSlideIndex-1].classList.add('active-item');
        currentSlide = nextSlideIndex;   
    });


    for (let dot of dotsSlider) {
        dot.addEventListener('click', function handler(){
            const dotIndex = Number(dot.dataset.itemIndex);
            findDeleteCLassName(slides, 'active');
            findDeleteCLassName(dotsSlider, 'active-item');
            slides[dotIndex-1].classList.add('active');  
            dot.classList.add('active-item');    
                    
            frame = -sliderWidth*currentSlide;

            const stop = -sliderWidth*dotIndex;
            if (dotIndex >= currentSlide) {       
                animationNext(dot, handler, stop);
            } else {        
                animationPrev(dot, handler, stop);
            }
            currentSlide = dotIndex; 
        });
    }

})(30);