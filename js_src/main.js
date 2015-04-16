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

		},

		mouseleave : function(){

			var $gnbLink = $('.header-gnb-link');
			var $gnbList = $('.header-gnb-list');

			$('.header-gnb-item').removeClass('side');
			$gnbLink.removeClass('on').removeClass('on-left').removeClass('on-right');
			$gnbLink.eq( $gnbList.data( 'current') ).addClass('on').parents('.header-gnb-item').prev().addClass('side').find('.js-gnb').addClass('on-left');
			$gnbLink.eq( $gnbList.data( 'current') ).parents('.header-gnb-item').next().addClass('side').find('.js-gnb').addClass('on-right');

		}

	});

});