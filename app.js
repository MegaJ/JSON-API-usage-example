var BASE_URL = 'http://www.stellarbiotechnologies.com/media/press-releases/json';

// Sends a request to the BASE_URL to retreive JSON
var requestArticles = function(offset, limit) {
	var requestURL = BASE_URL + '?offset=' + 
					 offset + '&limit=' + limit;

	$.getJSON(requestURL, function (json) {
		var news = json.news;
		var container = document.getElementById('container')	

		var i;
		for (i = 0; i < news.length; i++) {
			if (typeof json[i] !== 'function') {
				// for each article acquired, add a new div to body
				// fill div with information
				var listItem = document.createElement("li");
				var itemTitle = document.createTextNode('Title : ' + news[i].title);
				var itemPublished = document.createTextNode('Published : ' + news[i].published);

				
				// put text inside list item
				listItem.appendChild(itemTitle);
				listItem.appendChild(itemPublished);
				// put list item in unordered list
				container.appendChild(listItem);
			}	
		}
	});
}

requestArticles(0, 1);
requestArticles(1, 100);


function loadMore()
{
   console.log("More loaded");
    $("body").append("<div>");
   $(window).bind('scroll', bindScroll);
}

 function bindScroll(){
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
       $(window).unbind('scroll');
       loadMore();
   }
}

$(window).scroll(bindScroll);
