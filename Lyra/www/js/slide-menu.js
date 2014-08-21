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

	var shiftleft = false;
	var shiftright = false;
	var voteup = false;
	var votedown = false;
	var suggest = true;

	Hammer('.cursong').on("swipeleft", function(){
		$('.cursong').animate({ left: '-20%' }, { duration: 700, queue: false });
	});
	Hammer(csong).on("swiperight", function(){
		ev.innerHTML = "right";
		$('.cursong').animate({ left: '82%' }, { duration: 700, queue: false });
	});

	Hammer(csong).on("dragleft", function(){
		console.log("dragging");
	});

})