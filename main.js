'use strict';

//projects 슬라이더
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let postion = 0;
const IMAGE_WIDTH = 500;
const slide = document.querySelector(".slide");
let slideIndex = 0;

prev.addEventListener("click", ()=>{
    if(slideIndex >0){
        postion += IMAGE_WIDTH;
        slide.style.transform = `translateX(${postion}px)`;
        slide.style.transition = "1s";
        slideIndex--;
    }
    else if(slideIndex <=0){
        postion = -1500;
        slideIndex = 3;
        slide.style.transform = `translateX(${postion}px)`;
        slide.style.transition = "1s";
    }
});
next.addEventListener("click",()=>{
    if(slideIndex<3){
        postion -= IMAGE_WIDTH;
        slide.style.transform = `translateX(${postion}px)`;
        slide.style.transition = "1s";
        slideIndex++;
    }
    else if(slideIndex >=3){
        postion = 0;
        slideIndex = 0;
        slide.style.transform = `translateX(${postion}px)`;
        slide.style.transition = "1s";
    }
    
});


function autoSlide(){
    if(slideIndex<3){
        postion -= IMAGE_WIDTH;
        slide.style.transform = `translateX(${postion}px)`;
        slide.style.transition = "1s";
        slideIndex++;
    }
    else if(slideIndex >=3){
        postion = 0;
        slideIndex = 0;
        slide.style.transform = `translateX(${postion}px)`;
        slide.style.transition = "1s";
    }
}

autoSlide();
setInterval(autoSlide,3000);



//top에서 navbar 배경 투명화
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Navbar menu scroll by click
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link = target.dataset.link;

    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
});

// Contact me scroll by click
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', (e) => {
    const scrollTo = document.querySelector('#contact');
    scrollTo.scrollIntoView({ behavior: 'smooth' });
});

// 스크롤시 home 투명화
const homeContainer = document.querySelector('.home__container');
const homeHeight = homeContainer.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    homeContainer.style.opacity = 1 - window.scrollY / homeHeight;

});

//Arrow up
const arrow = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrow.classList.add('visible');
    } else {
        arrow.classList.remove('visible');
    }
});

arrow.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});



   /* //remove selection and select new one
    const active = document.querySelector('.work__list__btn.selected');
    active.classList.remove('selected');
    const target =
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

    workProject.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }

        });

        workProject.classList.remove('anim-out');
    }, 300);


*/

// Navbar toggle button set
const toggleBtn = document.querySelector('.navbar__togglebtn');
toggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});


//intersection observer 이용
//1.모든 섹션 요소들과 메뉴아이템들을 가지고 온다.
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
    document.querySelector(`[data-link="${id}"]`)
);

let selectedNavItem = navItems[0];
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectingRatio > 0) {
            const idnex = sectionIds.indexOf(`#${entry.target.id}`);
            let selectedIndex;
            if (entry.getBoundingClientRect.y < 0) {
                selectedIndex = index + 1;
            } else {
                selectedIndex = index - 1;
            }
            selectedNavItem.classList.remove('active');
            selectedNavItem = navItems[selectedIndex];
            selectedNavItem.classList.add('active');
        }
    });

};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

