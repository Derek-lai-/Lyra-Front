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

	lyra.globals = { 
		songList: new Array(), 
		currentMedia: 'null'
	};

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

	$document.addEventListener('deviceready', function() {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFIleSystemSuccess, fail);
		}, false);

	function onFileSystemSucess(fileSystem) {
		fileSystem.root.getDirectory("Music", {create: false}, getDirSucess, fail);
	}

	function getDirSucess(dirEntry) {
		var directoryReader = dirEntry.createReader();
		directoryReader.readEntries(readerSucess,fail);
	}

	function readerSucess(entries) {
		var i;
		for (i=0; i<entries.length; i++) {
			if (entries[i].name.indexOf(".mp3") != -1) {
				lyra.globals.songList[i] = entries[1].fullPath;
			}
		}
	}


	var listorder = ("alpha", "bravo", "charlie", "delta", "echo");


	$$('.cursong').tap(function(){
		
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