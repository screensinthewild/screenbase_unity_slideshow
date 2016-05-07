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


var enableLikesForRegularAndTagButtonSlideShows = false;

var separatorForVideoFileNamesInURL = "~~";

// IMPORTANT: the config properties for the mySQL media query are in experience.js init(). See notes there...

// The ID of the room users will join in order to draw together
var roomID = "sitw." + experienceName;

//var maximumImagesToShowForEachTag=4;

/* ################# TIMERS AND SPEED CONTROL ################ */

var numberOfMillisecondsBetweenSlides = 10000;

// 15 mins = 900 secs
var secondsUntilPageRefresh = 900;

var millisecsToShowInfo = 10000;
var timeUntilShowPhotoNotificationFades = 12500;
var timeUntilRemoteLikeNotificationFades = 2500;

/* ################# SCREEN POSITIONS ################ */


/* ################# ENABLE / DISABLE ################ */

var touchImageCyclesNextSlide = true;

var SHARING_MODE = false;
var REMOTE_MODE = false;

var useSingleNotificationNotList = true;

var showlike_heart_icon = false;
var showLikeCounter = false;

// infoButton
var showInfoButton = true;

// enable guide to show where iSpy vid link panel will be
var showISpy_reserved_space = false;


/* ################# TEXT AND LABELS ################ */

var BRANDING_TEXT = "";

var CALLTOACTION_TEXT = "";

var likeCounterValue = "0";

var ifTouchedLocationIntroText = "You are showing people at all other screens a photo from: ";
var photoShowingStartTxt = "Someone at ";
var photoShowingEndTxt = " showed you this photo.";

var LikeNotifyStartTxt = "Someone from ";
var LikeNotifyEndTxt = " just 'Liked' the photo you touched!";

var NewArtExchangeLocationDescription = "New Art Exchange, Nottingham";
var BroadwayLocationDescription = "Broadway Cinema, Nottingham";
var WalthamstowLocationDescription = "Walthamstow, London";
var LeytonstoneLocationDescription = "Edgware Road, London";

var TEXT_FOR_INFO_WINDOW = "<h1>Info</h1>This is an instance of the 'Screen in the Wild' ScreenBase framework display module.<BR>Edit this...";

/* ################# SIZES ################ */

//var mainSlideWidth = 745;
//var mainSlideHeight = 884;

