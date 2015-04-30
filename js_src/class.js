/******************
 * Class Function *
 ******************/

// Constant
var HEADER_HEIGHT = 160;

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
      console.log('?');
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

// Resize dash board list to fit in height of window
var ResizeDashboardList = function($divDashboard){

  // private
  var graphHeight = 624;
  var mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
  var dashboardListHeight = mainHeight - graphHeight;

  // Set height of dashboard list in monitoring
  $divDashboard.css({height:dashboardListHeight});

  this.resizeDashboardListFitWin = function(){
    mainHeight = $(window).outerHeight() - HEADER_HEIGHT;
    dashboardListHeight = mainHeight - graphHeight;
    $divDashboard.css({height:dashboardListHeight});
  };

  this.expandDashboardListHeight = function(){

  };

  this.reduceDashboardListHeight = function(){

  };

};