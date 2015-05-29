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
		var $fixWrapper = $('.main-content .wrapper.fix-height');
		var $varWrapper = $('.main-content .wrapper.var-height');

		$fixWrapper.css({height: mainHeight});
		if( $varWrapper.height() <= mainHeight ){
			$varWrapper.css({height: mainHeight});
		}

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

	// Apply spinner library
	$('.spinner').spinner({
		max:4,
		min:1
	});

	// Tree
	(function(){

		// Set tree node
		var $treeItem = $('.tree-item');
		$treeItem.data({'fold' : 'true', 'select' : 'false'});
		var fold = new FoldTree();

		// React about event of folding tree
		$(document).on('click', '.js-fold', function(e){

			e.preventDefault();

			var $clickTreeItem = $(this).parent('.tree-item');
			var $clickTreeList = $clickTreeItem.parent('.tree-list');
			var hasParentChild = $clickTreeList.hasClass('no-children');

			fold.foldAction($(this), $clickTreeItem, $clickTreeList, hasParentChild);

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
	 * monitoring
	 */

	// Add Graph
	(function(){

		var $body = $('body');
		var ct = new Graph();;

		$body.on('click', '.container-item', function(){
			ct.showPopup( $(this), $(this).parents('.contents-section-inner.stats-monitoring') );
		});

		$body.on('click', '.js-btn-add-graph.new', function(){
			var graphTitle = $('.popup-graph-title').val();
			var gridCol = $('.spinner.col').val();
			var gridRow = $('.spinner.row').val();

			ct.addGraph( graphTitle, gridCol, gridRow );
		});

	})();

	// Add page
	(function(){

		var $tabParent = $('.sm-tab .tab-list');
		var $pageParent = $('.wrapper.monitoring');
		var tab = new smTab();
		var $body = $('body');

		$body.on('click', '.js-add', function(){
			tab.showPopup( $tabParent, 'add' );
		});

		$body.on('click', '.js-del', function(){
			tab.showPopup( $tabParent, 'del', $(this) );
		});

		$body.on('click', '.js-btn-add-page', function(){
			var pageTitle = $('.js-page-title').val();
			tab.addPage( $tabParent, pageTitle, $pageParent );
		});

		$body.on('click', '.js-btn-del-page', function(){
			tab.delPage();
		});

		$body.on('click', '.js-tab', function(){
			tab.active( $(this) );
		});

		$('.btn-move-prev').on('click', function(){
			var $tabItem = $('.tab-item');
			var $pageItem = $('.contents-section.stats-monitoring');
			var currentIndex = $tabItem.index( $('.tab-item.current') );

			tab.tabMove( 'prev', $tabItem, $pageItem, currentIndex );
		});
		$('.btn-move-next').on('click', function(){
			var $tabItem = $('.tab-item');
			var $pageItem = $('.contents-section.stats-monitoring');
			var currentIndex = $tabItem.index( $('.tab-item.current') );

			tab.tabMove( 'next', $tabItem, $pageItem, currentIndex );
		});

	})();

	// Set container & graph unit height
	(function(){

		var dragContainer = new ResizeContainer( $('.container-item') );
		var dragGraph;

		$(window).on('addPage addGraph', function(){
			dragContainer = new ResizeContainer( $('.container-item') );
			dragGraph = new ResizeGraph( $('.graph-item') );
		});

		$(window).on('resize', function(){
			try{
				dragContainer.resizeContainerFitWin();
				dragGraph.resizeGraphContainer();
			} catch(e) {}
		});

	})();

	// Button event graph container
	(function(){

		var $body = $('body');
		var setGraph = new SetGraph();

		$body.on('click', '.graph-btn.setting', function(){

			var $thisGraphItem = $(this).parents('.graph-item');
			var thisTitle = $thisGraphItem.data('graphTitle');
			var thisIndex = $thisGraphItem.data('index');
			var thisGridCol = $thisGraphItem.data('gridCol');
			var thisGridRow = $thisGraphItem.data('gridRow');

			setGraph.showSetPopup( $thisGraphItem, thisTitle, thisIndex, thisGridCol, thisGridRow );

		});

		$body.on('click','.js-btn-add-graph.change', function(){

			var graphTitle = $('.popup-graph-title').val();
			var gridCol = $('.spinner.col').val();
			var gridRow = $('.spinner.row').val();

			setGraph.changeGraph(graphTitle, gridCol, gridRow);
		});

		$body.on('click', '.graph-btn.enlarge', function(){
			var graphTitle = $(this).parents('.graph-top').find('.graph-title').text();
			var enlarge = new EnlargeGraph( $(this).parents('.contents-section-inner.stats-monitoring'), graphTitle );
		});

		$body.on('click', '.graph-btn.close', function(){
			$(this).parents('.graph-item').remove();
		});

	})();

	// Close Enlarge graph container
	(function(){

		var $body = $('body');

		$body.on('click', '.enlarge-graph-btn.close', function(){
			$(this).parents('.enlarge-graph-item').remove();
		});

	})();


	// Resize dashboard list
	(function(){
		var $btnExpand = $('.js-expand');
		//$btnExpand.data('expand', 'false');

		var resizeDashboardList = new ResizeDashboardList( $('.dashboard-list'), $btnExpand );

		// Resize dashboard list to fit in height of window
		$(window).on('resize', function(){
			try {
				resizeDashboardList.resizeDashboardListFitWin();
			} catch(e) {}
		});

		// Expand height of dashboard list up to height of main content
		$btnExpand.on('click', function(){
			if( $(this).data('expand')  == 'false' ){
				resizeDashboardList.expandDashboardListHeight();
			} else {
				resizeDashboardList.reduceDashboardListHeight();
			}
		});

	})();

	// initialize tab
	(function(){
		initTab( $('.dashboard-list') );
		initTab( $('.dbpopup') );
	})();

	// dashboard popup
	(function(){

		// open vnf-manager popup
		$('.js-open-vnf-manager').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-vnf-manager-popup').addClass('on');
			e.preventDefault();
		});

		// open vim popup
		$('.js-open-vim').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-vim-popup').addClass('on');
			e.preventDefault();
		});

		// open NFVI popup
		$('.js-open-nfvi').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-nfvi-popup').addClass('on');
			e.preventDefault();
		});

		// open vnf-instance popup
		$('.js-open-vnf-instance').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-vnf-instance-popup').addClass('on');
			e.preventDefault();
		});

		// open graph popup cpu
		$('.js-open-graph-cpu').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-graph-cpu-popup').addClass('on');
			e.preventDefault();
		});

		// open graph popup memory
		$('.js-open-graph-mem').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-graph-mem-popup').addClass('on');
			e.preventDefault();
		});

		// open graph popup disk
		$('.js-open-graph-disk').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-graph-disk-popup').addClass('on');
			e.preventDefault();
		});

		// open graph popup network
		$('.js-open-graph-net').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-graph-net-popup').addClass('on');
			e.preventDefault();
		});

		// open overload popup cpu
		$('.js-open-overload-cpu').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-overload-cpu-popup').addClass('on');
			e.preventDefault();
		});

		// open overload popup memory
		$('.js-open-overload-mem').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-overload-mem-popup').addClass('on');
			e.preventDefault();
		});

		// open overload popup disk
		$('.js-open-overload-disk').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-overload-disk-popup').addClass('on');
			e.preventDefault();
		});

		// open overload popup network
		$('.js-open-overload-net').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			$('.js-overload-net-popup').addClass('on');
			e.preventDefault();
		});

		// close dashboard popup (common)
		$('.dbpopup-close').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			e.preventDefault();
		});

	})();

	// overload top popup btn toggle
	(function(){
		$('.js-btn-overload-item').on('click', function() {
			$(this).toggleClass('on');
		});
	})();

	// dashboard popup chart
	(function(){
		$('.js-pie-chart').each(function() {
			var el = $(this).find('.dbpopup-circle-chart-bar')[0],
				num = parseInt($(this).find('.dbpopup-circle-chart-text').text(), 10);

			initPie(el, num);
		});
	})();

	/*
	 * vnf
	 */

	// initialize tab
	(function(){
		initTab( $('.state-list') );
	})();

	// host pannel
	(function(){
		var radio = $('.js-vnf-host-pannel input'),
			pannel = $('.vnf-host-list');

		radio.on('change', function() {
			var id = radio.filter(':checked').attr('value');
			pannel.removeClass('on');
			$('#' + id).addClass('on');
		});

		$(window).on('load', function() {
			radio.trigger('change');
		});
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
			try {
				statsResizeNarrow.resizeDivFitWin();
				statsResizeWide.resizeDivFitWin();
			} catch(e) {}
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

	// Select date type
	(function(){
		$('.selectric-date-type').on('change', function(){

			var indexSelectedOption = $(this).find('option').index( $(this).find('option:selected') );

			$('.period-type').addClass('hide');
			$('.select-type').addClass('hide');

			$('.period-type').eq(indexSelectedOption).removeClass('hide');
			$('.select-type').eq(indexSelectedOption).removeClass('hide');

		});
	})();

	// spinner
	(function(){

		$('.spinner-year').spinner();

	})();
	/*
	 * vim
	 */

	 // vim chart
	 (function(){
	 	$('.js-pie-chart').each(function() {
	 		var el = $(this).find('.vim-circle-chart-bar')[0],
	 			num = parseInt($(this).find('.vim-circle-chart-text').text(), 10);

	 		initPie(el, num);
	 	});
	 })();

	/*
	 * Setting
	 */

	(function(){



		$('.setting-list-item').data('selected', 'false').on('click', function(){

			if( $(this).hasClass('selected') ){
				$(this).data('selected', 'true');
			}

			if( $(this).data('selected') == 'false' ){
				$('.setting-list-item').data('selected', 'false').removeClass('selected');
				$(this).addClass('selected').data('selected', 'true');
			} else {
				$(this).removeClass('selected').data('selected', 'false');
			}
		});

	})();

	(function(){

		$('.btn-nav-fold.setting').data('fold', 'false').on('click', function(){
			if( $(this).data('fold') == 'false' ) {

				$(this).parents('.setting-nav-top').addClass('fold')
					.next('.setting-nav-content').addClass('fold');
				$(this).data('fold', 'true');

			} else {

				$(this).parents('.setting-nav-top').removeClass('fold')
					.next('.setting-nav-content').removeClass('fold');
				$(this).data('fold', 'false');

			}
		});

	})();

	 /*
	 * popup
	 */

	// React about event of layer popup
	(function(){

		// Open general popup
		$('body').on('click', '.js-open-popup', function(e){
			$('.dimmed').addClass('on');
			$('.popup').addClass('on').trigger('loadPopup');
			e.preventDefault();
		});

		// Close general popup
		$('body').on('click', '.js-close-popup', function(e){
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

		// Close Alert
		$('body').on('click', '.js-close-alert', function(e){
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

		// Confirm OK
		$('body').on('click', '.js-confirm-ok', function(e){
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

		// Confirm Cancel
		$('body').on('click', '.js-confirm-cancel', function(e){
			$('.dimmed').removeClass('on');
			$('.popup').removeClass('on');
			e.preventDefault();
		});

	})();

	// initialize tab
	(function(){
		initTab( $('.js-popup-tab') );
	})();


});