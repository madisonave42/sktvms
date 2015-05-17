/******************
 * Class Function *
 ******************/

// Constant
var HEADER_HEIGHT = 160;
var DASHBOARD_MIN_HEIGHT = 756;

// Popup return function
var popAlert = function( alertMsg ){

  var $alert = '<div class="dimmed on"></div>';
  $alert += '<section class="popup popup-small-width on">';
  $alert += ' <div class="popup-content">';
  $alert += '   <div class="popup-content-section">';
  $alert += '     <div class="popup-input-wrap">';
  $alert += '       <div class="popup-msg">';
  $alert += '         <div class="popup-msg-icon left-float">';
  $alert += '           <img src="../../images/popup/ico_caution.png" alt="실패">';
  $alert += '         </div>';
  $alert += '         <div class="popup-msg-text left-float">'+ alertMsg +'</div>';
  $alert += '       </div>';
  $alert += '     </div>';
  $alert += '   </div>';
  $alert += ' </div>';
  $alert += ' <div class="popup-bottom">';
  $alert += '   <div class="right-float">';
  $alert += '     <button type="button" class="js-close-alert btn-stroke-orange left-float left">확인</button>';
  $alert += '   </div>';
  $alert += ' </div>';
  $alert += '</section>';

  return $alert;

};

var popAdd = function(){

  var $add = '<div class="dimmed on"></div>';
  $add += '<section class="popup popup-small-width on">';
  $add += '<h1 class="popup-heading">Statistics Monitoring > 페이지 추가</h1>';
  $add += ' <div class="popup-content">';
  $add += '   <div class="popup-content-section">';
  $add += '     <div class="popup-input-wrap">';
  $add += '       <label class="popup-label width-small left-float">페이지명 :</label>';
  $add += '       <input type="text" class="input-form left-float js-page-title" />';
  $add += '     </div>';
  $add += '   </div>';
  $add += ' </div>';
  $add += ' <div class="popup-bottom">';
  $add += '   <div class="right-float">';
  $add += '     <button type="button" class="btn-stroke-orange left-float left js-btn-add-page">추가</button>';
  $add += '     <button type="button" class="btn-stroke-dark left-float left js-close-popup">취소</button>';
  $add += '   </div>';
  $add += ' </div>';
  $add += '</section>';

  return $add;

};

var popDelete = function(pageTitle){
  var $popDelete = '<div class="dimmed on"></div>';
  $popDelete += '<section class="popup popup-small-width on">';
  $popDelete += ' <h1 class="popup-heading">Statistics Monitoring > 페이지 삭제</h1>';
  $popDelete += ' <div class="popup-content">';
  $popDelete += '   <div class="popup-content-section">';
  $popDelete += '     <div class="popup-input-wrap">';
  $popDelete += '       <div class="popup-msg">';
  $popDelete += '         <div class="popup-msg-icon left-float">';
  $popDelete += '           <img src="../../images/popup/ico_caution.png" alt="실패">';
  $popDelete += '         </div>';
  $popDelete += '         <div class="left-float">‘' + pageTitle + '’ 페이지를 삭제하시겠습니까?</div>';
  $popDelete += '       </div>';
  $popDelete += '     </div>';
  $popDelete += '   </div>';
  $popDelete += ' </div>';
  $popDelete += ' <div class="popup-bottom">';
  $popDelete += '   <div class="right-float">';
  $popDelete += '     <button type="button" class="btn-stroke-orange left-float left js-btn-del-page">삭제</button>';
  $popDelete += '     <button type="button" class="btn-stroke-dark left-float left js-close-popup">취소</button>';
  $popDelete += '   </div>';
  $popDelete += ' </div>';
  $popDelete += '</section>';

  return $popDelete;

};

// DOM about page & tab return function
var tabItem = function( pageTitle ){

  var $tabItem = '<li class="tab-item js-tab current">';
  $tabItem += '<div class="tab-item-title">' + pageTitle + '</div>';
  $tabItem += '<button type="button" class="btn-del js-del">delete</button>';
  $tabItem += '</li>';

  return $tabItem;

};

var pageItem = function(){

  var $pageItem = '<section class="contents-section stats-monitoring current">';
  $pageItem += '<div class="contents-section-inner stats-monitoring fill-gray">';
  $pageItem += '<ul class="container-list">';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '<li class="container-item"></li>';
  $pageItem += '</ul>';


  $pageItem += '<ul class="graph-list">';
  /*
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
  $pageItem += '<div class="graph-item"></div>';
   */
  $pageItem += '</ul>';
  $pageItem += '</div>';
  $pageItem += '</section>';


  return $pageItem;

};


// Resize box with drag
var ResizeDiv = function( $wrapper, $divTop, $divBottom ){

  // private
  var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
  var lastTopHeight = $divTop.height();
  var currentMainHeight =$(window).outerHeight() - HEADER_HEIGHT;
  var prevMainHeight = $(window).outerHeight() - HEADER_HEIGHT;
  var deltaHeight = 0;

  var divMinHeight = 100;
  var divMaxHeight = mainHeight - (divMinHeight + 22*2);

  // Set height of each section in stats
  $divTop.css({height:(mainHeight/2 - 23)});
  $divBottom.css({height:(mainHeight/2 - 23)});

  var _deltaUAHeight = function(mainHeight){
    prevMainHeight = currentMainHeight;
    currentMainHeight = mainHeight;
    deltaHeight = prevMainHeight - currentMainHeight;

    return deltaHeight;
  };

  var _resizeDivFitWin = function(){

    divMaxHeight = mainHeight - (divMinHeight + 22*2);

    mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
    if( mainHeight < 245 ){
      mainHeight = 245;
    }
    $('.main-content .wrapper.fix-height').css({height: mainHeight});

    var dUAHeight = _deltaUAHeight(mainHeight);

    if( lastTopHeight < divMinHeight ){
      lastTopHeight = divMinHeight;
    }
    else if( lastTopHeight > divMaxHeight ){
      lastTopHeight = divMaxHeight;
    }
    else{
      lastTopHeight = lastTopHeight - dUAHeight/2;
    }

    $divTop.css({height:lastTopHeight});

    var divTopHeight = $divTop.outerHeight();
    var divBottomHeight = mainHeight - divTopHeight - 24;
    $divBottom.css({height:divBottomHeight});

    $divTop.resizable({
      maxHeight:divMaxHeight
    });

  };

  $divTop.resizable({

    handles:'s',
    minHeight:divMinHeight,
    maxHeight:divMaxHeight,

    resize: function(){
      var divTopHeight = $divTop.outerHeight();
      var divBottomHeight = mainHeight - divTopHeight - 24;
      $divBottom.css({height:divBottomHeight});
    },
    stop: function(e, ui){
      $('.ui-resizable-handle').trigger('mouseup');
      lastTopHeight = ui.size.height;
    }
  });

  // privileged
  this.resizeDivFitWin = function(){
    _resizeDivFitWin();
  }

};

// Fold tree node
var FoldTree = function(){

  this.foldAction = function($clickLastNode, $clickTreeItem, $clickTreeList, hasParentChild){

    if( !hasParentChild ) {
      if ($clickTreeItem.data('fold') == 'true') {
        $clickLastNode.addClass('unfold').siblings().addClass('unfold');
        $clickTreeItem.data('fold', 'false').next('.tree-depth').addClass('unfold');
      } else {
        $clickLastNode.removeClass('unfold').siblings().removeClass('unfold');
        $clickTreeItem.data('fold', 'true').next('.tree-depth').removeClass('unfold');
      }
    } else {
      if ($clickTreeItem.data('select') == 'false') {
        $clickLastNode.attr('data-select','selected').addClass('is-select')
          .siblings().attr('data-select','selected').addClass('is-select');
        $clickTreeItem.data('select', 'true');
      } else {
        $clickLastNode.removeAttr('data-select').removeClass('is-select')
          .siblings().removeAttr('data-select').removeClass('is-select');
        $clickTreeItem.data('select', 'false');
      }
    }

  }

};

// Resize dash board list to fit in height of window
var ResizeDashboardList = function( $divDashboard, $btnExpand ){

  // private
  var graphHeight = 628;
  var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
  var dashboardListHeight = mainHeight - graphHeight;

  // Set expand button status data
  $btnExpand.data('expand', 'false');

  // Set height of dashboard list in monitoring
  $divDashboard.css({height:dashboardListHeight});

  var _resizeDashboardListExpand = function(){
    mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
    if( mainHeight < DASHBOARD_MIN_HEIGHT ){
      mainHeight = DASHBOARD_MIN_HEIGHT;
    }
    $divDashboard.css({height:mainHeight - 22});
    $btnExpand.data( 'expand', 'true' );
  };

  var _resizeDashboardListReduce = function( $dashboardList ){
    mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
    dashboardListHeight = mainHeight - graphHeight;
    $divDashboard.css({height:dashboardListHeight});
    $btnExpand.data( 'expand', 'false' );
  };

  var _resizeDashboardList = function(){
    if( $btnExpand.data('expand') == 'false' ){
      _resizeDashboardListReduce();
    } else {
      _resizeDashboardListExpand();
    }
  };

  this.resizeDashboardListFitWin = function(){
    _resizeDashboardList();
  };

  this.expandDashboardListHeight = function(){
    $btnExpand.addClass('expand');
    _resizeDashboardListExpand();
  };

  this.reduceDashboardListHeight = function(){
    $btnExpand.removeClass('expand');
    _resizeDashboardListReduce();
  };

};

// Initialize tab
var initTab = function( $hasTabArea ){

  var tabBtns = $hasTabArea.find('.js-tab-link'),
    tabCont = $hasTabArea.find('.js-tab-cont');

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

};

// Make pie chart
var initPie = function( $chartId, num ) {
  new Chartist.Pie($chartId, {
    series: [num, (100 - num)]
  }, {
    startAngle: 0,
    total: 100,
    showLabel: false
  });
};

// Add tab & page in statistics monitoring
var smTab = function(){

  // private
  var $btnDelPage = '';

  var _showAddPopup = function(){
    $('body').append( popAdd() );
    $('.js-page-title').focus();
  };

  var _showDeletePopup = function( $btnDelete ){
    var pageTitle = $btnDelete.prev('.tab-item-title').text();
    $('body').append( popDelete(pageTitle) );
  };

  var _showAlert = function( alertMsg ){
    $('body').append( popAlert(alertMsg) );
  };

  var _checkNum = function( $tabParent, status ){
    var tabNum = $tabParent.find('.tab-item').length;
    if( status == 'add' ) {
      return tabNum < 10;
    } else {
      return tabNum > 0;
    }
  };

  var _checkCurrent = function(){
    var $tabItem = $('.tab-item');
    var $pageItem = $('.contents-section.stats-monitoring');
    if( !$tabItem.hasClass('current') ){
      $tabItem.eq(0).addClass('current');
      $pageItem.eq(1).addClass('current');
    }
  };

  // privileged
  this.showPopup = function( $tabParent, status, $btnDelete ){
    if( status == 'add' ){
      if( _checkNum( $tabParent, status ) ){
        _showAddPopup();
      } else {
        _showAlert( '페이지는 10개까지 추가 할 수 있습니다.' );
      }
    } else {
      if( _checkNum( $tabParent, status ) ){
        $btnDelPage = $btnDelete;
        _showDeletePopup( $btnDelete );
      } else {
        _showAlert( '삭제할 페이지가 없습니다.' );
      }
    }
  };

  this.addPage = function( $tabParent, pageTitle, $pageParent ){
    $tabParent.find('.tab-item').removeClass('current');
    $pageParent.find('.contents-section.stats-monitoring').removeClass('current');
    $tabParent.append( tabItem( pageTitle ) );
    $pageParent.append( pageItem() );
    $('.dimmed').remove();
    $('.popup').remove();
    $(window).trigger('addPage');
  };

  this.delPage = function(){
    var $tabItem = $('.tab-item');
    var $pageItem = $('.contents-section.stats-monitoring');
    var $delTab = $btnDelPage.parents('.tab-item');
    var delPageIndex = $tabItem.index( $delTab ) + 1;
    $delTab.remove();
    $pageItem.eq(delPageIndex).remove();
    $('.dimmed').remove();
    $('.popup').remove();
    _checkCurrent();
  };

  this.active = function( $activeTab ){
    var activeIndex = $('.tab-item').index( $activeTab ) + 1;
    $activeTab.addClass('current').siblings().removeClass('current');
    $('.contents-section.stats-monitoring').eq(activeIndex).addClass('current').siblings().removeClass('current');
  };

  this.tabMove = function( direction, $tabItem, $pageItem, currentIndex ){
    if( direction == 'prev' && currentIndex > 0 ){
      $tabItem.eq(currentIndex).insertBefore( $tabItem.eq(currentIndex-1) );
      $pageItem.eq(currentIndex+1).insertBefore( $pageItem.eq(currentIndex) );
    } else if( direction == 'next' && currentIndex < $tabItem.length ) {
      $tabItem.eq(currentIndex).insertAfter( $tabItem.eq(currentIndex+1) );
      $pageItem.eq(currentIndex+1).insertAfter( $pageItem.eq(currentIndex+2) );
    }
  }

};

// Resize container
var ResizeContainer = function( $container ){

  var _resizeContainerFitWin = function(){
    var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
    $container.css({height:(mainHeight - 68) / 4});
  };

  _resizeContainerFitWin();

  this.resizeContainerFitWin = function(){
    _resizeContainerFitWin();
  };

};

// Resize graph
var ResizeGraph = function(){

  var _resizeGraphContainer = function(){

    // resize
    var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;

    $('.graph-item').css({height:  (mainHeight - 68) / 4});
    $('.graph-item.m1x1').css({height:  (mainHeight - 68) / 4});

    $('.graph-item.m1x2').css({height:( (mainHeight - 68) / 4 ) * 2 + 6});
    $('.graph-item.m2x1').css({height:  (mainHeight - 68) / 4});
    $('.graph-item.m2x2').css({height:( (mainHeight - 68) / 4 ) * 2 + 6});

    $('.graph-item.m1x3').css({height:( (mainHeight - 68) / 4 ) * 3 + 12});
    $('.graph-item.m3x1').css({height:  (mainHeight - 68) / 4});
    $('.graph-item.m2x3').css({height:( (mainHeight - 68) / 4 ) * 3 + 12});
    $('.graph-item.m3x2').css({height:( (mainHeight - 68) / 4 ) * 2 + 6});
    $('.graph-item.m3x3').css({height:( (mainHeight - 68) / 4 ) * 3 + 12});

    $('.graph-item.m1x4').css({height:( (mainHeight - 68) / 4 ) * 4 + 18});
    $('.graph-item.m4x1').css({height:  (mainHeight - 68) / 4});
    $('.graph-item.m2x4').css({height:( (mainHeight - 68) / 4 ) * 4 + 18});
    $('.graph-item.m4x2').css({height:( (mainHeight - 68) / 4 ) * 2 + 6});
    $('.graph-item.m3x4').css({height:( (mainHeight - 68) / 4 ) * 4 + 18});
    $('.graph-item.m4x3').css({height:( (mainHeight - 68) / 4 ) * 3 + 12});
    $('.graph-item.m4x4').css({height:( (mainHeight - 68) / 4 ) * 4 + 18});

  };

  // reposition
  var _repositionGraphContainer = function(){
    //var o = $('.container-item').eq(0).offset();
    //console.log( $('.container-item').eq(1 * 4).offset().top );

    $('.graph-item').each(function(i){

      var floorIndex = $(this).attr('data-floor') * 4;
      var firstFloorTop = $('.container-item').eq(0).offset().top;
      var floorTop = $('.container-item').eq(floorIndex).offset().top - firstFloorTop;

      console.log( floorTop );

      $(this).css({
        top: floorTop
      })

    });
  };

  _resizeGraphContainer();

  this.resizeGraphContainer = function(){
    _resizeGraphContainer();
    _repositionGraphContainer();
  }


};

// Add graph
var Graph = function(){

  // private
  var $globalContainer;

  var _dragNDrop = function(currentGridOffset, firstGridOffset ){

    var top = currentGridOffset.top - firstGridOffset.top;
    var left = currentGridOffset.left - firstGridOffset.left;

    var $graphItem = $('.graph-item');

    $graphItem.eq( $graphItem.length-1 ).draggable({
      snap: '.container-item',
      snapMode: 'inner'
    }).css({
      position:'absolute',
      top: top,
      left:left,
      background:'red'
    });

    $('.container-item').droppable();
  };

  // privileged

  this.showPopup = function( $containerCurrent ){

    $globalContainer = $containerCurrent;

    $.get('mp7-1_add_graph_test.html ', function(data){

      $('body').append( data );

      $('.select').selectric();
      $('.spinner').spinner();

      var addIndex = $('.container-item').index( $globalContainer );
      $('.stats-map-item-state').eq(addIndex).addClass('active');
    });

  };

  this.addGraph = function(){

    console.log( $globalContainer );

    var floor;
    var containerItem = $('.container-item');
    var index = containerItem.index( $globalContainer );
    var firstGridOffset = containerItem.eq(0).offset();
    var currentGridOffset = $globalContainer.offset();

    var $graphNode = $('<div class="graph-item"></div>');

    if( (index-4) < 0 ){ floor = 0; }
    else if( (index-4) < 4 ){ floor = 1; }
    else if( (index-4) < 8 ){ floor = 2; }
    else if( (index-4) < 12 ){ floor = 3; }

    $graphNode.attr('data-floor', floor).appendTo( '.graph-list' );

    _dragNDrop(currentGridOffset, firstGridOffset);

    $('.dimmed').remove();
    $('.popup').remove();
    $(window).trigger('addGraph');

  };

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

$(function(){

	/*
	 * Common
	 */

	// Set height of main-content
	(function(){
		var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
		$('.main-content .wrapper.fix-height').css({height: mainHeight});
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
	$('.spinner').spinner();

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
			//ct = new Graph();
			ct.showPopup( $(this) );
		});

		$body.on('click', '.js-btn-add-graph', function(){
			ct.addGraph();
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
			dragContainer.resizeContainerFitWin();
			dragGraph.resizeGraphContainer();
		});

	})();

	// Resize dashboard list
	(function(){
		var $btnExpand = $('.js-expand');
		//$btnExpand.data('expand', 'false');

		var resizeDashboardList = new ResizeDashboardList( $('.dashboard-list'), $btnExpand );

		// Resize dashboard list to fit in height of window
		$(window).on('resize', function(){
			resizeDashboardList.resizeDashboardListFitWin();
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
	(function() {

		// open vnf-manager popup
		$('.js-open-vnf-manager').on('click', function(e) {
			$('.js-vnf-manager-popup').addClass('on');
			e.preventDefault();
		});

		// open vim popup
		$('.js-open-vim').on('click', function(e) {
			$('.js-vim-popup').addClass('on');
			e.preventDefault();
		});

		// open NFVI popup
		$('.js-open-nfvi').on('click', function(e) {
			$('.js-nfvi-popup').addClass('on');
			e.preventDefault();
		});

		// open vnf-instance popup
		$('.js-open-vnf-instance').on('click', function(e) {
			$('.js-vnf-instance-popup').addClass('on');
			e.preventDefault();
		});

		// close dashboard popup (common)
		$('.dbpopup-close').on('click', function(e) {
			$('.dbpopup').removeClass('on');
			e.preventDefault();
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
	 * popup
	 */

	// React about event of layer popup
	(function(){

		// Open general popup
		$('body').on('click', '.js-open-popup', function(e){
			$('.dimmed').addClass('on');
			$('.popup').addClass('on');
			e.preventDefault();
		});

		// Close general popup
		$('body').on('click', '.js-close-popup', function(e){
			$('.dimmed').remove();
			$('.popup').remove();
			e.preventDefault();
		});

		// Close Alert
		$('body').on('click', '.js-close-alert', function(e){
			$('.dimmed').remove();
			$('.popup').remove();
			e.preventDefault();
		});

		// Confirm OK
		$('body').on('click', '.js-confirm-ok', function(e){
			$('.dimmed').remove();
			$('.popup').remove();
			e.preventDefault();
		});

		// Confirm Cancel
		$('body').on('click', '.js-confirm-cancel', function(e){
			$('.dimmed').remove();
			$('.popup').remove();
			e.preventDefault();
		});

	})();

});