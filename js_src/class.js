// Class function
var ResizeDiv = function( $wrapper, $divTop, $divBottom ){

  var wrapperHeight = $wrapper.height();

  $divTop.resizable({
    handles:'s',
    resize: function(){

      var divTopHeight = $divTop.outerHeight();
      var divBottomHeight = wrapperHeight - divTopHeight - 4;

      $divBottom.css({height:divBottomHeight});
    }
  });

}
