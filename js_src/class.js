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
