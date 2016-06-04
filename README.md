# JSON-API-usage-example

This is a coding assignment for a company. On my honor, this is my own work.

I have however, looked up documentation and used Stack Overflow.

Prompt
-------
> Assignment (https://gearside.com/public-json-feeds/)

> Build a SPA using the technology of your choosing (but be prepared to explain the reasons for your choices) that displays the titles and publish dates of the news articles returned from the JSON API located at http://www.stellarbiotechnologies.com/media/press-releases/json. The SPA should load and display more news articles as the user scrolls.  Accordingly, the API supports "limit" and "offset" parameters.

Running The Project
---------
git clone the project. Then simply load ```index.html``` in your browser.

Justification / Project walkthrough
----------
I didn't know what a JSON API was. So I researched that first.
Given the first link in the prompt, they used jQuery's ```requestJSON()``` method. I followed this example. I used the webconsole in firefox to manually make JSON requests in like manner. Once I felt comfortable with this, I made my html file and ```app.js``` file.

I chose **javascript** because it's the most natural language to use when parsing JSON. It was also a single page application, and javascript reigns here. I also had no idea what else to use and was unfamiliar with making low level HTTP requests in Java or any other language.

You can follow what I did throughout the rest of the project by inspecting my commit history.


### ```app.js```
1. ```requestArticles()```

* ```requestArticles``` is bound to an anonymous function, which returns another function. I did this in order to make ```articleCount``` a private variable via use of closures. I want this as a private variable because nothing should be able to change how many articles have been loaded. Only this function should know about it.
    
* Inside, I also return ```$.getJSON()```. I do this for the call to ```$.when()``` in ```loadMore()```. Only when ```$.getJSON()``` returns, should I rebind the functionality of getting even more JSON when scrolling to the bottom. Otherwise, we may have repeated articles loaded, or articles get loaded out of order.
    
2. ```createDivFromJson()```

* This simply creates ```<div>``` elements once I have new JSON. There is likely a prettier way than the verbosity inside the ```for``` loop. I decided not to use jQuery calls here because vanilla js is much faster.
     
* There is an obvious relationship between ```articleNumber``` in this function and ```articleCount``` in ```requestArticles()```. Indeed, this deserves a refactor, were this application to be maintained.
     
3. Use of jQuery

* This might be a bit bulky to use. But it made things fast to build. I was not given a time limit, but given that I did not know what a JSON API was before starting this project, I wanted to accelerate development nonetheless. I grabbed a really powerful and easy to use tool at hand.

### ```index.html``` + ```stylesheet.css```

I am untrained at CSS so I picked up code from [w3schools.com](http://www.w3schools.com/css/css_rwd_grid.asp) and played around with it. 
