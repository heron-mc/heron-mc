<?php
/**
* Simple script to quickly return a list of names which start with a given string
*/

$link = pg_connect('host=localhost dbname=DATABASE user=USER password=PASSWORD') or die('Could not connect: ' . pg_last_error());

pg_query($link, "SET NAMES utf8;");
$str = mb_convert_case( $_GET['query'], MB_CASE_LOWER, "UTF-8"); 
$sql = "SELECT name, id, country, egn_spatial_object_uid FROM geocoder.geoname WHERE name_lowercase LIKE '" . $str. "%';";
$result = pg_query($sql) or die('Query failed: ' . pg_last_error());

header("Content-Type: text/html; charset=UTF-8");

echo $_GET['callback'] . "(";
echo "{ data:[";
while ($data = pg_fetch_array($result, null, PGSQL_ASSOC)) {
if ($data['egn_spatial_object_uid']){
echo "{ 'id': '" . $data['id'] . "', 'name': '" . addslashes($data['name']) . " (" .  $data['country'] . ") *', 'esdinid': '" . $data['egn_spatial_object_uid']. "'},";
}
else {
echo "{ 'id': '" . $data['id'] . "', 'name': '" . addslashes($data['name']) . " (" .  $data['country'] . ")'},";
}
}
echo "{}]})";
pg_free_result($result);
pg_close($link);
?>