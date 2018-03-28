$(document).ready(function(){

    //date

    var deadline = 'April 1 2018 23:59:59';

    function getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    var timeObj = {
        days: 'timer_days',
        hours: 'timer_hours',
        minutes: 'timer_minutes',
        seconds: 'timer_seconds'
    }

    function firstInitializeClock(objId, endtime) {
        var t = getTimeRemaining(endtime);
        if ( t.total > 0 ) {
            var days = document.getElementById(objId.days);
            var hours = document.getElementById(objId.hours);
            var minutes = document.getElementById(objId.minutes);
            var seconds = document.getElementById(objId.seconds);


            days.innerHTML = ('0' + t.days).slice(-2);
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
        }
    }

    function shake(element){
        $(element).closest('.counter__body__num__wrap').effect("shake", {
            times: 1,
            direction: 'down',
            distance: 10
        }, 1100);
    }

    function initializeClock(objId, endtime) {
        var days = document.getElementById(objId.days);
        var hours = document.getElementById(objId.hours);
        var minutes = document.getElementById(objId.minutes);
        var seconds = document.getElementById(objId.seconds);

        var timeinterval = setInterval(function(){
            var t = getTimeRemaining(endtime);

            days.innerHTML = ('0' + t.days).slice(-2);
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
            
            // --------------------
            // Shake effect
            // --------------------
            shake(seconds);

            if (t.seconds == 0){
                shake(minutes);
            }
            if (t.seconds == 0 && t.minutes == 0){
                shake(hours);
            }
            if (t.seconds == 0 && t.minutes == 0 && t.hours == 0){
                shake(days);
            }
            if ( t.total <= 0 ) {
                clearInterval(timeinterval);
            }

        }, 1000);
    }

    firstInitializeClock(timeObj, deadline);
    initializeClock(timeObj, deadline);


    $('span.economy__tab').on('click', function(){
       $('span.economy__tab').removeClass('active');
       $(this).addClass('active');
       var currentPage = $(this).data('tab');

       $('div.economy__page__wrap').removeClass('active');
       $($('div.economy__page__wrap')[currentPage]).addClass('active');
    });

    $('.questions__item__title').on('click', function(){
        $('.questions__item__desc:visible').slideUp(250);
        $('.questions__item__title').not(this).find('i').removeClass('active');
        $(this).next().stop().slideToggle(250);
        $(this).find('i').toggleClass('active');
    });


    $('.footer__social__input').on('input', function () {
        if ($(this).val().length > 0) {
            $(this).siblings('span.placeholder').addClass('active');
        }
        else {
            $(this).siblings('span.placeholder').removeClass('active');
        }
    });

    var subscribeForm = $('#mc-embedded-subscribe-form'),
        textInput = subscribeForm.find('#mce-EMAIL'),
        clearBtn = subscribeForm.find('.footer__social__clear');
    textInput.keyup(function() {
      clearBtn[0].style.visibility = (this.value.length) ? "visible" : "hidden";
    });
    clearBtn.on('click', function(){
      this.style.visibility = "hidden";
      textInput[0].value = "";
    });

    var timer;

    $('.team__item__more--btn').on('click', function(){

        var item = $(this).siblings('.team__item__desc');

        item.addClass('active');
        timer = setTimeout(function(){
            item.removeClass('active');
        }, 5000)
    })
    $('.team__item__desc').on('click', function(){
        $(this).removeClass('active');
    });

    $('.social__media__btn').on('click', function () {
        $('.social__media').toggleClass('active');
        if ($('.nav__lang')[0].className.match('active')) {
            $('.nav__lang').removeClass('active');
        }

        $('#popup__whitepaper').fadeOut(200);
        $('main, footer').removeClass('blur');
        $('.wrapper').removeClass('blur');
    });

    var swiperData = {
        direction: 'vertical',
        height: 250,
        initialSlide: 0,
        slidesPerView: 1,
        on: {
            touchEnd: function(e){
                if (this.isEnd) {
                    $("html, body").animate({
                        scrollTop: $('#how-work').offset().top
                    }, 500)
                }
                if (this.isBeginning) {
                    $("html, body").animate({
                        scrollTop: $('.about').offset().top
                    }, 500)
                }
                console.log(this);
            }
        }
    };

    var menu_selector = "nav";
    function onScroll(){
        var scroll_top = $(document).scrollTop();
        $(menu_selector + " a.nav__link").each(function(){
            var hash = $(this).attr("href");
            var target = $(hash);
            if (target.position().top - 200 <= scroll_top && target.position().top + target.outerHeight() + 200 > scroll_top) {
                // $(menu_selector + " a.active").removeClass("active");
                // $(this).addClass("active");
                if ($(target).is('#features') && $(window).width() > 1083) {
                    $('.features__item__wrap').delay(500).addClass('active');
                }
            }
        });
        if ($(window).scrollTop() > 75) {
            $('header').addClass('active');
            $('.social__media').removeClass('invisible').addClass('visible');
        }else {
            if ($('header')[0].className) {
                $('.social__media').removeClass('visible').addClass('invisible');
            }
            $('header').removeClass('active');
        }

        $('.nav__lang').removeClass('active');
        $('.social__media').removeClass('active');

    }

	$(document).on("scroll", onScroll);
	$("a[href^=\\#]").click(function(e){
		e.preventDefault();
		$(document).off("scroll");
    if ($('.nav__lang')[0].className.match('active')) {
        $('.nav__lang').removeClass('active');
    }
    if ($('.social__media')[0].className.match('active')) {
        $('.social__media').removeClass('active');
    }
		// $(menu_selector + " a.active").removeClass("active");
		// $(this).addClass("active");
		var hash = $(this).attr("href");
		var target = $(hash);
		$("html, body").animate({
		    scrollTop: target.offset().top
		}, 500, function(){
			window.location.hash = hash;
			$(document).on("scroll", onScroll);
            if ($(target).is('#features') && $(window).width() < 1083) {
                $('.features__item__wrap').delay(500).addClass('active');
            }
		});
	});

    $('main').click(function() {
        if ($('.nav__lang')[0].className.match('active')) {
            $('.nav__lang').removeClass('active');
        }
        if ($('.social__media')[0].className.match('active')) {
            $('.social__media').removeClass('active');
        }
    });

    $('.nav__lang').on('click', function(e){
        if ($(e.target).is('.nav__lang__short')) {
            $('.nav__lang').toggleClass('active');
            if ($('.social__media')[0].className.match('active')) {
                $('.social__media').removeClass('active');
            }
            // $('header > .container .social__media').css({
            //     'z-index': '-1'
            // })
        }
    });

    $('.counter__docs__whitepaper').on('click', function(){

        $('.nav__btn').removeClass('active');
        $('nav').removeClass('active');

        $('main, footer').addClass('blur');
        $('.wrapper').addClass('blur');
        $('#popup__whitepaper').fadeIn(700);
    });

    $('.popup__whitepaper__close').on('click', function(){
        $('#popup__whitepaper').fadeOut(200);
        $('.wrapper').removeClass('blur');
        $('main, footer').removeClass('blur');
    })


    jQuery('#road-map').scrollbar();

  $('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;

    function move(newIndex) {
      var animateLeft, slideLeft;

      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }

      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');

      if (newIndex > currentIndex) {
        slideLeft = '100%';
        animateLeft = '-100%';
      } else {
        slideLeft = '-100%';
        animateLeft = '100%';
      }

      $slides.eq(newIndex).css({
        display: 'block',
        left: slideLeft
      });
      $group.animate({
        left: animateLeft
      }, function() {
        $slides.eq(currentIndex).css({
          display: 'none'
        });
        $slides.eq(newIndex).css({
          left: 0
        });
        $group.css({
          left: 0
        });
        currentIndex = newIndex;
      });
    }

    $.each($slides, function(index) {
      var $button = $('<a class="slide_btn" />');

      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function() {
        move(index);
      }).appendTo('.slide_buttons');
      bulletArray.push($button);
    });
  });


    var mySwiper = undefined;
    function initSwiper() {
        var screenWidth = $(window).width();
        if(screenWidth < 1084 && mySwiper == undefined) {
            mySwiper = new Swiper('.swiper-container', swiperData);
            $('.features__item__wrap').removeClass('active');
        } else if (screenWidth > 1084 && mySwiper != undefined) {
            mySwiper.destroy();
            mySwiper = undefined;
            jQuery('.swiper-wrapper').removeAttr('style');
            jQuery('.swiper-slide').removeAttr('style');
        }
    }

    //Swiper plugin initialization
    initSwiper();

    //Swiper plugin initialization on window resize
    $(window).on('resize', function(){
        initSwiper();
    });

    $('.nav__btn').on('click', function(){
        if ($('#popup__whitepaper').is(':visible')) {
            console.log(123);

            $('main, footer').removeClass('blur');
            $('wrapper').removeClass('blur');
            $('#popup__whitepaper').hide();
        }
        $('main, footer, .wrapper').toggleClass('blur');

        $(this).toggleClass('active');
        $('nav').toggleClass('active');
    });

    $('.nav__btn__close').on('click', function(){
        if ($('#popup__whitepaper').is(':visible')) {
            $('main, footer, .wrapper').removeClass('blur');
            $('#popup__whitepaper').hide();
        }
        $('main, footer, .wrapper').toggleClass('blur');
        $('.nav__btn').toggleClass('active');
        $('nav').toggleClass('active');
    });


    if ($(window).width() < 800) {
        $('.nav__lang__wrap').on('click', function(e) {
            if ($(e.target).hasClass('nav__lang__wrap')) {
                $('.nav__lang').removeClass('active');
                $('header > .container .social__media').css({
                    'z-index': '0'
                })
            }
        });
        $('.nav__btn__close__lang').on('click', function() {
          $('.nav__lang').removeClass('active');
        });
        $('.nav__btn__close__media').on('click', function() {
            $('.social__media').removeClass('active');
        });
    }

    particlesJS("js-particles", {
        "particles": {
            "number": {
                "value": 200,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": ["#ffffff", "#ffffff"]
            },

            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#fff"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.6,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    particlesJS("js-particles-second", {
        "particles": {
            "number": {
                "value": 200,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": ["#ffffff", "#ffffff"]
            },

            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#fff"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.6,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });


    // ---------------
    // Modal window
    // ---------------

    $('.button').click(function () {
        var buttonId = $(this).attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
    })

    $('#modal-container').click(function () {
        $(this).addClass('out');
        $('body').removeClass('modal-active');
    });

    // ---------------
    // Team rotate
    // ---------------
    $('.card__item-btn').on('click', function () {
        var elem = $(this).closest('.card__container');
        elem.addClass('active');
    });
    
    $('.card__item-back').on('mouseleave', function (e) {
        var elem = $(this).closest('.card__container');
        elem.removeClass('active');
    });
});