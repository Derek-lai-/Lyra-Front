$(document).ready(function() {

	var shiftleft = false;
	var shiftright = false;
	var voteup = false;
	var votedown = false;
	var suggest = true;

	var alpha = document.getElementById('alpha');
	var bravo = document.getElementById('bravo');
	var charlie = document.getElementById('charlie');
	var delta = document.getElementById('delta');
	var echo = document.getElementById('echo');
	var foxtrot = document.getElementById('foxtrot');

	function leftShift() {
		$(alpha).transition({ left: '-50%'}, { duration: 1000, queue: false});
		$(alpha).className = "offscreen";
		$(bravo).transition({ left: '-20%' }, { duration: 1000, queue: false });
		$(bravo).className = "prevsong";

		if (suggest == true) {
			$(charlie).transition({ left: '32%' }, { duration: 1000, queue: false });
			$(charlie).className = "cursong";
			

		} else {
			$(delta).transition({ left: '32%' }, { duration: 1000, queue: false });
			$(delta).className = "cursong";
		}
	}

	var listorder = ("alpha", "bravo", "charlie", "delta", "echo");

	var snapper = new Snap({
		element: document.getElementById('content')
	});


	$$('.cursong').swipeLeft(function(){
		
	});

	$$('.cursong').swipeRight(function(){
		alert("cock")
	});

	$$('.cursong').drag(function(){
		console.log("dragging");
	});

	$$('#container-inner').tap(function(){
		$('#background').addClass('open');
	});

})