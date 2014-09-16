$(document).ready(ready);

function ready() {

	var snapper = new Snap({
		element: document.getElementById("content"),
		disable: "right",
		maxPosition: 300,
		hyperextensible: false,
		slideIntent: 20,

	});

	$(document).on("click", "#toolbar-menu", function(){
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


}
