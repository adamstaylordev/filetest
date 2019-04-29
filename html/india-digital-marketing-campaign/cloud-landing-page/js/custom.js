$(document).on('ready', function() {
 
 $('.scrolltop').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });



$('.global-slider1').slick({
  slidesToShow: 8,
  responsive: [
   
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 5,

      }
      },
	   
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 3,

      }
      },
	   
     {
      breakpoint: 639,
      settings: {
        slidesToShow: 3,
      }
      },
  
      {
      breakpoint: 479,
      settings: {
        slidesToShow: 2,
      }
 
	  
    }
  ]
});

$('.global-slider').slick({
  slidesToShow: 7,
  responsive: [
   
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4,

      }
      },
	   
     {
      breakpoint: 639,
      settings: {
        slidesToShow: 3,
      }
      },
  
      {
      breakpoint: 479,
      settings: {
        slidesToShow: 2,
      }
 
	  
    }
  ]
});


$('.world-slider').slick({
  slidesToShow: 3,
  arrows: true,
  dots: true,
  responsive: [
    {
      breakpoint: 979,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 767,
      settings: {
        centerPadding: '0px',
        slidesToShow: 1,
      }
    }
  ]
});


AOS.init();

});