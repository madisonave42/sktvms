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
}

$(function(){

	// stats
	var statsResizeNarrow = new ResizeDiv( $('.wrapper.fix-height'), $('.stats-resizable.narrow.top'), $('.stats-resizable.narrow.bottom'));
	var statsResizeWide = new ResizeDiv( $('.wrapper.fix-height'), $('.stats-resizable.wide.top'), $('.stats-resizable.wide.bottom'));



});