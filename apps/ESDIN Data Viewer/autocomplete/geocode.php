<?php
/**
* Simple script to return the coordinates of a given id
*/
$link = pg_connect('host=localhost dbname=DATABASE user=USER password=PASS') or die('Could not connect: ' . pg_last_error());

pg_query($link, "SET NAMES utf8;");
$str = strtolower( $_GET['query']);
$sql = "SELECT name, id, latitude, longitude FROM geocoder.geoname WHERE id = '" . $str. "' LIMIT 1;";
$result = pg_query($sql) or $result = false;

header("Content-Type: text/html; charset=UTF-8");

echo "(";
if ($result){
	$data = pg_fetch_array($result, null, PGSQL_ASSOC);
	echo "{ success: true, data:[";
	echo "{ 'id': '" . $data['id'] . "', 'name': '" . $data['name'] . "', 'latitude': '" . $data['latitude'] . "', 'longitude': '" . $data['longitude'] . "'},";
	echo "{}]}";
}
else {
	echo "{ success: false}";
}
echo ")";
pg_free_result($result);
pg_close($link);
?>
