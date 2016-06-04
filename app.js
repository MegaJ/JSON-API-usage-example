var BASE_URL = 'http://www.stellarbiotechnologies.com/media/press-releases/json';

// Sends a request to the BASE_URL to retreive JSON
var requestArticles = (function () {
    
    var articleCount = 0;
    
    return function(limit, offset) {
	var offset = typeof offset === 'number' ? offset : articleCount;
	var requestURL = BASE_URL + '?offset=' + 
	    offset + '&limit=' + limit;
	console.log("limit: " + limit + " offset: " + offset);
	
	return $.getJSON(requestURL, function (json) {
	    
	    var news = json.news;
	    if (news.length === 0) {
		return;
	    }

	    createDivFromJson(news);
	    
	    articleCount += limit;
	    console.log(articleCount);
	}) // end JSON request
    } // end inner function
})();

var createDivFromJson = function () {
    var articleNumber = 1;

    return function (news) {
	var container = document.getElementById('container');
	
	var i;
	for (i = 0; i < news.length; i++) {

	    // for each article acquired, add a new div to body
	    // fill div with information
	    var htmlNumber = document.createElement("div");
	    htmlNumber.innerHTML = articleNumber;
	    var listItem = document.createElement("div");
	    var itemTitle = document.createTextNode('Title : ' + news[i].title);
	    var lineBreak = document.createElement("br");
	    var lineBreak2 = document.createElement("br");
	    var itemPublished = document.createTextNode('Published : ' + news[i].published);

	    listItem.appendChild(htmlNumber);
	    listItem.appendChild(itemTitle);
	    listItem.appendChild(lineBreak)
	    listItem.appendChild(lineBreak2);
	    listItem.appendChild(itemPublished);

	    // add style
	    listItem.className += "col-1";

	    container.appendChild(listItem);
	    articleNumber++;
	}
    }
}();

// http://stackoverflow.com/questions/13237555/jquery-load-content-when-scroll-to-bottom-100px-of-page-multiple-events-fired
function loadMore() {
    console.log("More loaded");
    $.when( requestArticles(5) ).done(function() {
	$(window).bind('scroll', bindScroll);

	// it's possible to get to the bottom of the screen, then no data loads
	// so manually call bindScroll()
	var scrolledToBottom = $(window).scrollTop() + $(window).height() === $(document).height();
	if (scrolledToBottom) {
	    console.log("Scrolled to the bottom");
	    bindScroll();
	}
    });	
}

// http://stackoverflow.com/questions/13237555/jquery-load-content-when-scroll-to-bottom-100px-of-page-multiple-events-fired
function bindScroll(){
    if($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
	$(window).unbind('scroll');
	loadMore();
    }
}

// calls itself once data is loaded
// if html is filled with enough <div>s from JSON, this function stops
var loadUntilScrollBarAppears = function () {
    console.log("Loading until scroll bar appears");
    
    var windowHeight = window.innerHeight;
    var htmlHeight = document.getElementsByTagName('html')[0].offsetHeight;

    if (htmlHeight > windowHeight) {
	return;
    }
    
    $.when( requestArticles(5) ).done(function() {
	loadUntilScrollBarAppears();
    });
}

$(window).scroll(bindScroll);
window.onload = loadUntilScrollBarAppears;
window.onresize = loadUntilScrollBarAppears;
