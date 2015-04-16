// Class


// main
// Check UA
if( navigator.userAgent.indexOf('Safari') > 0 ){
	if( navigator.userAgent.indexOf('Chrome') > 0 ){
		$('html').addClass('chrome');
	} else {
		$('html').addClass('Safari');
	}
} else if( navigator.userAgent.indexOf('Firefox') > 0 ){
	$('html').addClass('firefox');
} else if( navigator.userAgent.indexOf('Trident/7.0') > 0 ){
	$('html').addClass('ie11');
} else if( navigator.userAgent.indexOf('MSIE 10.0') > 0 ){
	$('html').addClass('ie10');
} else if( navigator.userAgent.indexOf('MSIE 9.0') > 0 ){
	$('html').addClass('ie9');
} else if( navigator.userAgent.indexOf('MSIE 8.0') > 0 ){
	$('html').addClass('ie8');
}

$(function(){
	
	// GNB
	
	$('.js-gnb').on({

		mouseenter : function(){

			$('.header-gnb-list').data( 'current', $('.js-gnb').index( $('.js-gnb.on') ) );

			$('.header-gnb-item').removeClass('side');
			$('.header-gnb-link').removeClass('on').removeClass('on-left').removeClass('on-right');
			$(this).addClass('on').parents('.header-gnb-item').prev().addClass('side').find('.js-gnb').addClass('on-left');
			$(this).parents('.header-gnb-item').next().addClass('side').find('.js-gnb').addClass('on-right');

		}

	});

	$('.js-gnb-area').on({

		mouseleave : function(){

			var $gnbLink = $('.header-gnb-link');
			var $gnbList = $('.header-gnb-list');

			$('.header-gnb-item').removeClass('side');
			$gnbLink.removeClass('on').removeClass('on-left').removeClass('on-right');
			$gnbLink.eq( $gnbList.data( 'current') ).addClass('on').parents('.header-gnb-item').prev().addClass('side').find('.js-gnb').addClass('on-left');
			$gnbLink.eq( $gnbList.data( 'current') ).parents('.header-gnb-item').next().addClass('side').find('.js-gnb').addClass('on-right');

		}

	});

	// image rolling

	$(window).on('load', function(){

		$('.category').slidesjs({

			width:'100%',
			height:'100%',
			pagination: {
				active: true
			},
			effect:{
				slide:{
					speed:1000
				}
			}

		});

		$('.prev').each(function(i){
			$('.prev').eq(i).on('click', function (e) {
				e.preventDefault();
				$('.slidesjs-previous').eq(i).trigger('click');
			});
		});

		$('.next').each(function(i){
			$('.next').eq(i).on('click', function(e){
				e.preventDefault();
				$('.slidesjs-next').eq(i).trigger('click');
			});
		});

	});

	// scroll

	var currentCategory = 0;
	var start = false;

	$('.main-section').on('mousewheel', function(e){

		if(start) return;
		var controlBtn = $('.control-btns');
		var categoryNum = $('.category').length;

		if(e.deltaY<0) {
			if(currentCategory==categoryNum-1) return;
			start = true;
			$('.category').eq(currentCategory).stop().animate({height: '0%'}, 800, 'easeInOutQuad', function(){
				start = false;
			});
			controlBtn.eq(currentCategory).hide();
			currentCategory++;
			controlBtn.eq(currentCategory).show();
		} else {
			if(currentCategory==0) return;
			start = true;
			$('.category').eq(currentCategory-1).stop().animate({height: '100%'}, 800, 'easeInOutQuad', function(){
				start = false;
			});
			controlBtn.eq(currentCategory).hide();
			currentCategory--;
			controlBtn.eq(currentCategory).show();
		}

	});

});