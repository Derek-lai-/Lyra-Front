$(document).ready(function() {
	$(".m-menu").click(function(){
	
		$("#container").toggleClass("active");
		$(".m-menu").toggleClass("active");
		$(".mobile-menu").toggleClass("active");
		$(".mobile-menu-bg").addClass("active");
	});
	
	$(".mobile-menu").css('left','-36%');
	$(".mobile-menu-bg").css('left','-36%');
	$(".m-menu").toggle(function() {
		$('.mobile-menu').animate({ left: '0' }, { duration: 700, queue: false });
		$('.mobile-menu-bg').animate({ left: '0' }, { duration: 700, queue: false });
		$('#container').animate({ 'margin-left': '36%' }, { duration: 700, queue: false });
		$('#container').animate({ 'margin-right': '-36%' }, { duration: 700, queue: false });
	}, function() {       
		$('.mobile-menu-bg').animate({ left: '-36%' }, { duration: 700, queue: false });
		$('.mobile-menu').animate({ left: '-36%' }, { duration: 700, queue: false });
		$('#container').animate({ 'margin-left': '0' }, { duration: 700, queue: false });
		$('#container').animate({ 'margin-right': '0' }, { duration: 700, queue: false });
	}
	);
})