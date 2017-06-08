var CLIENT_ID ="JETVBQNOROLAJTOHR4BJ4UZ2B0MS3BEAHPLQB2Y4KSJ0EIHF";
var CLIENT_SECRET="S0JDLPSTT5ZAMKXWKAV0LSHULM15FKBWSYVKZ0PZ52GKTYMX";
var YOUTUBE_KEY = "AIzaSyCkFiq1gqrv-0QNruryNbNdAd3cUjDH-0U"

var LOCATION_INFO= {
	name:'',
	video_url:'',
	"topPicks":[],
	food:[],
	"outdoor":[],
	"live events":[]
}

var TEMPLATES= {
	page: `<div class="location-page">
						<div class="nav nav-bar">
							<h2>Adventure Time</h2>
							<form action="" class="js-search-form">
								<input type="text" placeholder="search a location" class="js-search-query">
								<input type="submit" class="js-submit" value="search"></input>
							</form>
						</div>
						<header>
							<h1 class="location-name">
							</h1>
							<span>logo</span>
						</header>
						<main role="main">
							<div class="container location-info-container">
								<section class="container top-picks-container">
									<h2>Top Picks</h2>
									<div class="top-venues-container">
									</div>
								</section>
								<section class="container outdoor-container">
									<h2>Fun Activties</h2>
									<div class="outdoor-venues-container">
									</div>
								</section>
								<section class="container food-container">
									<h2>Food</h2>
									<ul class="photo-list">
									</ul>
									<div class="container food-venues-container">
									</div>
								</section>
								<section class="video-container">
									<p><span class="location-name">location name</span> Travel Guide</p>
								</section>
								<section class="event-container">
										<h2>Live Events</h2>
									<ul class="event-list">
									</ul>
								</section>
							</div>
						</main>
					</div>"`,
	top:`<div class="top-venue">
			<img class="js-venue-photo" src="" alt="">
			<ul class="venue-information">
				<li class="venue-name"></li>
				<li class="venue-categories"></li>
				<li><span class="venue-hours"></span><a href="" class="venue-link"> more on <span class="venue-name"></span></a></li>
			</ul>
		</div>`,
	outdoor:`<div class="outdoor-venue">
				<h3 class="outdoor-name"></h3>
				<img class="outdoor-image" src="" alt="">
				<p>category:<span class="js-outdoor-category"></span> hours: <span class="outdoor-hours"></span> <a href="" class="outdoor-link">more information</a></p>
			</div>`,
	"food photos":`<li class="food-photo"><img src="http://finderscourse.com/sources/images/your-guides-photo-blank.jpg" alt=""></li>`,
	food:`<div class="food-venue">
			<img class="venue-photo js-venue-photo" src="https://www.janilink.com/img/p/O/blank%20floor%20sign%20view%20img.png" alt="">
			<ul class="venue-information">
				<li class="venue-name"></li>
				<li class="venue-categories"></li>
				<li><span class="venue-hours"></span><a href="" class="venue-link">more on <span class="venue-name"></span></a></li>
			</ul>
		</div>`,
	photoList:`<li class="food-photo"><img src="" alt=""></li>`,
	events:`<li>
				<h3 class="event-name"></h3>
				<p>category:<span class="event-category"></span> hours: <span class="event-hours"></span> <a href="" class="event-link">more information</a></p>
			</li>`,
	video:`<div>
  			<iframe src="http://www.youtube.com/embed/W7qWa52k-nE"
   			width="560" height="315" frameborder="0"</iframe>
			</div>`	
}

var homePage = `
		<div class="home-screen">
			<header class="container" role="banner">
				<h1>Adventure Time</h1>
				<input type="text" placeholder="search a location" class="js-search-query">
			</header>	
			<div class="container popular-locations">
				<h2>Popular Locations</h2>
				<div class="location-card"></div>
				<div class="location-card"></div>
				<div class="location-card"></div>
				<div class="location-card"></div>
			</div>
		</div>`
//update location info
function addLocationName(value) {
	LOCATION_INFO.name = value;
}
// reset location_info
function resetLocationInfo(){
	LOCATION_INFO.name = '';
	LOCATION_INFO.video_url ='';
	LOCATION_INFO['topPicks']= [];
	LOCATION_INFO.food = [];
	LOCATION_INFO['live events'] = [];
	LOCATION_INFO.outdoor = [];
}
//create request
function createRequest(param){
	if (param =='live events'){
		return {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			near:LOCATION_INFO.name,
			query:param,
			limit:5,
			day:'any',
			time:'any',
			venuePhotos:1,
			v:20170604,
			m:'foursquare'
		}
	} else {
		return { 
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			near:LOCATION_INFO.name,
			section:param,
			limit:5,
			v:20170604,
			day:'any',
			time:'any',
			venuePhotos:1,
			m:'foursquare'
		}
	}
}

//create the information object for each venue
// example input: var a = getJsonResponse('food');
//						  createVenueObject(a.response.groups[0].items[0])


function createVenueObject(item) {
	var venueInfo = {
		name:'',
		"photo url":'',
		category:'',
		hours:'',
		link:''
	};
	venueInfo.name = item.venue.name;
	venueInfo["photo url"] = item.venue.photos.groups[0].items[0].prefix +'original'+ item.venue.photos.groups[0].items[0].suffix;
	venueInfo.category = item.venue.categories[0].name;
	if (item.venue.hours) {
		venueInfo.hours = item.venue.hours.status;
	}
	venueInfo.link = "http://foursquare.com/v/"+item.venue.name+"/"+item.venue.id+"?ref="+CLIENT_ID;
	return venueInfo
}


// calls the key to get the specific json Response. then updates the LOCATION_INFO
function updateLocationInfo(results, key) {
	for (var i = 0; i < 5; i++){
	LOCATION_INFO[key].push(createVenueObject(results.response.groups[0].items[i]))
	};
}
function getJsonResponse(param){
	var request = createRequest(param);
	return $.ajax({
		url:'https://api.foursquare.com/v2/venues/explore',
		data: request,
		datatype:'jsonp',
		type:'GET',
		success:function(result){
			updateLocationInfo(result,param)
		}
	})
}


function getVideoJson(location_name,callback){
	var query = {
		part:'snippet',
		key:YOUTUBE_KEY,
		q: location_name + " travel guide",
		type:'video',
		maxResults:1,
	}
	$.getJSON('https://www.googleapis.com/youtube/v3/search',query,callback)
}

function addVideoUrl(results){
	var id = results.items[0].id.videoId;
	LOCATION_INFO.video_url = "https://www.youtube.com/embed/"+id
	var videoPlayer = $(TEMPLATES.video);
	videoPlayer.find('iframe').attr('src', LOCATION_INFO.video_url);
	console.log(videoPlayer);
	$('.video-container').html(videoPlayer);

}

// funtion toggleHiddenClass()

//Display functions

//display location page
function displayPage(TEMPLATES,LOCATION_INFO) {
	var locationPage = $(TEMPLATES.page);
	locationPage.find('.location-name').text(LOCATION_INFO.name);
	$('.page').html(locationPage);
}

//render top picks
function renderTopPicks(info){
	var top = $(TEMPLATES.top);
	top.find('.venue-name').text(info.name);
	top.find('img').attr('src',info['photo url']);
	top.find('.venue-categories').text(info.category);
	top.find('.venue-hours').text(info.hours);
	top.find('a').attr('href',info.link);
	return top;
}

//display top picks section
function displayTopPicks(LOCATION_INFO){
	var results = LOCATION_INFO['topPicks'].map(function(item){
		return renderTopPicks(item)
	})
	$('.top-venues-container').html(results);
}

//render video
// function displayVideo(LOCATION_INFO){
// 	var videoPlayer = $(TEMPLATES.video);
// 	videoPlayer.find('iframe').attr('src', LOCATION_INFO.video_url);
// 	console.log(videoPlayer);
// 	$('.video-container').html(videoPlayer);
// }
//render food 
function renderFoodVenue(info){
	var venue = $(TEMPLATES.food);
	venue.find('.venue-name').text(info.name);
	venue.find('img').attr('src',info['photo url']);
	venue.find('.venue-categories').text(info.category);
	venue.find('.venue-hours').text(info.hours);
	venue.find('a').attr('href',info.link);
	return venue;
}
function displayFoodVenue(LOCATION_INFO){
	var results = LOCATION_INFO['food'].map(function(item){
		return renderFoodVenue(item)
	})
	$('.food-venues-container').html(results);
}
function renderFoodPhotos(info){
	var photo = $(TEMPLATES.photoList);
	photo.find('img').attr('src',info['photo url']);
	return photo
}
function displayFoodPhotos(LOCATION_INFO){
	var results = LOCATION_INFO['food'].map(function(item){
		return renderFoodPhotos(item)
	})
	$('.photo-list').html(results);
}

//render activities
function renderOutdoorVenue(info){
	var venue = $(TEMPLATES.outdoor);
	venue.find('.outdoor-name').text(info.name);
	venue.find('img').attr('src',info['photo url']);
	venue.find('.js-outdoor-category').text(info.category);
	venue.find('.outdoor-hours').text(info.hours);
	venue.find('a').attr('href',info.link);
	return venue;	
}
function displayOutdoorVenue(LOCATION_INFO){
	var results = LOCATION_INFO['outdoor'].map(function(item){
		return renderOutdoorVenue(item)
	})
	$('.outdoor-venues-container').html(results);
}

//render events
function renderEventVenue(info){
	var venue = $(TEMPLATES.events);
	venue.find('.event-name').text(info.name);
	venue.find('.event-category').text(info.category);
	venue.find('.event-hours').text(info.hours);
	venue.find('a').attr('href',info.link);
	return venue
}
function displayEventVenue(LOCATION_INFO){
	var results = LOCATION_INFO['live events'].map(function(item){
		return renderEventVenue(item)
	})
	$('.event-list').html(results);
}

//Event handlers

//handle search a location
function handleSearch(){
	$('.page').on('submit','.js-search-form',(function(event) {
		event.preventDefault();
		resetLocationInfo();
		var location = $(this).find('.js-search-query').val();
		addLocationName(location);		
		displayPage(TEMPLATES,LOCATION_INFO);
		getVideoJson(LOCATION_INFO.name,addVideoUrl);

		getJsonResponse('topPicks').done(function(results){
			displayTopPicks(LOCATION_INFO)})
		getJsonResponse('food').done(function(results){
			displayFoodVenue(LOCATION_INFO);
			displayFoodPhotos(LOCATION_INFO)})
		getJsonResponse('outdoor').done(function(results){
			displayOutdoorVenue(LOCATION_INFO);
		})
		getJsonResponse('live events').done(function(results){
			displayEventVenue(LOCATION_INFO);
		})
	}))	
}

$(function(){
	handleSearch();
})