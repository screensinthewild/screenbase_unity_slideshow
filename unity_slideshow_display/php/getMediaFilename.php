<?php

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

$appName=$_GET["appName"];
$tag=$_GET["tag"];
$location=$_GET["location"];
$likeCount=$_GET["likeCount"];
$startDateCreatedPeriod=$_GET["startDateCreatedPeriod"];
$endDateCreatedPeriod=$_GET["endDateCreatedPeriod"];
$personName=$_GET["personName"];
$mediaType=$_GET["mediaType"];

$serverName = $_GET["serverName"];
$userName = $_GET["userName"];
$passWord = $_GET["passWord"];

$con = mysql_connect($serverName,$userName,$passWord);

//mysql_connect(servername,username,password); 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysql_select_db("snn", $con);

// TO DO: construct the WHERE bit of the SQL statement, depending on which variables are assigned and which are NULL.

// media table:
// mediaFilename | likeCount | dateCreated | textLabel | location | appName | mediaType | personName |

// tage table:
// | mediaFilename | tag  | appName | categoryLabel |

if(!empty($appName))
	{

// There is an appName specified
	
		if (!empty($tag))
		// There is an appName AND a tag specified
			{
			$result = mysql_query("SELECT mediaFilename FROM tags WHERE appName='$appName' and tag='$tag';");
			}
		else
		// There is an appName but not a tag specified
			{
			$result = mysql_query("SELECT mediaFilename FROM media WHERE appName='$appName';");
			}
	}
else
	{
// There is NOT an appName specified	

		if (!empty($tag))
		// There is just a tag specified...so look in the tags table...not the media table
			{
			debug("tag is not empty");		
			$result = mysql_query("SELECT mediaFilename FROM tags WHERE tag='$tag';");
			}
		else
		// Nothing is specified and I want all media items...
			{
			$result = mysql_query("SELECT mediaFilename FROM media;");
			}

	}



// NOTE: Next line is crucial...without won't work between diff domains!
header('Access-Control-Allow-Origin: *');

// How many rows are there in the result?
$num_rows = mysql_num_rows($result);

// Set a variable to track whether this is the last row...
$i = 1; 

while($row = mysql_fetch_array($result))
  {
  
  if (empty($row)) 
	{
	 echo "empty";
    } 
  else 
   {
   // We always want the contents of the next row...
   echo $row['mediaFilename'];
   if ($i!==$num_rows)
   // ...as long as this isn't the last row...we want an comma after it 
   // to use as a separator to pass the string in JavaScript
   {
    echo ",";
    }
	
	}
// increment row counter to check for last row...
$i++;
  }
  
  
mysql_close($con);

function debug($data) {
$file = 'debug.out';
file_put_contents($file, $data);
}


?> 

