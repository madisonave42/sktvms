// Class function
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

	// common
	(function(){

		//header user menu
		$('.header-user-path').data('open', 'false').on('click', function(){
			if( $(this).data('open') == 'false' ) {
				$(this).data('open', 'true').addClass('on').next().addClass('on');
			} else {
				$(this).data('open', 'false').removeClass('on').next().removeClass('on');
			}
		});

		// custom select box
		$('.select').selectric();

		// custom select box in table
		$('.tb-form-select').selectric();

		// tree
		$('.tree-item').data({
			'fold' : 'true',
			'select' : 'false'
		});

		$('.js-fold').on('click', function(){

			var $clickTreeItem = $(this).parent('.tree-item');
			var $clickTreeList = $clickTreeItem.parent('.tree-list');
			var hasParentChild = $clickTreeList.hasClass('no-children');

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
		});

	})();

	// vnf
	(function(){

	})();

	// stats
	(function(){
		var $wrapper = $('.wrapper.fix-height');
		var statsResizeNarrow = new ResizeDiv( $wrapper, $('.stats-resizable.narrow.top'), $('.stats-resizable.narrow.bottom'));
		var statsResizeWide = new ResizeDiv( $wrapper, $('.stats-resizable.wide.top'), $('.stats-resizable.wide.bottom'));
	})();



});