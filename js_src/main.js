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
	(function(){
		$('.header-user-path').data('open', 'false').on('click', function(e){
			e.preventDefault();
			if( $(this).data('open') == 'false' ) {
				$(this).data('open', 'true').addClass('on').next().addClass('on');
			} else {
				$(this).data('open', 'false').removeClass('on').next().removeClass('on');
			}
		});
	})();

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

	})();

	// calendar
	(function(){
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

	// Resize by dragging and to fit in height of browser
	(function(){
		var $wrapper = $('.wrapper.fix-height');

		var statsResizeNarrow = new ResizeDiv( $wrapper, $('.stats-resizable.narrow.top'), $('.stats-resizable.narrow.bottom'));
		var statsResizeWide = new ResizeDiv( $wrapper, $('.stats-resizable.wide.top'), $('.stats-resizable.wide.bottom'));

		$(window).on('resize',function(){
			statsResizeNarrow.resizeDivFitWin();
			statsResizeWide.resizeDivFitWin();
		});

		$('.ui-resizable-handle').on({
			'mousedown' : function(){
				$(window).unbind('resize');
			},
			'mouseup' : function(){
				$(window).bind('resize', statsResizeNarrow.resizeDivFitWin);
				$(window).bind('resize', statsResizeWide.resizeDivFitWin);
			}
		});

	})();

	// React about event of chart icon
	(function(){
		$('.chart-view').data('select', 'false').on('click', function(e){

			e.preventDefault();

			if( $(this).data('select') == 'false' ){
				$(this).addClass('on').data('select', 'true');
			} else {
				$(this).removeClass('on').data('select', 'false');
			}

		});
	})();

	/*
	 * monitoring
	 */

	// dashboard tab
	(function(){
		var tabBtns = $('.js-tab-link'),
			tabCont = $('.js-tab-cont');

		if (tabBtns.length == 0) {
			return false;
		}

		tabBtns.each(function(){
			$(this).data('target', $(this).attr('href'));
		});

		tabBtns.on('click', function(e){
			tabBtns.removeClass('on');
			tabCont.removeClass('on');

			$(this).addClass('on');
			$($(this).data('target')).addClass('on');

			e.preventDefault();
		});

	})();


	/*
	 * popup
	 */

	// React about event of layer popup
	(function(){

		// Open general popup
		$('.js-open-popup').on('click', function(e) {
			$('.dimmed').addClass('on');
			$('.popup').addClass('on');
			e.preventDefault();
		});

		// Close general popup
		$('.js-close-popup').on('click', function(e) {
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

		// Confirm OK
		$('.js-confirm-ok').on('click', function(e) {
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

		// Confirm Cancel
		$('.js-confirm-cancel').on('click', function(e) {
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

	})();

});