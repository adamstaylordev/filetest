$(document).ready(function ()
{

	/**
	 * TODO:
	 * md/lg - animate slide 2 when tabs are clicked, either right or left
	 * xs/sm - display/hide whatever slide is not selected from tabs
	 * all - resize primary slide container to largest calculated slide
	 */

	var kit = {};
	kit.is_xs = false;
	kit.is_sm = false;
	kit.is_md = false;
	kit.is_lg = false;
	kit.hover_activated = false;
	kit.tab_offset = 30;//space to allow left and right when calculating slide movement

	kit.register = function ()
	{
		kit.init();
		kit.register_resize();
		kit.register_tabs_small();
		kit.register_tabs_large();
	}

	//=====================================================================
	// init function called at start and every time browser resized
	//=====================================================================

	kit.init = function ()
	{
		kit.define_dims();
		kit.check_device();
		kit.resize_slides();
		kit.repos_slide_2();
	}


	//=====================================================================
	// define dimensions required for calcs
	//=====================================================================
	kit.define_dims = function ()
	{
		//get extents of .slides div for animating slide
		kit.x_left = 0 + kit.tab_offset;
		kit.x_right = $('.slides').width() - kit.tab_offset;
	}


	//=====================================================================
	// register resize listener
	//=====================================================================

	kit.register_resize = function ()
	{
		$(window).resize(function ()
		{
			kit.init();
		});
	}

	//=====================================================================
	// determine device breakpoint in use
	//=====================================================================
	kit.check_device = function ()
	{
		var w = $(window).width();
		kit.is_xs = (w <= 767) ? true : false;
		kit.is_sm = (w >= 768 && w <= 991) ? true : false;
		kit.is_md = (w >= 992 && w <= 1199) ? true : false;
		kit.is_lg = (w >= 1200) ? true : false;
	}


	//=====================================================================
	// register  tabs
	//=====================================================================
	kit.register_tabs_small = function ()
	{
		$('.mobile-nav a').on('click', function ()
		{
			kit.tab_clicked('small', $(this).data('target-slide'));
			return false;
		});
	}


	//=====================================================================
	// register  tabs
	//=====================================================================
	kit.register_tabs_large = function ()
	{
		$('.large-nav a').on('mouseover', function ()
		{
			kit.tab_clicked('large', $(this).data('target-slide'));
			return false;
		});
		$('.slide-1').on('mouseover', function ()
		{
			if (!kit.hover_activated)
			{
				kit.hover_activated = true;
				kit.tab_clicked('large', 'slide-1');
			} else
			{
				$('.slide-1').unbind('mouseover');
			}
		});
		$('.slide-2').on('mouseover', function ()
		{
			if (!kit.hover_activated)
			{
				kit.hover_activated = true;
				kit.tab_clicked('large', 'slide-2');
			} else
			{ 
				$('.slide-3').unbind('mouseover');
			}
		});
	}


	//=====================================================================
	// tab clicked, set slide
	//=====================================================================
	kit.tab_clicked = function (device, slide)
	{
		var el = $('#' + slide);

		//hide temp h2
		kit.hide_temp_h2();
		$('h2.hide-on-click').hide();

		//set active slide
		kit.helper_set_active_slide(el);

		//hide for small
		kit.helper_hide_and_show_for_small(el);

		//remove waiting class from slide2
		$('.slide').removeClass('waiting');
		$('.slide').addClass('not-waiting');

		//show info
		kit.activate_info(slide);

		//
		switch (device)
		{
			case 'small':
				break;
			case 'large':
				//we need to perform the animation
				kit.helper_animate_slide(slide)
				break;
		}
	}


	//=====================================================================
	//helper:set active slide
	//=====================================================================
	kit.helper_set_active_slide = function (slide)
	{
		$('.slide').removeClass('active_slide');
		slide.addClass('active_slide');
	}


	//=====================================================================
	//helper:hide slide for small devices
	//=====================================================================
	kit.helper_hide_and_show_for_small = function (slide)
	{
		$('.slide').addClass('hidden-xs');
		slide.removeClass('hidden-xs');
		$('.slide').addClass('hidden-sm');
		slide.removeClass('hidden-sm');
	}


	//=====================================================================
	// helper: animate slide
	//=====================================================================
	kit.helper_animate_slide = function (slide)
	{
		var el = $('#slide-2');
		switch (slide)
		{
			case 'slide-1':
				el.animate({"left": kit.x_right}, "slow");
				break;
			case 'slide-2':
				el.animate({"left": kit.x_left}, "slow");
				break;
		}
	}


	//=====================================================================
	// as the slides are positioned absolutely we need to resize the slides
	// container when the browser is resized
	//=====================================================================
	kit.resize_slides = function ()
	{
		var h = 0;
		//remove the tabs so they don't interfere with calcs
		var large_nav = $('.large-nav').detach();

		//reset the height of slides to auto for calculations
		//and for small devices
		$('.slide').css('height', 'auto');

		//get the highest and apply to all
		$('.slide').each(function ()
		{
			var slide_h = $(this).height();
			h = (slide_h >= h) ? slide_h : h;
			h +=30;
		});
		$('.slides').css('height', h);
		$('.slide').css('height', h);

		//put the tabs back and resize
		$('.slide-2').prepend(large_nav);
		kit.resize_tabs(h);
	}

	//=====================================================================
	// resize the vertical tabs to fit the slide height
	//=====================================================================

	kit.resize_tabs = function (h)
	{
		$('.large-nav a').css('height', (h / 2));
	}


	//=====================================================================
	// reposition slide 2 if slide 1 is active and browser resized
	//=====================================================================
	kit.repos_slide_2 = function ()
	{
		if ($('.slide-1').hasClass('active_slide'))
		{
			$('.slide-2').css('left', kit.x_right);
		}
		if ($('.slide-2').hasClass('active_slide'))
		{
			$('.slide-2').css('left', kit.x_left);
		}
	}

	//=====================================================================
	// hide the temporary landing h2s
	//=====================================================================
	kit.hide_temp_h2 = function ()
	{
		$('h2.hide-on-click').fadeOut();
	}


	//=====================================================================
	// activate info container
	//=====================================================================
	kit.activate_info = function (slide)
	{
		$('.container-info').hide();
		$('#' + slide + '-info').show();
	}


	//=====================================================================
	// go
	//=====================================================================

	kit.register();


	//=====================================================================
	// info icons
	//=====================================================================
	$('.container-info .icon').on('mouseover', function ()
	{
		//show/hide icon active state

		$(this).closest('.icons').find('.icon').removeClass('active');
		$(this).addClass('active');
		//show/hide active info
		$(this).closest('.container-info').find('.info-item').removeClass('active');
		$(this).closest('.container-info').find('[data-info-item="' + $(this).data('target') + '"]').addClass('active');
	});


	//=====================================================================
	// gallery interaction
	//=====================================================================

	$('.gallery .thumb').on('click', function ()
	{
		$(this).closest('.gallery').find('.hero img').attr('src', $(this).find('img').attr('src'));
		return false;
	});


	//=====================================================================
	// masthead animation (fillthe, room, strap)
	//=====================================================================
	var $ani = $('.animation');
	var $ani_fill = $('.animation .fill');
	var $ani_the = $('.animation .the');
	var $ani_room = $('.animation .room');
	var $ani_strap = $('.animation .strap');
	var $ani_arrows = $('.masthead-arrows');
	//
	$ani.css('visibility', 'visible');
	//
	var tl = new TimelineLite();
	tl.add(TweenLite.fromTo($ani_fill, 0.5, {top: -1000, opacity: 0}, {top: 0, opacity: 1})).delay(1);
	tl.add(TweenLite.fromTo($ani_the, 0.5, {right: -1000, opacity: 0}, {right: 0, opacity: 1}));
	tl.add(TweenLite.fromTo($ani_room, 0.5, {bottom: -1000, opacity: 0}, {bottom: 0, opacity: 1}));
	tl.add(TweenLite.fromTo([$ani_strap, $ani_arrows], 2, {opacity: 0}, {opacity: 1}));
	tl.play();


	//=====================================================================
	// modal video
	//=====================================================================

	$('a[data-target="#modal_watch_video"]').on('click', function ()
	{
		var video_modal = $('#modal_watch_video');
		var src = get_source(this);
		$(video_modal).on('hidden.bs.modal', function ()
		{
			$(video_modal).find('iframe').removeAttr('src');
		});
		$(video_modal).on('shown.bs.modal', function ()
		{
			$(video_modal).find('iframe').attr('src', src);
		});
	});


	function get_source(el)
	{
		var src;
		switch ($(el).data('src'))
		{
			case 'panel':
				src = 'https://www.youtube.com/embed/wHA38dHSfEo?autoplay=1&modestbranding=1&rel=0';
				break;
			case 'toolbar':
				src = 'https://www.youtube.com/embed/FhYGj8Fvzlc?autoplay=1&modestbranding=1&rel=0';
				break;
			case 'left':
				src = 'https://www.youtube.com/embed/k_a5aRY3SPA?autoplay=1&modestbranding=1&rel=0';
				break;
			case 'right':
				src = 'https://www.youtube.com/embed/sDvw-jWBp9k?autoplay=1&modestbranding=1&rel=0';
				break;
		}
		return src;
	}


	function tab_autoslide()
	{
		kit.tab_clicked('large', $('.large-nav a:last-child').data('target-slide'));
	}

});