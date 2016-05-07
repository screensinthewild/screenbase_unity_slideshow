/*
Author:  Steve North
Author URI:  http://www.cs.nott.ac.uk/~pszsn/
License: AGPLv3 or later
License URI: http://www.gnu.org/licenses/agpl-3.0.en.html
Can: Commercial Use, Modify, Distribute, Place Warranty
Can't: Sublicence, Hold Liable
Must: Include Copyright, Include License, State Changes, Disclose Source
This research was originally funded in the UK under EPSRC grant reference EP/I031839/1 and title ‘Exploring the potential of networked urban screens for communities and culture’.

Copyright (c) 2015, The University of Nottingham

*/

var appName = experienceName;

var regularTransitionSlideTimer;

var currentMediaFileNameForLikes;

var arrayOfImageURLs;

var curimg=0;

// The Orbiter object, which is the root of Union's JavaScript client framework
var orbiter;

// The MessageManager object, for sending and receiving messages
//var msgManager;

// A convenience reference to net.user1.orbiter.UPC, which provides a
// list of valid client/server UPC messages. See: http://unionplatform.com/specs/upc/
var UPC = net.user1.orbiter.UPC;

// A hash of experience room message names used in this application. MOVE means move 'something' (avatar..pen...object etc)
// to the specified position. Add other custom messages here.... i.e. {MOVE:"MOVE", JUMP:"JUMP"};

//var Messages = { IMAGEINDEX: "IMAGEINDEX"};

//var currentOneStringContainingAllSlideShowHTMLImageTagsWithGapsAndNoBreak;
var currentTopRowImageURL;
var currentTagCategory;

//var slideShowFrozen=false;

var keepInfoVisibleTimer;
//var keepFrozenTimer;

//var hasTouch = false;

var iedom=document.all||document.getElementById

//var arrayOfSlideShowHTMLImageTags=new Array();

var actualwidth=''
//var cross_slide, ns_slide

//var slideFrameRateCounterRunning = false;

//var URLarraySize = tags.length;

//var counter = 0;

var screenLocation;
var locationOfRempoteScreenSendingUsMessage;



function init () {

// ######### START: DO ALL THE WEB SERVICES / API VALUE GATHERING FROM THE URL #################

//screenLocation = translateTwoDigitLocationCodeIntoTextString ( (getURLparameterValue("loc")) );
screenLocation = getURLparameterValue("loc");

var checkSharing = getURLparameterValue("sharing");
if(checkSharing=="y" || checkSharing=="Y")
{
SHARING_MODE = true;
}

if (getURLparameterValue("app")!="")
{
appName = decodeURIComponent(getURLparameterValue("app"));
experienceName = appName;
//console.log(appName);
}

var checkIfRemoteImageURLs = getURLparameterValue("remote");

if(checkIfRemoteImageURLs=="y" || checkIfRemoteImageURLs=="Y")
{
REMOTE_MODE = true;
}

//if (getURLparameterValue("branding")!="") BRANDING_TEXT = decodeURI(getURLparameterValue("branding"));
//if (getURLparameterValue("call")!="") CALLTOACTION_TEXT = decodeURI(getURLparameterValue("call"));

if (getURLparameterValue("info")!="")
{
TEXT_FOR_INFO_WINDOW = decodeURIComponent(getURLparameterValue("info"));
}


if (getURLparameterValue("slideint")!="")
{
numberOfMillisecondsBetweenSlides = decodeURIComponent(getURLparameterValue("slideint"));
}






// ######### END: DO ALL THE WEB SERVICES / API VALUE GATHERING FROM THE URL ##############


if (REMOTE_MODE)
{
//createArrayOfImageURLsFromURLParameter();
}

doHTMLstuff();


initLayoutCustomComponents();

doRegularTransitionSlideShow("");

registerInputListeners();

initUnion();

}


function getURLparameterValue( param )
{
param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
var regexS = "[\\?&]"+param+"=([^&#]*)";  
var regex = new RegExp( regexS );  
var results = regex.exec( window.location.href ); 
 if( results == null )    return "";  
else    return results[1];
}




/* ##############  START RegularTransitionSlideShow  ######### */


function doRegularTransitionSlideShow() 
{

/*******************  START CONFIG STUFF **********************************/

// This is only here because I was having problems with global variables not being 
// accessible for the getImageURLs() function.
// init() is called from HTML and (although config.js has been pre-loaded) 
// variables in config.js are not found!! Nor are globals declared at the head
// of this file. Hmmm....

// Media search properties for mySQL

//var appName = "screenbase";

var appName="";
if (getURLparameterValue("app")!="")
{
appName = experienceName;
}

// The following params are not yet supported in the PHP...TO BE DONE...
var tag = "";
var location = "";
var likeCount;
var startDateCreatedPeriod;
var endDateCreatedPeriod;
var personName;
var mediaType = "image";

/*******************  END CONFIG STUFF **********************************/



if (!REMOTE_MODE)
{
enableLikesForRegularAndTagButtonSlideShows = true;
getImageURLs(appName, tag, location, likeCount, startDateCreatedPeriod, endDateCreatedPeriod, personName, mediaType);
}

else
{
createArrayOfImageURLsFromURLParameter();
}

//regularTransitionSlideTimer = setInterval("getNextSlideInRegularTransitionSlideShow()", numberOfMillisecondsBetweenSlides);

}

function createArrayOfImageURLsFromURLParameter () {
// separate filenames into an array, by separator
arrayOfImageURLs = getURLparameterValue("imgs").split(separatorForVideoFileNamesInURL);


for (var i = 0, len = arrayOfImageURLs.length; i < len; i++) {
//console.log("curimg="+curimg+" "+i+". "+arrayOfImageURLs[i]);
}

getFirstSlideAndStartTimer2();

}



function getImageURLs(appName, tag, location, likeCount, startDateCreatedPeriod, endDateCreatedPeriod, personName, mediaType)
{


xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
{

if (xmlhttp.readyState==4 && xmlhttp.status==200)
{

var response = xmlhttp.responseText;

// This checks if return is just a bunch of string space
// When something is not found by MySQL, 
// xmlhttp.responseText seems to just be a string of length = 3.
// So, this triggers if image should have zero likes...
if(response.replace(/\s/g,"") == "")
{
response = "empty";
}


// replace any white spaces left in filenames with nothing
response = response.split(' ').join('');

// separate filenames into an array, by commas
arrayOfImageURLs = response.split(',');

getFirstSlideAndStartTimer();

//console.log("My images: "+response);

}
}


//xmlhttp.open("GET", "php/getMediaFilename.php?appName="+appName+"&tag="+tag+"&location="+location+"&likeCount="+likeCount+"&startDateCreatedPeriod="+startDateCreatedPeriod+"&endDateCreatedPeriod="+endDateCreatedPeriod+"&personName="+personName+"&mediaType="+mediaType,true);

xmlhttp.open("GET", "php/getMediaFilename.php?appName="+appName+"&tag="+tag+"&location="+location+"&likeCount="+likeCount+"&startDateCreatedPeriod="+startDateCreatedPeriod+"&endDateCreatedPeriod="+endDateCreatedPeriod+"&personName="+personName+"&mediaType="+mediaType+"&serverName="+serverName+"&userName="+userName+"&passWord="+passWord,true);


//console.log(tag);

xmlhttp.send();

}


function getFirstSlideAndStartTimer() {
getNextSlideInRegularTransitionSlideShow();
if(arrayOfImageURLs.length>1)
{
regularTransitionSlideTimer = setInterval("getNextSlideInRegularTransitionSlideShow()", numberOfMillisecondsBetweenSlides);
}
}


function getFirstSlideAndStartTimer2() {
if(arrayOfImageURLs.length>1)
{
//getNextSlideInRegularTransitionSlideShow();
regularTransitionSlideTimer = setInterval("getNextSlideInRegularTransitionSlideShow()", numberOfMillisecondsBetweenSlides);
}
else
getNextSlideInRegularTransitionSlideShow();
}



function getNextSlideInRegularTransitionSlideShow() {

document.getElementById("slideshow_image").setAttribute("src", "");
document.getElementById("like_heart_icon").style.visibility = 'hidden';
document.getElementById("like_counter").style.visibility = 'hidden';

currentMediaFileNameForLikes = arrayOfImageURLs[curimg];

//console.log(curimg);
if(arrayOfImageURLs[curimg])
{
if(enableLikesForRegularAndTagButtonSlideShows)
getLikeCountFromImageURL(currentMediaFileNameForLikes);
}

/* ################ START EMERGENCY PROCEDURE IF AN UNDEFINED IMAGE SNEAKS THROUGH ######## */

if(typeof(arrayOfImageURLs[curimg]) == "undefined")
{
console.log("curimg="+curimg+".Imagename is UNDEFINED...resetting SlideShow");

// Stop the slide timer!
clearInterval(regularTransitionSlideTimer);

// Reset the slideshow increment counter!
curimg=0;
//console.log("NEW! curimg="+curimg);

doRegularTransitionSlideShow();


/* ################ END EMERGENCY PROCEDURE IF AN UNDEFINED IMAGE SNEAKS THROUGH ######## */


}
//console.log(arrayOfImageURLs[curimg]);


if (REMOTE_MODE)
document.getElementById("slideshow_image").setAttribute("src", decodeURIComponent(arrayOfImageURLs[curimg]));
else
document.getElementById("slideshow_image").setAttribute("src", relativePathToMediaStore+arrayOfImageURLs[curimg]);

// allow resizing of higher res JPGs
//document.getElementById("slideshow_image").setAttribute("width", mainSlideWidth);
//document.getElementById("slideshow_image").setAttribute("height", mainSlideHeight);


if(enableLikesForRegularAndTagButtonSlideShows)
{
document.getElementById("like_heart_icon").style.visibility = 'visible';
document.getElementById("like_counter").style.visibility = 'visible';
}

curimg++;



// if we're out of images in array...reload everything to pick up any changes in the media store
if(curimg==arrayOfImageURLs.length+1)
{
document.getElementById("like_heart_icon").style.visibility = 'hidden';
document.getElementById("like_counter").style.visibility = 'hidden';
window.location.reload(true);
}



} 

/* ##############  END RegularTransitionSlideShow  ######### */




// Register callback functions to handle user input
function 
registerInputListeners () {
 
document.onmousedown = pointerDownListener;
//document.onmouseup = pointerUpListener;
document.ontouchstart = touchDownListener;
//document.ontouchend = touchUpListener;

}




function doHTMLstuff() {


document.write('<div id="jcontainer">');

// Add the 'no break' HTML tag containing all images and gaps, into a SPAN HTML tag, set invisible
document.write('<span id="temp" style="visibility:hidden;position:absolute;top:-100px;left:-9000px"></span>')


document.write('<div id="message"></div>');

document.write('<table border="0" cellspacing="0" cellpadding="0"><td>')


document.write('<div id="slideshow"/>');
document.write('<img id="slideshow_image"/>');
document.write('</div>');

document.write('<img id="info" src="imgs/info.png"/>');

document.write('<div id="top_row_image"/></div>');

document.write('<img id="like_button" src="imgs/like_button.png" style="height:25%;width:35%"/>');
document.write('<div id="like_counter"></div>');
document.write('<img id="like_heart_icon" src="imgs/like.png" style="height:12%;width:21%"/>');


document.write('<div id="info_popup">');
document.write('<div id="info_text"></div>');


document.write('</div>');

document.write('<div id="iSpy_reserved_space"><BR><BR><BR>768 x 342 space reserved <BR> for iSpy video panel overlay</div>');

} // close doHTMLstuff()



//==============================================================================

// TOUCH-INPUT EVENT LISTENERS

//==============================================================================

// On devices that support touch input, this function is triggered when the 
// user touches the screen.

function touchDownListener(e) {

// Retrieve a reference to the Event object for this mousedown event.
// Internet Explorer uses window.event; other browsers use the event parameter
var event = e || window.event; 

mouseOrTouchDown (event);

}


//==============================================================================

// MOUSE-INPUT EVENT LISTENERS

//==============================================================================
 
// Triggered when the mouse is pressed down

function pointerDownListener (e) {

// Retrieve a reference to the Event object for this mousedown event.
// Internet Explorer uses window.event; other browsers use the event parameter
var event = e || window.event; 

mouseOrTouchDown (event);  
 
}
  
  
function mouseOrTouchDown (e) {

var tname

// Next gives element type not id
//tname=event.target;

// Get id of element associated with event
tname=event.target.id; 
//console.log(tname);

if(tname=="info")
{
document.getElementById("info_popup").style.visibility = 'visible';
keepInfoVisibleTimer=setInterval("hideInfoWindow()",millisecsToShowInfo);
return;
}

if(tname=="like_heart_icon")
{
if(enableLikesForRegularAndTagButtonSlideShows)
setLikeCountFromImageURL(currentMediaFileNameForLikes);
return;
}

if(tname=="info_text" || tname=="info_popup" )
{
hideInfoWindow();
return;
}

// Check that it's an image being clicked/touched before trigging freeze 
if(event.target.toString()=="[object HTMLImageElement]")
{

/****** STEVE ADD ****/
if(touchImageCyclesNextSlide)
{

if(SHARING_MODE)
{
//sitwOutgoingEvent("imageindex", curimg+","+getURLparameterValue("loc"));
sitwOutgoingEvent("imageindex", curimg);
}

getNextSlideInRegularTransitionSlideShow();

}
/****** STEVE ADD ****/

}

var mouseX = event.clientX;
var mouseY = event.clientY;
//broadcastTouchPosition(mouseX, mouseY ); 

/* ########## START: example of how to send events for SitW UNION functionality ########## */

// You can define an attribute name...it can be anything that you like and UNION Server will store it, unless it's reset. 
// This is just an example, you can define as many different attributes as required for your experience. 
// Just remember that you will have to handle each event in sitwIncomingChangeOfState()!
// The format of the function call is: sitwOutgoingChangeOfState(attributeName, attributeValue);
// For example:
//sitwOutgoingChangeOfState("myAttribute", "undersea bristles");

// You can define an event name...it can be anything that you like. 
// This is just an example, you can define as many different events as required for your experience.
// Just remember that you will have to handle each event in sitwIncomingEvent()!
// The format of the function call is: sitwOutgoingEvent(eventName, eventValue);
// For example:
//sitwOutgoingEvent("myevent", "42");

/* ########## END: example of how to send events for SitW UNION functionality ########## */






} // close function mouseOrTouchDown()



function initLayoutCustomComponents() {


document.getElementById("info_text").innerHTML = TEXT_FOR_INFO_WINDOW;
//document.getElementById("branding_text").innerHTML = BRANDING_TEXT;
//document.getElementById("calltoaction_text").innerHTML = CALLTOACTION_TEXT;


// infoButton
if (showInfoButton) {
    document.getElementById("info").style.visibility = 'visible';
}

document.getElementById("like_counter").innerHTML=likeCounterValue;


// iSpy_reserved_space
if (showISpy_reserved_space) {
    document.getElementById("iSpy_reserved_space").style.visibility = 'visible';
}

}


function hideInfoWindow()
{
document.getElementById("info_popup").style.visibility = 'hidden';
clearInterval(keepInfoVisibleTimer);

}


function doSomethingWithLocationCode (messageIsLocal,locationCode) {

var introText;


if (messageIsLocal == true)
{
introText = ifTouchedLocationIntroText;
}
 else
 {

introText = photoShowingStartTxt+locationOfRempoteScreenSendingUsMessage+photoShowingEndTxt;

 }


if(locationCode=="WA") 
{
//console.log(locationIntroText+WalthamstowLocationDescription);
notify(introText+WalthamstowLocationDescription,timeUntilShowPhotoNotificationFades);

}


else if(locationCode=="LE") 
{
//console.log(locationIntroText+LeytonstoneLocationDescription);
notify(introText+LeytonstoneLocationDescription,timeUntilShowPhotoNotificationFades);

}

else if(locationCode=="BW") 
{
//console.log(locationIntroText+BroadwayLocationDescription);
notify(introText+BroadwayLocationDescription,timeUntilShowPhotoNotificationFades);


}

else if(locationCode=="NA") 
{
//console.log(locationIntroText+NewArtExchangeLocationDescription);
notify(introText+NewArtExchangeLocationDescription,timeUntilShowPhotoNotificationFades);

}

else 
{
//console.log(locationIntroText+"unknown");
notify(introText+"unknown",timeUntilShowPhotoNotificationFades);
}

}

function notify (notification,removeTimer) {

 var notice = '<div class="notice">'
 + '<div class="notice-body">'
 //+ '<img src="imgs/info2.png" />'
 + '<p>'+notification+'</p>'
 + '</div>'
 + '<div class="notice-bottom">'
 + '</div>'
 + '</div>';
 $( notice ).purr(
    {
    fadeInSpeed: 200,
    fadeOutSpeed: 2000,
  removeTimer: 2000,
// Steve added next option, so that I can disable list covering screen...
  disableListOfNotifications: useSingleNotificationNotList
    }
  );
  


  }

  

/* ########################## START: SITW functionality ################################## */

// A shortcut to adding UNION Server 'Shared' behaviours on the 'Screens in the Wild' Network by Steve North

// Open the browser Javascript console to see what's going on...now click anywhere!!

// Note: when you test this file...in order to use the location-specific code, you will need to add the 'loc' argument to the URL.
// For example: if you are testing it locally...it might look like this: file:///C:/Users/<user name>/Desktop/index.html?loc=BW
// Currently legal values for loc are: BW (Broadway Cinema), NA (New Art Exchange), WA (The Mill, Walthamshow) and LE (Leytonstone). 

// This JavaScript can live in an HTML file script element, or in a separate Javascript file, that is included via a 'src' parameter. 

/* ########## START: incoming SITW event handling ########## */

// In this example, there are two types of incoming events: changes of state for the entire experience 
// and momentary events from a specific location. 

// 1. Changes of state for the entire experience - (SOMETHING HAS CHANGED FOR EVERYONE)
// These messages tell you when the value of an attribute has changed on UNION Server.
// These attributes relate specifically to the experience defined by the variable 'experienceName'.
// Attributes might be high scores, for example. 
// State is retained so long as UNION Server is not reset. They won't survive a server reset.

// Note: this next bit can handle any attributeName that you have choosen to define by calling the function - sitwOutgoingChangeOfState(attributeName, attributeValue).
// You just need to edit the bit below to identify your attributeName and decide what to do with the attributeValue.

function sitwIncomingChangeOfState(attributeName, attributeValue) {

// Once you have an attribute and it's new value...you might edit this bit to do something with it...
if (attributeName == "myAttribute")
{
//doSomething(attributeValue);
}

// Repeat with 'ifs' for your other attributes...

} // close sitwIncomingChangeOfState


// 2. Momentary events from a specific location (SOMETHING HAS CHANGED AT ONE LOCATION)
// These messages tell you when someone has changed something at another location.
// This is best suited for rapid messaging that does not need to have its state remembered by UNION Server (for example: user screen position changes in a game).
// These events will go to everyone connected to this experience, as defined by the variable 'experienceName'.
// They are NOT retained by UNION Server.

// Note: this next bit can handle any eventName that you have choosen to define by calling the function - sitwOutgoingEvent(eventName, eventValue) - note: location is added automatically before sending. 
// You just need to edit the bit below to identify your eventName and decide what to do with the eventValue and eventLocation.

function sitwIncomingEvent(eventName, eventValue, eventLocation) {

if (eventName == "myEvent")
{
//doSomething(eventLocation,eventValue);
}


if (eventName == "imageindex" && SHARING_MODE)
{

  // Parse...
  var values = eventValue.split(",");

   console.log("Receiving image touched message..."+eventLocation);

curimg = Number(values[0]);
//locationOfRempoteScreenSendingUsMessage = translateTwoDigitLocationCodeIntoTextString (values[1]);
//locationOfRempoteScreenSendingUsMessage = values[1];
locationOfRempoteScreenSendingUsMessage = translateTwoDigitLocationCodeIntoTextString (eventLocation);

getNextSlideInRegularTransitionSlideShow();

notify(photoShowingStartTxt+locationOfRempoteScreenSendingUsMessage+photoShowingEndTxt,timeUntilShowPhotoNotificationFades);

}

} // close sitwIncomingEvent


/* ########## END: incoming SITW event handling ########## */


/* ########################## END: SITW functionality ################################## */



/* ########################## Helper Functions ################################## */


function getURLparameterValue( param )
{
param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
var regexS = "[\\?&]"+param+"=([^&#]*)";  
var regex = new RegExp( regexS );  
var results = regex.exec( window.location.href ); 
 if( results == null )    return "";  
else    return results[1];
}


function translateTwoDigitLocationCodeIntoTextString (location) {

var loc;

if (location == "NA")
{
loc = NewArtExchangeLocationDescription;
}

else if (location == "BW")
{
loc = BroadwayLocationDescription;
}

else if (location == "LE")
{
loc = LeytonstoneLocationDescription;
}

else if (location == "WA")
{
loc = WalthamstowLocationDescription;
}

else
{
loc = "Unknown Location";
}

return loc;
//alert(screenLocation);

}

  function changecss(myclass,element,value) {
	var CSSRules
	if (document.all) {
		CSSRules = 'rules'
	}
	else if (document.getElementById) {
		CSSRules = 'cssRules'
	}
	for (var i = 0; i < document.styleSheets[0][CSSRules].length; i++) {
		if (document.styleSheets[0][CSSRules][i].selectorText == myclass) {
			document.styleSheets[0][CSSRules][i].style[element] = value
		}
	}	
}

function getImageNameFromImageURL (image_url) {
var arrayIndexOfLastForwardSlashinURL = image_url.lastIndexOf("/");
return image_url.substring(arrayIndexOfLastForwardSlashinURL+1);
}

function getTwoDigitLocationCodeFromImageName (image_name) {
var arrayIndexOfFirstUnderscoreInImageName = image_name.indexOf("_");
return image_name.substring(arrayIndexOfFirstUnderscoreInImageName+1,arrayIndexOfFirstUnderscoreInImageName+3);
}

function getURLfromHTMLimageTag(imageTag) {
// find the first open speech marks in HTML image tag
var arrayIndexOfFirstOpenSpeechMarksInImageName = imageTag.indexOf("\"");
// find the second open speech marks in HTML image tag - starting from index of first one
var arrayIndexOfSecondSpeechMarksInImageName = imageTag.indexOf("\"",arrayIndexOfFirstOpenSpeechMarksInImageName+1);
// return substring between first set of speech marks, as this is URL of image
return imageTag.substring(arrayIndexOfFirstOpenSpeechMarksInImageName+1,arrayIndexOfSecondSpeechMarksInImageName);
}


function getLikeCountFromImageURL(mediaFilename)
{

// Strip out all carriage returns...
mediaFilename = mediaFilename.replace(/\r?\n|\r/g, '');

//console.log("getting count for "+mediaFilename);

mediaFilename = getImageNameFromImageURL (mediaFilename);

document.getElementById("like_counter").innerHTML = 'loading...';

//notify("Getting 'likes'...",50);

xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
{

if (xmlhttp.readyState==4 && xmlhttp.status==200)
{

var likes = xmlhttp.responseText;

// This checks if return is just a bunch of string space
// When imageURL is not found by MySQL, 
// xmlhttp.responseText seems to just be a string of length = 3.
// So, this triggers if image should have zero likes...
if(likes.replace(/\s/g,"") == "")
{
// set likes to zero
likes = "0";
}
document.getElementById("like_counter").innerHTML = likes;

}
}

xmlhttp.open("GET", "php/getLikeCountForImage.php?mediaFilename="+mediaFilename+"&serverName="+serverName+"&userName="+userName+"&passWord="+passWord,true);

xmlhttp.send();

}

function setLikeCountFromImageURL(mediaFilename)
{

// Strip out all carriage returns...
mediaFilename = mediaFilename.replace(/\r?\n|\r/g, '');

//console.log("Setting count for "+mediaFilename);

var imageAndURL = mediaFilename;

mediaFilename = getImageNameFromImageURL (mediaFilename);

var url = "php/setLikeCountForImage.php";

var params = "mediaFilename="+mediaFilename+"&serverName="+serverName+"&userName="+userName+"&passWord="+passWord; 

xmlhttp=new XMLHttpRequest();

xmlhttp.open("POST", url, true);

//Send the proper header information along with the request
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.setRequestHeader("Content-length", params.length);
xmlhttp.setRequestHeader("Connection", "close");

xmlhttp.onreadystatechange=function()
{

if (xmlhttp.readyState==4 && xmlhttp.status==200)
{
//console.log("here");
getLikeCountFromImageURL(imageAndURL);
//console.log(xmlhttp.responseText);
}
}
xmlhttp.send(params);

// refresh like counter to reflect increment
getLikeCountFromImageURL(imageAndURL);
}





