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

$mediaFilename=$_POST["mediaFilename"];

$serverName = $_POST["serverName"];
$userName = $_POST["userName"];
$passWord = $_POST["passWord"];

$con = mysql_connect($serverName,$userName,$passWord);

//mysql_connect(servername,username,password); 

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
 
mysql_select_db("snn", $con);

// NOTE: Next line is crucial...without won't work between diff domains!
// header('Access-Control-Allow-Origin: *');

$sql = "UPDATE media SET likeCount = likeCount+1 WHERE mediaFilename = '$mediaFilename'";


if (!mysql_query($sql,$con))
  {
  die('Error: ' . mysql_error());
  }
// echo "1 record added";
//debug($sql);

mysql_close($con);


function debug($data) {
$file = 'debug.out';
file_put_contents($file, $data);
}


?> 

