$(function () {

    'use strict';

    function slider() {
        var wrapThumb = $('.wrapThumb'),
            wrapThumbWidth = wrapThumb.width(),
            thumb = $('.wrapThumb .thumb'),
            position1 = -wrapThumbWidth * 0.009,
            position11 = 0,
            position12 = wrapThumbWidth * 0.08,
            position2 = wrapThumbWidth * 0.182,
            position21 = wrapThumbWidth * 0.16,
            position22 = wrapThumbWidth * 0.22,
            position3 = wrapThumbWidth * 0.482,
            position31 = wrapThumbWidth * 0.46,
            position32 = wrapThumbWidth * 0.52,
            position4 = wrapThumbWidth * 0.985,
            position41 = wrapThumbWidth * 0.95,
            position42 = wrapThumbWidth;

        wrapThumb.click(function (e) {
            var coordsClick = e.pageX - this.offsetLeft;

            if (position11 < coordsClick && coordsClick < position12) {
                thumb.animate({left: position1}, 2000);
            } else if (position21 < coordsClick && coordsClick < position22) {
                thumb.animate({left: position2}, 2000);
            } else if (position31 < coordsClick && coordsClick < position32) {
                thumb.animate({left: position3}, 2000);
            } else if (position41 < coordsClick && coordsClick < position42) {
                thumb.animate({left: position4}, 2000);
            }
        });


    }
    slider();


});



