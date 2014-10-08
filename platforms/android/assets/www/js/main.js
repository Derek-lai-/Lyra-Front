$(document).ready(ready);

function ready() {

	var snapper = new Snap({
		element: document.getElementById("content"),
		disable: "right",
		maxPosition: 156,
		hyperextensible: false,
		touchToDrag: false,

	});

	$(document).on("click", "#menu-button", function(){
		snapper.open("left");
	});

	snapper.on("animated", function(){
		$("body").width("0%").width("100%");
	});

	var currPage = "";
	var pageStack = new Array();


	$$(document).on("touchstart", ".side-link", function(event){
		event.stopPropagation();
		event.preventDefault();
		if (event.handled !== true) {
			changePage($(this).data("page"))
			event.handled = true;
		} else {
			return false;
		}
	})

	function changePage(page) {
		snapper.close();

		if (page === "back") {
			page = pageStack.pop();
		}

		$(".page").each(function(){
			if ($(this).data("page") == page) {
				$(this).show();
			} else {
				$(this).hide();
			}
		})
	}

	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady() {
		window.requestFileSystem(LocalFileSystem.PERSISENT, 0, onFileSystemSuccess, fail);
		window.resolveLocalFileSystemURI("", onResolveSuccess, fail);
	}

	function onFileSystemSuccess(fileSystem){
		alert(fileSystem.name);
	}

	function fail(evt) {
		alert(evt.target.error.code);
	}

}
