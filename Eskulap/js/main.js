//Hide cookies message
$('.accept-cookies').click(() => {
    $('.cookies-box').addClass('hide-content')
})

//PopUp nav menu
$('.menu-open-btn').click(() => {
    let popupId = document.querySelector(".nav-popup-container");
    $(popupId).show();
    $('.overlay-popup').show();
    $('.menu-open-btn').addClass('hide-content');
})
$('.overlay-popup, .menu-close-btn').click(() => {
    $('.overlay-popup, .nav-popup-container').hide();
    $('.menu-open-btn').removeClass('hide-content')
})

$('.link-about-me').click(() => {
    let elem = document.querySelector('.about-us');
    elem.scrollIntoView({block: "start", behavior: "smooth"});
    $('.link-about-me').addClass('active-link');
    $('.overlay-popup, .nav-popup-container').hide();
    $('.menu-open-btn').removeClass('hide-content')
});

$('.link-services').click(() => {
    let elem = document.querySelector('.expert-in');
    elem.scrollIntoView({block: "start", behavior: "smooth"});
    $('.link-services').addClass('active-link');
    $('.overlay-popup, .nav-popup-container').hide();
    $('.menu-open-btn').removeClass('hide-content')
});

$('.link-my-works').click(() => {
    let elem = document.querySelector('.latest-works');
    elem.scrollIntoView({block: "start", behavior: "smooth"});
    $('.link-my-works').addClass('active-link');
    $('.overlay-popup, .nav-popup-container').hide();
    $('.menu-open-btn').removeClass('hide-content')
});

$('.link-clients').click(() => {
    let elem = document.querySelector('.clients');
    elem.scrollIntoView({block: "start", behavior: "smooth"});
    $('.link-clients').addClass('active-link');
    $('.overlay-popup, .nav-popup-container').hide();
    $('.menu-open-btn').removeClass('hide-content')
});

//PopUp form
$('.open-callback-form').click(() => {
    let popupId = document.querySelector(".form-popup-container");
    $(popupId).show();
    $('.overlay-popup').show();
})
$('.overlay-popup, .form-close-btn').click(() => {
    $('.overlay-popup, .form-popup-container').hide();
})

//Arrow scroll down 
$('.intro-scroll-down').click(() => {
    let elem = document.querySelector('.expert-in');
    elem.scrollIntoView({block: "start", behavior: "smooth"});
});