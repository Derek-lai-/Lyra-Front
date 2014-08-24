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
		$('.mobile-menu').transition({ left: '0' }, { duration: 700, queue: false });
		$('.mobile-menu-bg').transition({ left: '0' }, { duration: 700, queue: false });
		$('#container').transition({ 'margin-left': '36%' }, { duration: 700, queue: false });
		$('#container').transition({ 'margin-right': '-36%' }, { duration: 700, queue: false });
	}, function() {       
		$('.mobile-menu-bg').transition({ left: '-36%' }, { duration: 700, queue: false });
		$('.mobile-menu').transition({ left: '-36%' }, { duration: 700, queue: false });
		$('#container').transition({ 'margin-left': '0' }, { duration: 700, queue: false });
		$('#container').transition({ 'margin-right': '0' }, { duration: 700, queue: false });
	}
	);

	var shiftleft = false;
	var shiftright = false;
	var voteup = false;
	var votedown = false;
	var suggest = true;

	function leftShift() {
		$('.prevsong').transition({ left: '-50%'}, { duration: 700, queue: false});
		$('.prevsong').className = "old";
		$('.cursong').transition({ left: '-20%' }, { duration: 1000, queue: false });
		$('.cursong').className = "prevsong";

		if (suggest == true) {
			$('.sugsong').transition({ left: '32%' }, { duration: 1000, queue: false });
			$('.sugsong').className = "cursong";
		} else {
			$('.shufflesong').transition({ left: '32%' }, { duration: 1000, queue: false });
			$('.shufflesong').className = "cursong";
		}
	}

	$$('.cursong').tap(function(){
		leftShift();
	});

	//$$('.cursong').tap(function(){
	//	ev.innerHTML = 'right';
	//	$('.cursong').transition({ left: '82%' }, { duration: 1000, queue: false });
	//});

	$$('.cursong').drag(function(){
		console.log("dragging");
	});

})