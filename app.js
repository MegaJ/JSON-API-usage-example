var BASE_URL = 'http://www.stellarbiotechnologies.com/media/press-releases/json';

// Sends a request to the BASE_URL to retreive JSON
var requestArticles = (function () {
    
    var articleCount = 0;
    
    return function(limit, offset = articleCount) {
	var offset = typeof offset === 'number' ? offset : articleCount;

	var requestURL = BASE_URL + '?offset=' + 
	    offset + '&limit=' + limit;
	console.log("limit: " + limit + " offset: " + offset);
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
	}) // end JSON request
	articleCount += limit;
	console.log(articleCount);
    } // end returned function
})();

// requestArticles(limit, offset)
requestArticles(1);
requestArticles(25, 0);

// http://stackoverflow.com/questions/13237555/jquery-load-content-when-scroll-to-bottom-100px-of-page-multiple-events-fired
function loadMore() {
    console.log("More loaded");
    $.when( requestArticles(5) ).done(function( x ) {
    $(window).bind('scroll', bindScroll);
});	
    
}

function bindScroll(){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
	$(window).unbind('scroll');
	loadMore();
    }
}

$(window).scroll(bindScroll);
