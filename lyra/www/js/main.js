$(document).ready(appReady);

function appReady() {

	var snapper = new Snap({
		element: document.getElementById("content"),
		touchToDrag: false,
		disable: "right"
	});

	$(document).on("click", "#toolbar-menu", function(){
		snapper.open("left")
	});

	snapper.on("animated", function(){
		$("body").width("0%").width("100%");
	});

	var currPage = "";
	var pageStack = new Array();


	$$(document).on("tap", ".side-link", function(event){
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


}