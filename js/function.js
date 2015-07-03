/******************
 * Class Function *
 ******************/

// Constant
var HEADER_HEIGHT = 160;
var TITLE_HEIGHT = 73;
var DASHBOARD_MIN_HEIGHT = 766;

// Popup function

/* 변경 */
var popHide = function(){
  $('.dimmed').removeClass('on');
  $('.popup').removeClass('on');
};

var popAlert = function( alertMsg ){
  $('.dimmed').addClass('on');
  $('.popup.alert').addClass('on').trigger('loadPopup');

  $('.popup-msg-text').text(alertMsg);

};

var popAddPage = function(){
  $('.dimmed').addClass('on');
  $('.popup.add-page').addClass('on').trigger('loadPopup');

  $('.js-page-title').val('').focus();
};

var popDelete = function(pageTitle){
  $('.dimmed').addClass('on');
  $('.popup.delete-page').addClass('on').trigger('loadPopup');

  $('.js-tab-title').text( pageTitle );
};

var popAddGraph = function(){
  $('.dimmed').addClass('on');
  $('.popup.add-graph').addClass('on').trigger('loadPopup');

  $('.select').selectric();
  $('.spinner').spinner({
    max:4,
    min:1
  });
};
/* 변경 */

// DOM about page & tab & graph return function
var tabItem = function( pageTitle ){

  var $tabItem = '<li id="tab-item" class="tab-item js-tab current">';
  $tabItem += '<div class="tab-item-title js-title">' + pageTitle + '</div>';
  $tabItem += '<input type="text" value="'+ pageTitle +'" class="tab-item-input hide" />';
  $tabItem += '<button type="button" class="btn-del js-del">delete</button>';
  $tabItem += '</li>';

  return $tabItem;

};

var pageItem = function( pageIndex ){

  var $pageItem = '<section class="contents-section stats-monitoring current">';
  $pageItem += '<div class="contents-section-inner stats-monitoring fill-gray">';
  $pageItem += '<ul class="container-list page' + pageIndex + '">';
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

  $pageItem += '<ul class="graph-list page' + pageIndex + '">';
  $pageItem += '</ul>';
  $pageItem += '</div>';
  $pageItem += '</section>';

  return $pageItem;

};

var graphItemNode = function( graphGridClass, graphTitle ){

  var $graphItem =
    '<div class="graph-item-draggable">' +
      '<div class="graph-item ' + graphGridClass + '">' +
        '<div class="graph-top">' +
          '<div class="graph-title">' + graphTitle + '</div>' +
          '<div class="graph-btn-group">' +
            '<button type="button" class="graph-btn setting"></button>' +
            '<button type="button" class="graph-btn enlarge"></button>' +
            '<button type="button" class="graph-btn close">close</button>' +
          '</div>' +
        '</div>' +
        '<div class="graph-content"></div>' +
      '</div>' +
    '</div>';

  return $graphItem;

};

var enlargeGraphItem = function(graphTitle){

  var $enalrgeGraphItem = '<div class="enlarge-graph-item">' +
    '<div class="enlarge-graph-top">' +
    '<div class="enlarge-graph-title">' + graphTitle + '</div>' +
    '<div class="enlarge-graph-btn-group">' +
    '<button type="button" class="enlarge-graph-btn close">close</button>' +
    '</div>' +
    '</div>' +
    '<div class="enlarge-graph-content"></div>' +
    '</div>';

  return $enalrgeGraphItem;

};


// Resize box with drag
var ResizeDiv = function( $wrapper, $divTop, $divBottom ){

  // private
  var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;

  // Set height of each section in stats
  $divTop.css({height:(mainHeight/2 - 23)});
  $divBottom.css({height:(mainHeight/2 - 23)});

  var lastTopHeight = $divTop.height();
  var currentMainHeight =$(window).outerHeight() - HEADER_HEIGHT;
  var prevMainHeight = $(window).outerHeight() - HEADER_HEIGHT;
  var deltaHeight = 0;

  var divMinHeight = 100;
  var divMaxHeight = mainHeight - (divMinHeight + 22*2);

  var _deltaUAHeight = function(mainHeight){
    prevMainHeight = currentMainHeight;
    currentMainHeight = mainHeight;
    deltaHeight = prevMainHeight - currentMainHeight;

    return deltaHeight;
  };

  var _resizeDivFitWin = function(){

    divMaxHeight = mainHeight - (divMinHeight + 22*2);

    mainHeight = $(window).outerHeight() - HEADER_HEIGHT;

    if( mainHeight < 400 ){
      mainHeight = 400;
    }

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
  if( $('.main-header').length == 0 ) {
    mainHeight += TITLE_HEIGHT;
  }
  if( mainHeight <= 766 ){
    mainHeight = 766;
  }
  var dashboardListHeight = mainHeight - graphHeight;

  // Set expand button status data
  $btnExpand.data('expand', 'false');

  // Set height of dashboard list in monitoring
  $divDashboard.css({height:dashboardListHeight});

  var _resizeDashboardListExpand = function(){
    mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
    if( $('.main-header').length == 0 ) {
      mainHeight += TITLE_HEIGHT;
    }
    if( mainHeight < DASHBOARD_MIN_HEIGHT ){
      mainHeight = DASHBOARD_MIN_HEIGHT;
    }
    $divDashboard.css({height:mainHeight - 22});
    $btnExpand.data( 'expand', 'true' );
  };

  var _resizeDashboardListReduce = function( $dashboardList ){
    mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
    if( $('.main-header').length == 0 ) {
      mainHeight += TITLE_HEIGHT;
    }
    if( mainHeight <= 766 ){
      mainHeight = 766;
    }
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
  var pageIndex = 0;

  /* 삭제

  var _showAddPopup = function(){
    //$('body').append( popAddPage() );
    popAddPage();
  };

  var _showDeletePopup = function( $btnDelete ){
    var pageTitle = $btnDelete.prev('.tab-item-title').text();
    //$('body').append( popDelete(pageTitle) );
    popDelete( $btnDelete.prev('.tab-item-title').text() );
  };

   var _showAlert = function( alertMsg ){
   popAlert(alertMsg);
   };

  */

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

  /* 변경 */
  this.showPopup = function( $tabParent, status, $btnDelete ){
    if( status == 'add' ){
      if( _checkNum( $tabParent, status ) ){
        popAddPage();
      } else {
        popAlert( '페이지는 10개까지 추가 할 수 있습니다.' );
      }
    } else {
      if( _checkNum( $tabParent, status ) ){
        $btnDelPage = $btnDelete;
        popDelete( $btnDelete.prev('.tab-item-title').text() );
      } else {
        popAlert( '삭제할 페이지가 없습니다.' );
      }
    }
  };

  this.addPage = function( $tabParent, pageTitle, $pageParent ){
    pageIndex++;
    $tabParent.find('.tab-item').removeClass('current');
    $pageParent.find('.contents-section.stats-monitoring').removeClass('current');
    $tabParent.append( tabItem( pageTitle ) );
    $pageParent.append( pageItem( pageIndex ) );
    popHide();
    $(window).trigger('addPage');
  };

  this.delPage = function(){
    var $tabItem = $('.tab-item');
    var $pageItem = $('.contents-section.stats-monitoring');
    var $delTab = $btnDelPage.parents('.tab-item');
    var delPageIndex = $tabItem.index( $delTab ) + 1;
    $delTab.remove();
    $pageItem.eq(delPageIndex).remove();
    popHide();
    _checkCurrent();
  };
  /* 변경 */

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

    $('.graph-item-draggable').css({
      //width:
      height:  (mainHeight - 68) / 4
    });
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

    $('.graph-item').each(function(i){

      var floorIndex = $(this).attr('data-floor') * 4;
      var firstFloorTop = $('.container-item').eq(0).offset().top;
      var floorTop = $('.container-item').eq(floorIndex).offset().top - firstFloorTop;

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
  var $globalContainerParent;

  var graphIndex = 0;

  var destinationIndex;
  var $droppedGraph;

  var viaGrid = [];
  var viaIndex = 0;

  var $changeGraphItem;
  var originCol;
  var originRow;

  var _addMarkGrid = function(graphIndex, firstGridIndex, gridCol, gridRow){

    for(var i=0; i<gridRow; i++){
      for( var j=0; j<gridCol; j++ ){

        var firstLinearIndex = firstGridIndex + ( j + 4 * i );
        //console.log( 'col : ' + j + ' - ' + 'row : ' + i + ' : origin :' + firstLinearIndex );
        $('.contents-section.stats-monitoring.current')
          .find('.container-list').find('.container-item').eq(firstLinearIndex).attr({
            'data-used' : 'used',
            'data-graph' : graphIndex
          });

      }
    }

  };

  var _reMarkGrid = function(dataGraph, originGridIndex, destinationGridIndex, gridCol, gridRow){

    var page =  $('.contents-section.stats-monitoring').index(  $('.contents-section.stats-monitoring.current') );

    for(var i=0; i<gridRow; i++){
      for( var j=0; j<gridCol; j++ ){

        var originLinearIndex = parseInt(originGridIndex) + ( j + 4 * i );
        console.log( 'orgin : ' + originGridIndex + ' : col : ' + j + ' - ' + 'row : ' + i + ' : source : ' + originLinearIndex );
        //console.log(originLinearIndex);
        $('.container-list.page' + page).find('.container-item').eq(originLinearIndex).removeAttr('data-used data-graph');

      }
    }

    for(var i=0; i<gridRow; i++){
      for( var j=0; j<gridCol; j++ ){

        var destinationLinearIndex = parseInt(destinationGridIndex) + ( j + 4 * i );
        console.log( 'dest : ' + destinationGridIndex + ' : col : ' + j + ' - ' + 'row : ' + i + ' : destin : ' + destinationLinearIndex );
        //console.log(destinationLinearIndex);
        $('.container-list.page' + page).find('.container-item').eq(destinationLinearIndex).attr({
          'data-used' : 'used',
          'data-graph' : dataGraph
        });
      }
    }

  };

  var _reMarkGridResize = function(dataGraph, gridIndex, originGridCol, originGridRow, newGridCol, newGridRow){

    var page =  $('.contents-section.stats-monitoring').index(  $('.contents-section.stats-monitoring.current') );

    for(var i=0; i<originGridRow; i++){
      for( var j=0; j<originGridCol; j++ ){

        var originLinearIndex = parseInt(gridIndex) + ( j + 4 * i );
        console.log( 'orgin : ' + gridIndex + ' : col : ' + j + ' - ' + 'row : ' + i + ' : source : ' + originLinearIndex );
        //console.log(originLinearIndex);
        $('.container-list.page' + page).find('.container-item').eq(originLinearIndex).removeAttr('data-used data-graph');

      }
    }

    for(var i=0; i<newGridRow; i++){
      for( var j=0; j<newGridCol; j++ ){

        var destinationLinearIndex = parseInt(gridIndex) + ( j + 4 * i );
        console.log( 'dest : ' + gridIndex + ' : col : ' + j + ' - ' + 'row : ' + i + ' : destin : ' + destinationLinearIndex );
        //console.log(destinationLinearIndex);
        $('.container-list.page' + page).find('.container-item').eq(destinationLinearIndex).attr({
          'data-used' : 'used',
          'data-graph' : dataGraph
        });
      }
    }

  };

  var _delMarkGrid = function(gridIndex, originGridCol, originGridRow){

    var page =  $('.contents-section.stats-monitoring').index(  $('.contents-section.stats-monitoring.current') );

    for(var i=0; i<originGridRow; i++){
      for( var j=0; j<originGridCol; j++ ){

        var originLinearIndex = parseInt(gridIndex) + ( j + 4 * i );
        console.log( 'orgin : ' + gridIndex + ' : col : ' + j + ' - ' + 'row : ' + i + ' : source : ' + originLinearIndex );
        //console.log(originLinearIndex);
        $('.container-list.page' + page).find('.container-item').eq(originLinearIndex).removeAttr('data-used data-graph');

      }
    }

  };

  var _checkHasGraph = function( destinationGrid, moveGraph ){

    var checkFlag = false;
    var destinationGridIndex = $('.contents-section.stats-monitoring.current').find('.container-list').find('.container-item').index( destinationGrid );

    for(var i=0; i<moveGraph.attr('data-row'); i++){
      for( var j=0; j<moveGraph.attr('data-col'); j++ ){

        var destinationLinearIndex = destinationGridIndex + ( j + 4 * i );

        var gridGraphNum = $('.contents-section.stats-monitoring.current').find('.container-list').find('.container-item').eq(destinationLinearIndex).attr('data-graph');

        if( gridGraphNum != undefined && moveGraph.attr('data-graph') != gridGraphNum ){
          checkFlag = true;
        } else if( checkFlag != true ) {
          checkFlag = false;
        }

      }
    }

    return checkFlag;

  };

  var _dragNDrop = function($graphNode, graphTitle, gridIndex, graphIndex, gridCol, gridRow, currentGridOffset, firstGridOffset ){

    var left = currentGridOffset.left - firstGridOffset.left;
    var top = currentGridOffset.top - firstGridOffset.top;

    // draggable
    $graphNode.attr({
      'data-graph' : graphIndex,
      'data-grid' : gridIndex,
      'data-col' : gridCol,
      'data-row' : gridRow

    }).data({
      'left' : left,
      'top' : top,
      'graphTitle' : graphTitle

    }).draggable({
      addClasses: false,
      snap: '.container-item',
      snapMode: 'inner',
      snapTolerance: 35,
      revertDuration:100,
      create: function(){

        _addMarkGrid(graphIndex, gridIndex, gridCol, gridRow);

      },

      revert: function(ui){

        if( ui === false ){
          return true;

        } else if(  _checkHasGraph( $(ui[0]), $(this) ) ){
          //if( $(ui[0]).attr('data-graph') != $(this).attr('data-graph') ) {
          return true;

        } else {
          _reMarkGrid($droppedGraph.attr('data-graph'), viaGrid[0], destinationIndex, $droppedGraph.attr('data-col'), $droppedGraph.attr('data-row'));
          return false;
        }

      }

    }).css({
      position:'absolute',
      left:left,
      top: top
    });

    // droppable
    $('.container-item').droppable({
      tolerance:'fit',

      out: function(event, ui){
        //console.log(viaIndex);
        viaGrid[viaIndex] = $('.contents-section.stats-monitoring.current').find('.container-list').find('.container-item').index( $(this) );
        //console.log('current' + viaIndex + ' : ' + viaGrid[viaIndex]);
        viaIndex++;
      },

      drop: function(event, ui){
        var destinationPosition = ui.position;
        destinationIndex =  $('.contents-section.stats-monitoring.current').find('.container-list').find('.container-item').index( $(this) );
        $droppedGraph = $(ui.draggable);

        $droppedGraph.attr({
          'data-grid' : destinationIndex
        }).data({
          'left' : destinationPosition.left,
          'top' : destinationPosition.top
        });

        //console.log('origin : ' + viaGrid[0] + ' : destination : ' + destinationIndex);
        //console.log('graph : ' + $(ui.draggable).attr('data-graph') + ' : Col : ' + $droppedGraph.attr('data-col') + ' : Row : ' + $droppedGraph.attr('data-row'));

        viaIndex = 0;

//        _reMarkGrid($droppedGraph.attr('data-graph'), viaGrid[0], destinationIndex, $droppedGraph.attr('data-col'), $droppedGraph.attr('data-row'));
      }
    });
  };

  // privileged

  /* 변경 */

  this.showPopup = function( $containerCurrent, $containerCurrentParent ){

    $globalContainer = $containerCurrent;
    $globalContainerParent = $containerCurrentParent;

    var addIndex = $globalContainerParent.find('.container-item').index( $globalContainer );

    $('.stats-map-item-state').removeClass('used active');

    popAddGraph();

    $('.contents-section.stats-monitoring.current .container-list .container-item').each(function(i){
      if($('.contents-section.stats-monitoring.current .container-list .container-item').eq(i).attr('data-used') == 'used' ){
        $('.stats-map-item-state').eq(i).addClass('used');
      }
    });

    $('.stats-map-item-state').eq(addIndex).addClass('active');

    $('.js-btn-add-graph').removeClass('change').addClass('new');
    $('.popup-graph-title').val('').focus();

  };

  this.addGraph = function( graphTitle, gridCol, gridRow ){

    //var floor;
    var pageIndex = $('.contents-section-inner.stats-monitoring').index($globalContainerParent);
    var gridIndex = $globalContainerParent.find('.container-item').index( $globalContainer );
    var firstGridOffset = $globalContainerParent.find('.container-item').eq(0).offset();
    var currentGridOffset = $globalContainer.offset();
    var graphGridClass = 'm' + gridCol + 'x' + gridRow;

    var $graphNode = $( graphItemNode( graphGridClass, graphTitle ) );

    graphIndex++;

    $graphNode.appendTo( $('.graph-list.page' + pageIndex) );

    _dragNDrop($graphNode, graphTitle, gridIndex, graphIndex, gridCol, gridRow, currentGridOffset, firstGridOffset);

    popHide();
    $(window).trigger('addGraph');

  };

  this.showSetPopup = function( $thisGraphItem, thisTitle, thisGridCol, thisGridRow ){

    $changeGraphItem = $thisGraphItem;
    originCol = thisGridCol;
    originRow = thisGridRow;

    popAddGraph();

    $('.popup-graph-title').val(thisTitle).focus();
    $('.spinner.col').val(thisGridCol);
    $('.spinner.row').val(thisGridRow);

    //$('.stats-map-item-state').eq(thisIndex).addClass('active');
    $('.js-btn-add-graph').removeClass('new').addClass('change');

  };

  this.changeGraph = function( changeGraphTitle, newGridCol, newGridRow ){

    var className4Origin = 'm' + originCol + 'x' + originRow;
    var className4New = 'm' + newGridCol + 'x' + newGridRow;

    var gridIndex = $changeGraphItem.attr('data-grid');
    var graphIndex = $changeGraphItem.attr('data-graph');
    var firstGridOffset = $globalContainerParent.find('.container-item').eq(0).offset();
    var currentGridOffset = $changeGraphItem.offset();

    _reMarkGridResize( graphIndex, gridIndex, originCol, originRow,  newGridCol, newGridRow);

    $changeGraphItem.find('.graph-title').text(changeGraphTitle);
    $changeGraphItem.find('.graph-item').removeClass(className4Origin).addClass(className4New);

    _dragNDrop($changeGraphItem, changeGraphTitle, gridIndex, graphIndex, newGridCol, newGridRow, currentGridOffset, firstGridOffset);

    popHide();
    $(window).trigger('addGraph');

  };

  this.delGraph = function( $delGraphItem ){

    var gridIndex = $delGraphItem.attr('data-grid');
    var originGridCol = $delGraphItem.attr('data-col');
    var originGridRow = $delGraphItem.attr('data-row');

    _delMarkGrid(gridIndex, originGridCol, originGridRow);

    $delGraphItem.remove();

  };

  /* 변경 */

};

// Enlarge graph
var EnlargeGraph = function( $contentsSection, graphTitle ){
  $contentsSection.append( enlargeGraphItem(graphTitle) );
};

// set height overload popup graph
var setOverloadGraphHeight = function() {
  var targetPop = $('.js-overload-popup'),
    listHeight = targetPop.find('.dbpopup-overload-list-wrap').height();
    graphArea = targetPop.find('.dbpopup-overload-graph');

    graphArea.height(524 - listHeight);
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
		var $fixWrapper = $('.main-content .wrapper.fix-height');
		var $varWrapper = $('.main-content .wrapper.var-height');

		if( $('.main-header').length == 0 ) {
			mainHeight += TITLE_HEIGHT;
			$('.header').addClass('no-title');
		}

		// fix wrapper
		$fixWrapper.css({height: mainHeight});

		// variable wrapper
		if( $varWrapper.length !=0 && $varWrapper.height() <= mainHeight ){
			$varWrapper.css({height: mainHeight});
		}

		$(window).on('resize', function(){
			var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;

			if( $('.main-header').length == 0 ) {
				mainHeight += TITLE_HEIGHT;
			}

			if( mainHeight < 400 ){
				mainHeight = 400;
			}
			$('.main-content .wrapper.fix-height').css({height: mainHeight});
		});

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

	var ct = [];
	var paging = 1;

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

		$body.on('dblclick', '.js-title', function(){
			$(this).next('.tab-item-input').removeClass('hide').focus();
		});

		$body.on('click', function(e){
			if( !$(e.target).closest('#tab-item').length ){

				$('.tab-item-input').each(function(){
					var inputVal = $(this).addClass('hide').val();
					$(this).prev('.tab-item-title').text( inputVal );
				});

			}
		});

		$body.on('click', '.js-btn-add-page', function(){
			var pageTitle = $('.js-page-title').val();
			tab.addPage( $tabParent, pageTitle, $pageParent );
			ct[paging] = new Graph();
			paging++;
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

	// Add Graph
	(function(){

		var $body = $('body');
		var currentPageIndex;
		//var ct = new Graph();

		$body.on('click', '.container-item', function(){
			var $currentPage = $(this).closest('.contents-section.stats-monitoring.current');
			currentPageIndex = $('.contents-section.stats-monitoring').index( $currentPage );

			ct[currentPageIndex].showPopup( $(this), $(this).parents('.contents-section-inner.stats-monitoring') );
		});

		$body.on('click', '.js-btn-add-graph.new', function(){

			var graphTitle = $('.popup-graph-title').val();
			var gridCol = $('.spinner.col').val();
			var gridRow = $('.spinner.row').val();

			ct[currentPageIndex].addGraph( graphTitle, gridCol, gridRow );
		});

	})();

	// Edit Graph - Button event graph container
	(function(){

		var $body = $('body');
		var currentPageIndex;
		//var setGraph = new SetGraph();

		$body.on('click', '.graph-btn.setting', function(){

			var $thisGraphItem = $(this).closest('.graph-item-draggable');
			var thisTitle = $thisGraphItem.data('graphTitle');
			var thisGridCol = $thisGraphItem.attr('data-col');
			var thisGridRow = $thisGraphItem.attr('data-row');

			var $currentPage = $(this).closest('.contents-section.stats-monitoring.current');
			currentPageIndex = $('.contents-section.stats-monitoring').index( $currentPage );

			ct[currentPageIndex].showSetPopup( $thisGraphItem, thisTitle, thisGridCol, thisGridRow );

		});

		$body.on('click','.js-btn-add-graph.change', function(){

			var graphTitle = $('.popup-graph-title').val();
			var gridCol = $('.spinner.col').val();
			var gridRow = $('.spinner.row').val();

			ct[currentPageIndex].changeGraph(graphTitle, gridCol, gridRow);
		});

		$body.on('click', '.graph-btn.enlarge', function(){
			var graphTitle = $(this).parents('.graph-top').find('.graph-title').text();
			var enlarge = new EnlargeGraph( $(this).parents('.contents-section-inner.stats-monitoring'), graphTitle );
		});

		$body.on('click', '.graph-btn.close', function(){
			var $currentPage = $(this).closest('.contents-section.stats-monitoring.current');
			currentPageIndex = $('.contents-section.stats-monitoring').index( $currentPage );

			var $delGraphItem = $(this).closest('.graph-item-draggable');

			ct[currentPageIndex].delGraph( $delGraphItem );
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

		// open computehost popup
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
			setOverloadGraphHeight();
			$('.dbpopup').removeClass('on');
			$('.js-overload-popup').addClass('on');
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

	// vnf package module size & horizontal scroll
	(function(){

		if( $('div').is('.update-module-group') ){

			var moduleLength = $('.update-module').length;
			var moduleWidth = moduleLength * 202 + 327;

			var flowLength = $('.update-flow-module').length;
			var flowHeight = flowLength * 190 + 154;

			$('.update-module-group, .update-flow').css({
				width: moduleWidth,
				height: flowHeight
			});
		}

	})();

	// vnf package update error menu
	(function() {
		var btn = $('.js-show-flow-function'),
			menus;

		if (btn.length > 0) {
			menus = $('.update-flow-function-menu');

			btn.each(function() {
				$(this).on('click', function(e) {
					e.preventDefault();
					var menu = $(this).closest('.update-flow-function').find('.update-flow-function-menu');

					if ($(this).hasClass('on')) {
						$(this).removeClass('on');
						menu.removeClass('on');
					}	else {
						btn.removeClass('on');
						menus.removeClass('on');

						$(this).addClass('on');
						menu.addClass('on');
					}

				});
			});

			$('body').on('click', function(e) {
				if (!$(e.target).closest('.update-flow-function').length) {
					btn.removeClass('on');
					menus.removeClass('on');
				}
			});
		}
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