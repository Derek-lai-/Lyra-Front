$(document).ready(function()) {
    
    $(.slider_menu).hide();
    var hammertime = $(document).hammer();

    var sidebar_out = false;
    hideSidebar()

    hammertime.on("swiperleft", function(ev)) {
    	if (sidebar_out) {
    		hideSidebar();
    	} else if (!sidebar_out) {
    		showSidebar();
    	}
    });

    function hideSidebar(){
    	$('.main').animate({
    		left: '0'
    	}, 250, function() { 
    		sidebar_out = false;
    		$('.menu').hide()
		});
    }

    $('.sidebar_toggle').click(function(){
    	if (!sidebar_out) {
    		showSidebar();
    	} else {
    		hideSidebar();
    	}
    });

}