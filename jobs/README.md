1. All aspects of my work have been correctly implemented:
-- used AJAX to get JSON data from web API
-- All jobs are rendered on page in the div section
 of the body
-- Handled exceptions correctly
-- No additional HTML tags inside the body
-- No jQuery
-- Each job is shown in the following order:
	 1. Company, 2. Location, 3.  Position

2. I did not collaborate or discuss this assignment with anyone.

3. I spent approximately 3 hours completing this assignment.

Notes:
	- I have used a stylesheet called "style.css"
	- I manually check if the browser is IE or non-IE
	- To deal with the security issue "XMLHttpRequest cannot load...Origin null
	  is not allowed by Access-Control-Allow-Origin", I did not check for 
	  whether the status code was 200 inside my if statement in my callback
	  function. This way, if the status code was not 200 (e.g. status code 0),
	  I would be able to catch the exception and output an alert to the 
	  webpage.