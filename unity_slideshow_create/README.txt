unity_slideshow_create


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

A web-app to create correctly formatted strings for the URL query parameter API used by unity_slideshow_display.
Will work locally, or hosted on a webserver.

Enter:
the URLS of images for the slideshow
the text to appear when the Info button is touched
the interval in seconds between slides

The output from create is formatted as follows:
http://<your site>/<folder containing UNITY HTML, Javascript etc.>?remote=y&slideint=1300&imgs=imgs=<image1:  URL encoded web address of image including http://>~~<image2:  URL encoded web address of image including http://>~~<image3: URL encoded web address of image including http://>&info=<URL encoded text to display when info button is touched>

THis will currently produce URLs assuming that unity_slideshow_display is hosted at: http://www.cs.nott.ac.uk/sitw/experiences/screenbase/unity/slideshow/display/stable/

You will need to edit the resulting URL to match your unity_slideshow_display install path.
For example: http://<your site>/<your directory containing unity_slideshow_display files>/

Create also produces example entries using the 'Screens in the Wild' system schedule file syntax, as used by sitw_core. If you are sitw_core to run a screens network, then you could use this example to immediately schedule your new slideshow to run on the network.