/******************
 * Class Function *
 ******************/

// Resize box with drag
var ResizeDiv = function( $wrapper, $divTop, $divBottom ){

  var wrapperHeight = $wrapper.height();

  $divTop.resizable({
    handles:'s',
    resize: function(){

      var divTopHeight = $divTop.outerHeight();
      var divBottomHeight = wrapperHeight - divTopHeight - 24;

      $divBottom.css({height:divBottomHeight});
    }
  });

};

// Fold tree node
var FoldTree = function($clickTreeItem, $clickTreeList, hasParentChild ){

  if( !hasParentChild ) {
    if ($clickTreeItem.data('fold') == 'true') {
      $(this).addClass('unfold').siblings().addClass('unfold');
      $clickTreeItem.data('fold', 'false').next('.tree-depth').addClass('unfold');
    } else {
      $(this).removeClass('unfold').siblings().removeClass('unfold');
      $clickTreeItem.data('fold', 'true').next('.tree-depth').removeClass('unfold');
    }
  } else {
    if ($clickTreeItem.data('select') == 'false') {
      $(this).attr('data-select','selected').addClass('is-select')
        .siblings().attr('data-select','selected').addClass('is-select');
      $clickTreeItem.data('select', 'true');
    } else {
      $(this).removeAttr('data-select').removeClass('is-select')
        .siblings().removeAttr('data-select').removeClass('is-select');
      $clickTreeItem.data('select', 'false');
    }
  }

};

/**************
 * Main Event *
 **************/

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
}

// Constant
var HEADER_HEIGHT = 160;

$(function(){

	/*
	 * Common
	 */

	// Set height of main-content
	(function(){
		var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
		$('.main-content .wrapper.fix-height').css({height: mainHeight});

		$('.stats-resizable.narrow.top, .stats-resizable.narrow.bottom,' +
		'.stats-resizable.wide.top, .stats-resizable.wide.bottom').css({height:(mainHeight/2 - 23)});

	})();

	// React about event of user-menu in header
	$('.header-user-path').data('open', 'false').on('click', function(e){
		e.preventDefault();
		if( $(this).data('open') == 'false' ) {
			$(this).data('open', 'true').addClass('on').next().addClass('on');
		} else {
			$(this).data('open', 'false').removeClass('on').next().removeClass('on');
		}
	});

	// Apply selectric library
	$('.select').selectric();

	// Tree
	(function(){

		// Set tree node
		var $treeItem = $('.tree-item');
		$treeItem.data({'fold' : 'true', 'select' : 'false'});

		// React about event of folding tree
		$(document).on('click', '.js-fold', function(e){

			e.preventDefault();

			var $clickTreeItem = $(this).parent('.tree-item');
			var $clickTreeList = $clickTreeItem.parent('.tree-list');
			var hasParentChild = $clickTreeList.hasClass('no-children');

			var fold = new FoldTree($clickTreeItem, $clickTreeList, hasParentChild);

		});

		// open layerpop
		$('.js-open-popup').on('click', function(e) {
			$('.dimmed').addClass('on');
			$('.popup').addClass('on');
			e.preventDefault();
		});

		// close layerpop
		$('.js-close-popup').on('click', function(e) {
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

		// calendar - initialize
		$('.js-cal-start, .js-cal-end').datepicker({
			dateFormat: 'yy-mm-dd',
			beforeShowDay: function(date) {
				var className = '';
				if (date.getDay() == 6) {
					className = 'ui-datepicker-sat';
				}
				if (date.getDay() == 0) {
					className = 'ui-datepicker-sun';
				}
				return [true, className];
			}
		});

		// calendar - start date
		$('.js-btn-cal-start').on('click', function(e) {
			$('.js-cal-start').datepicker('show');
		});

		// calendar - end date
		$('.js-btn-cal-end').on('click', function(e) {
			$('.js-cal-end').datepicker('show');
		});

	})();

	/*
	 * vnf
	 */

	(function(){

	})();

	/*
	 * stats
	 */

	// Resize height of box to fit in browser height
	(function(){


		var currentMainHeight = 0, prevMainHeight = 0, deltaHeight = 0;
		var boxNarrowHeight, boxWideHeight;
		var narrowHeight = $('.stats-resizable.narrow.top').height();
		var wideHeight = $('.stats-resizable.wide.top').height();

		$(window).on('resize', function(){
			var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;


			$('.main-content .wrapper.fix-height').css({height: mainHeight});

			prevMainHeight = currentMainHeight;
			currentMainHeight = mainHeight;
			deltaHeight = prevMainHeight - currentMainHeight;



			console.log('p : ' + prevMainHeight);
			console.log('c : ' + currentMainHeight);
			console.log('d : ' + deltaHeight);

		});

	})();

	// Resize Box by dragging
	(function(){
		var $wrapper = $('.wrapper.fix-height');
		var statsResizeNarrow = new ResizeDiv( $wrapper, $('.stats-resizable.narrow.top'), $('.stats-resizable.narrow.bottom'));
		var statsResizeWide = new ResizeDiv( $wrapper, $('.stats-resizable.wide.top'), $('.stats-resizable.wide.bottom'));
	})();

	// React about event of chart icon
	$('.chart-view').data('select', 'false').on('click', function(e){

		e.preventDefault();

		if( $(this).data('select') == 'false' ){
			$(this).addClass('on').data('select', 'true');
		} else {
			$(this).removeClass('on').data('select', 'false');
		}

	});

	/*
	 * popup
	 */

	// Open layer popup
	(function(){

		$('.js-open-popup').on('click', function(e) {
			$('.dimmed').addClass('on');
			$('.popup').addClass('on');
			e.preventDefault();
		});

		$('.js-close-popup').on('click', function(e) {
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

	})();

});