$(document).ready(function() {
	$(".m-menu").click(function(){
	
		$("#container").toggleClass("active");
		$(".m-menu").toggleClass("active");
		$(".mobile-menu").toggleClass("active");
		$(".mobile-menu-bg").addClass("active");
	});
	
	$(".mobile-menu").css('left','-30%');
	$(".mobile-menu-bg").css('left','-30%');
	$(".m-menu").toggle(function() {
		$('.mobile-menu').animate({ left: '0' }, { duration: 200, queue: false });
		$('.mobile-menu-bg').animate({ left: '0' }, { duration: 200, queue: false });
		$('#container').animate({ 'margin-left': '30%' }, { duration: 200, queue: false });
		$('#container').animate({ 'margin-right': '-30%' }, { duration: 200, queue: false });
	}, function() {       
		$('.mobile-menu-bg').animate({ left: '-30%' }, { duration: 200, queue: false });
		$('.mobile-menu').animate({ left: '-30%' }, { duration: 200, queue: false });
		$('#container').animate({ 'margin-left': '0' }, { duration: 200, queue: false });
		$('#container').animate({ 'margin-right': '0' }, { duration: 200, queue: false });
	}
	);
})