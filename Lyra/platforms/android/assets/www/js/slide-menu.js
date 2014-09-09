$(document).ready(function() {
	
	document.addEventListener("deviceready", function(){
      	alert("123");
 	},true);

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

	globals = { 
		songList: new Array(), 
		currentMedia: 'null'
	};

	function onDeviceReady() {
		console.log("penis");
		//window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, fail);
    }

	function onFileSystemSucess(fileSystem) {
		console.log("Checkpoint 1");
		fileSystem.root.getDirectory("Music", {create: false}, getDirSucess, fail);
	}

	function getDirSucess(dirEntry) {
		console.log("Checkpoint 2");
		var directoryReader = dirEntry.createReader();
		directoryReader.readEntries(readerSucess,fail);
	}

	function readerSucess(entries) {
		var i;
		console.log("Checkpoint 3");
		for (i=0; i<entries.length; i++) {
			if (entries[i].name.indexOf(".mp3") != -1) {
				globals.songList[i] = entries[1].fullPath;
			}
		}
	}

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


	$$('.cursong').tap(function(){
		console.log("test");
		var i;
		for (i=0; i<globals.songList.length; i++) {
			console.log(String(globals.songList[i]));
		}
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