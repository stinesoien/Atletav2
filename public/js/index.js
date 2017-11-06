$(function() {
    $('.scroll-down1').click (function() {
        $('html, body').animate({scrollTop: $('section.second').offset().top }, 'slow');
        return false;
    });
});

$(function() {
    $('.scroll-down2').click (function() {
        $('html, body').animate({scrollTop: $('section.third').offset().top }, 'slow');
        return false;
    });
});

