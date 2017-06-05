var CLIENT_ID ="JETVBQNOROLAJTOHR4BJ4UZ2B0MS3BEAHPLQB2Y4KSJ0EIHF";
var CLIENT_SECRET="S0JDLPSTT5ZAMKXWKAV0LSHULM15FKBWSYVKZ0PZ52GKTYMX";
var YOUTUBE_KEY = "AIzaSyCkFiq1gqrv-0QNruryNbNdAd3cUjDH-0U"

var LOCATION_INFO= {
	name:'',
	video_url:'',
	"top picks":[],
	food:[],
	"outdoor":[],
	"live events":[]
}
//update location info
function addLocationName(value) {
	LOCATION_INFO.name = value;
}
// reset location_info
function resetLocationInfo(){
	LOCATION_INFO.name = '';
	LOCATION_INFO.video_url ='';
	LOCATION_INFO.top_picks = [];
	LOCATION_INFO.food = [];
	LOCATION_INFO.acitivites = [];
	LOCATION_INFO.live_events = [];
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

function getJsonResponse(param){
	var request = createRequest(param);
	return $.ajax({
		url:'https://api.foursquare.com/v2/venues/explore',
		data: request,
		datatype:'jsonp',
		type:'GET',
		success: function(data){
			console.log('success');		
		}
	})
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
	LOCATION_INFO.video_url = "https://www.youtube.com/watch?v="+id	
}

function updateLocationInfo(key) {
	var a = getJsonResponse(key);
	a.done(function(results){
		for (var i = 0; i < 5; i++){
			LOCATION_INFO[key].push(createVenueObject(results.response.groups[0].items[i]))
		};
	})
}

//function display 