screenbase_unity_slideshow


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

The 'Unity' version has one code base and uses URL parameters to customise the slideshow content. At the moment, this limits the style customisation possible for each experience (it is only possible to change the CSS for all slideshows). If this unified codebase approach works, it should be possible to make further style options available via the URL parameters (path to a custom CSS file, for example). 

UNITY can be used in two ways:

1. To create a slideshow containing images that are hosted on the sanme server and have an entry in an mySQL database (for 'likes' etc). This can display ALL images in the database (including their 'likes') or it can display by 'App' (allowing filtering of all images). You cannot specifiy individual images in this mode, only 'all images' or images grouped by a database tag.

2. To create a slideshow from ANY image that is web accessible (images found in a Google search, for example), using the individual image URLs. Of course, these images won't necessarily be the correct aspect ratio for the image area in our portrait slideshow and so may appear stretched or squashed. Obviously, large file sizes might also cause problems. There are no 'likes' with this type of show, because there is no DB! All individual images must be specified in the URL for this mode. You can't display the contents of a directory.

You can also use this version to display a single image, say as an event poster or message to users (if there is only one image found, the slideshow timer is disabled).

This app works with the ScreenBase Upload and Admin components. Images uploaded to the media directory will be added to the slideshow in realtime (on the next cycle through).

Supported by a mySQL database for persistant 'likes'.

For screen networks, touched images may be shared as an event. All screens will then mirror the current selection, allowing a more shared experience at different locations. This may require UNION Server and some of the Screens in the Wild framework core components.


TO DO

# Add ‘skin’ URL parameter (as found in UNITY VideoPlayer):  the URI encoded remote URL (or local filepath?) for a 745 x 1340 JPG (or PNG?) background image, to customise the slideshow’s appearance. This particularly important for UNITY, as, without it, it you can’t customise the style for an individual slideshow.

CONFIGURATION 

SEE README FILES IN DISPLAY AND CREATE MODULES.
