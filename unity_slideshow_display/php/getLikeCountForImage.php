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

$mediaFilename=$_GET["mediaFilename"];

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

$result = mysql_query("SELECT likeCount FROM media WHERE mediaFilename='$mediaFilename'");

// NOTE: Next line is crucial...without won't work between diff domains!
header('Access-Control-Allow-Origin: *');

while($row = mysql_fetch_array($result))
  {
  
  if (empty($row)) {
    echo "empty";
} else {
    echo $row['likeCount'];
}
  
 // echo $row['likeCount'];
 // echo "<br />";
  }

mysql_close($con);


function debug($data) {
$file = 'debug.out';
file_put_contents($file, $data);
}


?> 

