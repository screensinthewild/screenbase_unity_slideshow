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

// Used by UNION Server to name 'room':
var experienceName = "screenbase_slideshow";

// UNION Server details
// Steve: making it easier to switch server
//var server = "tryunion.com";
var server = "<UNION Server IP address>";
var port = 8080;

// mySQL database credentials:
var serverName = "<database host>";
var userName = "<database username>";
var passWord = "<database password>";

// Relative path to media store...relative to project index.html
var relativePathToMediaStore = "../../../../../images/";


/****** mySQL database requirements for this to work ****

MySQL database with entries for each media item in the store:

Available fields:
mediaFilename | likeCount | dateCreated | textLabel | location | appName | mediaType | personName |

Note: mediaFilename is a unique key and only one media item with that name is allowed. 
Note: the dateCreated field is an auto generated timestamp. Replacing an image with one of the same name, will overwrite the timestamp.

MySQL query to create:
CREATE TABLE `media` (
`mediaFilename` varchar(200),
`likeCount` int(11),
`dateCreated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`textLabel` varchar(200),
`location` varchar(200),
`appName` varchar(200),
`mediaType` varchar(200),
`personName` varchar(200),  
UNIQUE KEY (`mediaFilename`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

***** mySQL database requirements for this to work ****/
