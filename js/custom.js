/*------------------------------------------------------------------
[Master Javascript]

Project: Exito
Version: 1.0.0
-------------------------------------------------------------------*/

(function($){
  "use strict";
  
  // ready function
	jQuery(document).ready(function($) {
   		var $this = $(window);
	
	// Menu js for Position fixed
	$(window).scroll(function(){
		var window_top = $(window).scrollTop() + 1; 
		if (window_top > 400) {
			$('.ext_header_wrapper').addClass('menu_fixed animated fadeInDown');
		} else {
			$('.ext_header_wrapper').removeClass('menu_fixed animated fadeInDown');
		}
	});
	
	// Menu show Hide
	var counter = 0;
	$('.ext_menu_btn').on("click", function(){
		if( counter == '0') {
			$('.ext_main_menu_wrapper').addClass('ext_main_menu_hide');
			$(this).children().removeAttr('class');
			$(this).children().attr('class','fa fa-close');
			counter++;
		}
		else {
			$('.ext_main_menu_wrapper').removeClass('ext_main_menu_hide');
			$(this).children().removeAttr('class');
			$(this).children().attr('class','fa fa-bars');
			counter--;
		}		
	});
	
	// smoothscroll js
		$.smoothScroll();
 
	//wow js
		var wow = new WOW(
			{
			animateClass: 'animated',
			offset: 100
			}
		);
		wow.init();
	
	// Magnific Video Popup js
	$('.popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
	
	// Magnific Image Popup js
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			}
		});
	
	/// Magnific Text Popup js
		$('.popup-with-zoom-anim').magnificPopup({
			type: 'inline',

			fixedContentPos: false,
			fixedBgPos: true,

			overflowY: 'auto',

			closeBtnInside: true,
			preloader: false,
			
			midClick: true,
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in'
		});
	
	//Work Slider js
		var owl = $("#ext_works_slider_id");
		owl.owlCarousel({
		itemsCustom : [
			[0, 1],
			[450, 1],
			[600, 1],
			[700, 2],
			[1000, 3],
			[1200, 3],
			[1400, 3],
			[1600, 3]
		  ],
		  autoPlay : true,
		  navigation : true,
		  navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
	  });
 
	//Brand Slider js
		var owl = $("#ext_brand_slider_id");
		owl.owlCarousel({
		itemsCustom : [
			[0, 1],
			[450, 2],
			[600, 2],
			[700, 2],
			[1000, 5],
			[1200, 5],
			[1400, 5],
			[1600, 5]
		  ],
		  autoPlay : true,
		  navigation : false
	  });
	 
	// Contact Form Submition
	$("#ext_submit").on("click", function() {
        var e = $("#uname").val();
        var t = $("#umail").val();
        var s = $("#sub").val();
        var r = $("#msg").val();
        $.ajax({
            type: "POST",
            url: "ajaxmail.php",
            data: {
                username: e,
                useremail: t,
                useresubject: s,
                mesg: r
            },
            success: function(n) {
                var i = n.split("#");
                if (i[0] == "1") {
                    $("#uname").val("");
                    $("#umail").val("");
                    $("#sub").val("");
                    $("#msg").val("");
                    $("#err").html(i[1]);
                } else {
                    $("#uname").val(e);
                    $("#umail").val(t);
                    $("#sub").val(s);
                    $("#msg").val(r);
                    $("#err").html(i[1]);
                }
            }
        });
	});
	  
	// Single page scroll menu
		var pluginName = 'ScrollIt',
			pluginVersion = '1.0.3';

		/* OPTIONS */
		var defaults = {
			upKey: 38,
			downKey: 40,
			easing: 'linear',
			scrollTime: 600,
			activeClass: 'active',
			onPageChange: null,
			topOffset : -70
		};

		$.scrollIt = function(options) {
			/* DECLARATIONS */
			var settings = $.extend(defaults, options),
				active = 0,
				lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

			/* METHODS */

			/* navigate ** sets up navigation animation*/
			var navigate = function(ndx) {
				if(ndx < 0 || ndx > lastIndex){ return; }

				var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
				$('html,body').animate({
					scrollTop: targetTop,
					easing: settings.easing
				}, settings.scrollTime);
			};

			/*** doScroll ** runs navigation() when criteria are met */
			var doScroll = function (e) {
				var target = $(e.target).closest("[href]").attr('href') ||
				$(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
				navigate(parseInt(target,10));
			};

			/*** keyNavigation ** sets up keyboard navigation behavior */
			var keyNavigation = function (e) {
				var key = e.which;
				if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
					return false;
				}
				if(key == settings.upKey && active > 0) {
					navigate(parseInt(active,10) - 1);
					return false;
				} else if(key == settings.downKey && active < lastIndex) {
					navigate(parseInt(active,10) + 1);
					return false;
				}
				return true;
			};

			/*** updateActive ** sets the currently active item */
			var updateActive = function(ndx) {
				if(settings.onPageChange && ndx && (active != ndx)) {settings.onPageChange(ndx); }

				active = ndx;
				$('[href]').removeClass(settings.activeClass);
				$('[href=' + ndx + ']').addClass(settings.activeClass);
			};

			/*** watchActive ** watches currently active item and updates accordingly */
			var watchActive = function() {
				var winTop = $(window).scrollTop();

				var visible = $('[data-scroll-index]').filter(function(ndx, div) {
					return winTop >= $(div).offset().top + settings.topOffset &&
					winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight();
				});
				var newActive = visible.first().attr('data-scroll-index');
				updateActive(newActive);
			};

			/** runs methods */
			$(window).on('scroll',watchActive).scroll();

			$(window).on('keydown', keyNavigation);

			$('.ext_single_index_menu').on('click','[href], [data-scroll-goto]', function(e){
				e.preventDefault();
				doScroll(e);
			});

		};
	  
	});
})(); 