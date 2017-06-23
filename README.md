# Adventures
Adventures is an app to help users research and plan activities in a given location.
Users have to simply input a city, country, or zip code and the app will display any upcoming live events, top five popular restuarants and outdoor activities, and also overall top five venues in the location.

# API's 
This app utilizes both the foursquare api and the youtube api.

# Youtube
The youtube api is used to get the video id of the travel guide video of the location. 
This is the request sent.
	{
		part:'snippet',
		key:YOUTUBE_KEY,
		q: location_name + " travel guide",			// Enters the location name + " travel guide" as the search query	
		type:'video',
		maxResults:1,				//only returns the first top video matching the search query
	}

# Foursquare
The foursquare api is used to gather all the information on the venues for each section.  
This request is made for each section of the location page.	

	{
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		near:LOCATION_INFO.name,			//Makes the foursquare api look for the venues near the user's input
		section:param,						//'param' is the section I want to get information from
		limit:5,							// limits the searches to the top five
		day:'any',
		time:'any',
		venuePhotos:1,
		v:20170604,
		m:'foursquare'
	}

# Styling
The styling, responsive features and grid system are mainly created using Bootstrap 4.
