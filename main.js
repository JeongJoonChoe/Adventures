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
			<div class="navbar container-fluid">
				<div class="navbar-brand">
					<img class="brand-image mr-1" src="http://cdn.shopify.com/s/files/1/0257/6087/products/Palm-Trees_Single_Front_grande.png?v=1487376286" alt="Palm Palm-Trees_Single_Front_grande">
					<h3 class="mr-1">Adventures</h3>
					<form action="" class="js-search-form form-inline">
						<input type="text" placeholder="search a location" class="js-search-query form-control mr-1">
						<button class="js-submit btn" type="submit">search</button>
					</form>
				</div>
			</div>
			<header class="container">
				<h1><span class="location-name"></span> - <i class="fa fa-rocket" aria-hidden="true"></i>
				</h1>
			</header>
			<main role="main">
				<div class="container location-info-container">
					<div class="row">
						<div class="container col-xl-8 col-md-12">
							<section class="section-container top-picks-container">
								<h2>Top Picks - <i class="fa fa-thumbs-up" aria-hidden="true"></i></h2> 
								<div class="venue-list js-top-venues-container">
								</div>
							</section>
							<section class="section-container">
								<h2>Outdoor Activties - <i class="fa fa-tree" aria-hidden="true"></i></h2>
								<div class="outdoor-venues-container">
								</div>
							</section>
						</div>
						<div class="container col-xl-4 col-md-12">
							<section class="section-container video-container">	
							</section>
							<section class="section-container event-container">
								<h2 class="black-font">Live Events - <i class="fa fa-music" aria-hidden="true"></i></h2>
								<ul class="venue-list js-event-list">
									<p>No current live events </p>								
								</ul>
							</section>
						</div>
					</div>
					<div class="row">
						<div class="container col-lg-12">
							<section class="section-container food-container">
								<h2>Popular Food and Restaurants - <i class="fa fa-coffee" aria-hidden="true"></i></h2>
								<div class="venue-list js-food-venues-container">
								</div>					
							</section>
						</div>						
					</div>
				</div>
			</main>
			<footer>photos and information by Foursquare &middot<i class="fa fa-caret-square-o-up fa-lg" aria-hidden="true"></i> written and coded by Jeong Joon "Peter" Choe</footer>
		</div>`,
	top:`<div class="venue">
			<img class="js-venue-photo venue-image-size" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3J5ap47O_1qrHJabs8EtY7lLOJD74gf9YGO_uAucs_qB_YvtfAA" alt="">
			<ul class="venue-information">
				<li>Name: <span class="venue-name">Restaurant Title</span></li>
				<li>Category: <span class="venue-categories">Mexican Restaurant</span></li>
				<li>Venue hours: <span class="venue-hours">unavailable</span></li>
				<li>For more information: <a href="" class="venue-link"><span class="venue-name">Restaurant Title</span></a></li>
			</ul>
		 </div>`,
	outdoor:`<div class="outdoor-venue">
				<div class="card">
					<img class="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3J5ap47O_1qrHJabs8EtY7lLOJD74gf9YGO_uAucs_qB_YvtfAA" alt="Card image">
					<div class="card-img-overlay">
						<h4 class="card-title outdoor-name">Outdoor Name</h4>
						<p class="card-text">category: <span class="js-outdoor-category">Park</span></p>
						<p class="card-text">hours: <span class="outdoor-hours">unavailable</span></p>
						<p class="card-text bottom"><a href="" class="outdoor-link">click here for more info</a></p>
					</div>
				</div>
			</div>`,
	food:`<div class="venue white-font">
		<img class="js-venue-photo venue-image-size" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3J5ap47O_1qrHJabs8EtY7lLOJD74gf9YGO_uAucs_qB_YvtfAA" alt="">
		<ul class="venue-information">
			<li>Name: <span class="venue-name">Restaurant Title</span></li>
			<li>Category: <span class="venue-categories">Mexican Restaurant</span></li>
			<li>Venue hours: <span class="venue-hours">unavailable</span></li>
			<li>For more information: <a href="" class="venue-link"><span class="venue-name">Restaurant Title</span></a></li>
		</ul>
	</div>`,
	events:`<li>
				<h3 class="event-name black-font">La-Live</h3>
				<p>Category:<span class="event-category"></span><br> Hours: <span class="event-hours">close in 5 hours</span><br> <a href="" class="event-link">more information</a></p>
			</li>`,
	video:`<h2 class="black-font"><span class="location-name">Los Angeles</span> travel guide - <i class="fa fa-youtube-play" aria-hidden="true"></i></h2>`	
}


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
		},
		error:function(a,s,v){
			resetLocationInfo();
			addLocationName('('+v+') invalid location name. Please try again');
			displayPage(TEMPLATES,LOCATION_INFO);
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
	return $.getJSON('https://www.googleapis.com/youtube/v3/search',query,function(result){callback(result)})
}

function addVideoUrl(results){
	var id = results.items[0].id.videoId;
	LOCATION_INFO.video_url = "https://www.youtube.com/embed/"+id;
}
// function renderVideo(LOCATION_INFO){
// 	var videoPlayer = $(TEMPLATES.video);
// 	videoPlayer.find('.location-name').text(LOCATION_INFO.video_url);
// 	videoPlayer.find('iframe').attr('src', LOCATION_INFO.video_url);
// 	$(videoPlayer).appendTo($('.video-container'));
// }
function renderVideo(LOCATION_INFO){
	v = document.createElement('iframe');
	$(v).attr('src',LOCATION_INFO.video_url);
	$(v).attr('width',320);
	$(v).attr('height',275).appendTo($(".video-container"));
	var videoTitle = $(TEMPLATES.video);
	videoTitle.find('.location-name').text(LOCATION_INFO.name);
	videoTitle.appendTo($(".video-container"));
}

// funtion toggleHiddenClass()

//Display functions

//display location page
function displayPage(TEMPLATES,LOCATION_INFO) {
	var locationPage = $(TEMPLATES.page);
	locationPage.find('.location-name').text(LOCATION_INFO.name);
	console.log(LOCATION_INFO.video_url);
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
	$('.js-top-venues-container').html(results);
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
	$('.js-food-venues-container').html(results);
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
	$('.js-event-list').html(results);
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
		getVideoJson(LOCATION_INFO.name,addVideoUrl).done(function(results){
			renderVideo(LOCATION_INFO)}
		)

		getJsonResponse('topPicks').done(function(results){
			displayTopPicks(LOCATION_INFO)})
		getJsonResponse('food').done(function(results){
			displayFoodVenue(LOCATION_INFO)})
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