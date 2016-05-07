unity_slideshow_display

Author:  Steve North
Author URI:  http://www.cs.nott.ac.uk/~pszsn/
License: AGPLv3 or later
License URI: http://www.gnu.org/licenses/agpl-3.0.en.html
Can: Commercial Use, Modify, Distribute, Place Warranty
Can't: Sublicence, Hold Liable
Must: Include Copyright, Include License, State Changes, Disclose Source
This research was originally funded in the UK under EPSRC grant reference EP/I031839/1 and title ‘Exploring the potential of networked urban screens for communities and culture’.

Copyright (c) 2015, The University of Nottingham


DESCRIPTION

A customisable, automatic image slideshow, primarily intended for use with a network of public-facing, urban screens (such as the 'Screens in the Wild' framework). Styled for a portrait, touch-based display, with available browser screen space of 745x1340.  

In the original ScreenBase Instantiated Slideshow module. a new instance (a copy of all the code in the directory) was created for each new slideshow. 

The 'Unity' version has one code base and uses URL parameters to customise the slideshow content. At the moment, this limits the style customisation possible for each experience (it is only possible to change the CSS for all slideshows). It should be possible to make further style options available via the URL parameters (path to a custom CSS file, for example). 

UNITY can be used in two ways:

1. To create a slideshow containing images that are hosted on the sanme server and have an entry in an mySQL database (for 'likes' etc). This can display ALL images in the database (including their 'likes') or it can display by 'App' (allowing filtering of all images). You cannot specifiy individual images in this mode, only 'all images' or images grouped by a database tag.

2. To create a slideshow from ANY image that is web accessible (images found in a Google search, for example), using the individual image URLs. Of course, these images won't necessarily be the correct aspect ratio for the image area in our portrait slideshow and so may appear stretched or squashed. Obviously, large file sizes might also cause problems. There are no 'likes' with this type of show, because there is no DB! All individual images must be specified in the URL for this mode. You can't display the contents of a directory.

You can also use this version to display a single image, say as an event poster or message to users (if there is only one image found, the slideshow timer is disabled).

This app works with the ScreenBase Upload and Admin components. Images uploaded to the media directory will be added to the slideshow in realtime (on the next cycle through).

Supported by a mySQL database for persistant 'likes'.

For screen networks, touched images may be shared as an event. All screens will then mirror the current selection, allowing a more shared experience at different locations. This may require UNION Server and some of the Screens in the Wild framework core components.


TO DO

# Add ‘skin’ URL parameter (as found in UNITY VideoPlayer):  the URI encoded remote URL (or local filepath?) for a 745 x 1340 JPG (or PNG?) background image, to customise the slideshow’s appearance. This particularly important for UNITY, as, without it, it you can’t customise the style for an individual slideshow.

# Add customisable / dynamic CSS, so that each deployment can have a separate look and feel. At the moment, this is limited to the 'skin' URL paramter. Can this be done via a URL parameter (path to a custom CSS file, for example)? 

CONFIGURATION 

In credentials.js:

Configure this if using UNION Server to share image touch events. This is the 'room' or communication channel that in which events are shared between screens:
var experienceName = "<name for sharing interaction event messages>";



If using UNION Server, configure server IP address:

var server = "xx.xx.xx.xx";


Server port number, I used port 8080:
var port = <port number>;




MySQL database host:
var serverName = "<database host>";

var userName = "<database user name>";

var passWord = "<database password>";



The URL of the media directory, containing images:
var dataStoreURL  = "<URL path to media files>"; For example: "http://<your site>/images/"

The relative path to the media directory...relative to project index.html
var relativePathToMediaStore = "<relative path to media files>"; For example: "../../../../images/"



USING THE URL query parameter API


The image list is separated by the characters: '~~'. 

The image URLs and text content sent as to Display as a parameter, cannot be in natural language (with spaces etc). They need to be URI encoded to replace illegal characters.

To make it easier to create this type of slideshow, UNITY has a separate web interface (CREATE) that correctly encodes the URL parameters and gives you an instant URL for the slideshow.

Using the above web app, you can customise the slide change interval and the text in the Info pop-up window.

The valid URL parameters for ScreenBase UNITY Slideshow are:

'remote' - if this is omitted (or remote=n), content will be from the database. If remote=y or Y, then Display will look for a list of image URLs in the main URL and disable 'likes' (because there is no database!).
'info' - this is the text to display in the Info pop-up window, when the user touches the ‘i’ button. 

'app'  - web application name, as used in our mySQL DB to filter images returned.

'slideint'  - this is the interval between slides. If omitted, the default value is 5000 millisecs.

‘loc’ (not required) - default (or if omitted) notification will display location as ‘somewhere’ instead of screen description. Recognised values are: BW, NA, WA and LE. These are translated in text descriptions for the notifications. 

‘sharing’ (not required) - default (or if omitted) is ‘n’. Set this to ‘y’ if, each time a photo is touched is played, you want an event message sent to UNION Server, which generates a notification at other screens and the other screens to start displaying the same image.

Example format for the parameters: 
http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?
remote=y&info=<encoded text for info window>&imgs=<url for image>~~<url for image>&app=<app name>&slideint=<interval between slides in milliseconds>

Examples -

Slideshows using existing images in the 'Screens in the Wild' DB:

Everything in DB (this is every image from all of our experiences)!
http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/

Examples of displaying images for specific existing apps:

http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?app=sandbox

http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?app=dfuse

http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?app=NottCont

http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?app=researchshowcase2014

http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?app=dawnoftheunread

Custom slideshows using remote online images:

Note: for remote images, the parameter "remote=y" must be set in the URL, or the slideshow will display database images!

These are the two remote images (examples taken from Dawn of the Unread):
http://www.cs.nott.ac.uk/sitw/experiences/images/11th-August-2014-01-23-45___PaulF.jpg
http://www.cs.nott.ac.uk/sitw/experiences/images/11th-August-2014-01-31-44___PaulF.jpg

Here are the two images in a slideshow:
http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?remote=y&imgs=http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2F11th-August-2014-01-23-45___PaulF.jpg~~http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2F11th-August-2014-01-31-44___PaulF.jpg

Two images with the slide interval set to 1.3 seconds:
http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?remote=y&slideint=1300&imgs=http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2F11th-August-2014-01-23-45___PaulF.jpg~~http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2F11th-August-2014-01-31-44___PaulF.jpg

Two images with the slide interval set and a custom pop-up info window:

http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?remote=y&slideint=1300&imgs=http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2F11th-August-2014-01-23-45___PaulF.jpg~~http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2F11th-August-2014-01-31-44___PaulF.jpg&info=%3Ch1%3EInfo%3C%2Fh1%3ESlideshow%20using%20the%20two%20images%20from%20DotU.%3CBR%3EEdit%20this...


Examples of slideshows using images from a Google search:

Cat and dog images:
http://www.cs.nott.ac.uk/sitw/experiences/images/misc/cat.jpg
http://www.cs.nott.ac.uk/sitw/experiences/images/misc/dog.jpg

Cat and dog slideshow:
http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?remote=y&imgs=http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2Fmisc%2Fcat.jpg~~http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2Fmisc%2Fdog.jpg

Goth images:
http://www.gothus.com/wp-content/uploads/2013/04/Goths+Gather+Leipzig+Annual+Music+Fest+x-5WgZLrRr8l.jpg,http://1.bp.blogspot.com/_xLvSdoI8jUI/SzfhRrHhfdI/AAAAAAAAACA/YcaNxZnG8TM/s320/11485535751098112661_areyouGoth%5B1%5D.jpg,http://cashmereandivory.files.wordpress.com/2013/01/goth-make-up.jpg,http://www.freakingnews.com/pictures/28500/Goth-Girls-28834.jpg

Goth slideshow (with slide intervals at 1 second):
http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?remote=y&slideint=1000&imgs=http%3A%2F%2Fwww.gothus.com%2Fwp-content%2Fuploads%2F2013%2F04%2FGoths%2BGather%2BLeipzig%2BAnnual%2BMusic%2BFest%2Bx-5WgZLrRr8l.jpg~~http%3A%2F%2F1.bp.blogspot.com%2F_xLvSdoI8jUI%2FSzfhRrHhfdI%2FAAAAAAAAACA%2FYcaNxZnG8TM%2Fs320%2F11485535751098112661_areyouGoth%255B1%255D.jpg~~http%3A%2F%2Fcashmereandivory.files.wordpress.com%2F2013%2F01%2Fgoth-make-up.jpg~~http%3A%2F%2Fwww.freakingnews.com%2Fpictures%2F28500%2FGoth-Girls-28834.jpg&info=%3Ch1%3EInfo%3C%2Fh1%3EThis%20is%20an%20instance%20of%20a%20Gothy%20%27Screens%20in%20the%20Wild%27%20ScreenBase%20framework%20display%20module.%3CBR%3EEdit%20this...

You can also use this to display a single page poster on the network (if there is only one image found, the slideshow timer is disabled).
For example, this is the poster for the Edgware Road event on the 22nd November:
http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/?remote=y&info=%3Ch1%3EInfo%3C%2Fh1%3EChurch%20Street%20Ward%3CBR%3EProvided%20by%20the%20%27Screens%20in%20the%20Wild%27%20network.%20Linking%20London%20and%20Nottingham.&imgs=http%3A%2F%2Fwww.cs.nott.ac.uk%2Fsitw%2Fexperiences%2Fimages%2Fmisc%2Fchurch_street.jpg

To manually encode URLs or Info text, use: http://meyerweb.com/eric/tools/dencoder/
