# Various real tests for the heron.cgi service
# Change the URL var to test with your own installation.

URL=http://kadviewer.kademo.nl/cgi-bin/heron.cgi
URL=http://lib.heron-mc.org/cgi-bin/heron.cgi
URL=http://local.lib.heron-mc.org/cgi-bin/heron.cgi

/bin/rm -rf dataout
mkdir dataout

./download.sh -i datain/states-4326-base64.gml -mime application/zip -encoding base64  -url $URL -o dataout/states-4326.zip \
 -assign_srs epsg:4258 -target_format ESRI+Shapefile

./upload.sh -i dataout/states-4326.zip  -mime text/plain -url $URL -o dataout/states-4326.zip.json -assign_srs epsg:4326
cat dataout/states-4326.zip.json

./upload.sh -i datain/point-4326.json  -mime text/plain -url $URL -o dataout/point-4326.json.json -assign_srs epsg:4326
cat dataout/point-4326.json.json

./upload.sh -i datain/address-4326.csv  -mime text/plain -url $URL -o dataout/address-4326.csv.json -assign_srs epsg:4326
cat dataout/address-4326.csv.json

./upload.sh -i datain/rdpunten-28992.zip  -mime text/plain -url $URL -o dataout/rdpunten-28992.zip.json
cat dataout/rdpunten-28992.zip.json

./upload.sh -i datain/address-28992.json  -mime text/plain -url $URL -o dataout/address-4326.json -source_srs epsg:28992 -target_srs epsg:4326
cat dataout/address-4326.json

./upload.sh -i datain/rdpunten-28992.zip  -mime text/plain -url $URL -o dataout/rdpunten-4326.zip.json -target_srs epsg:4326
cat dataout/rdpunten-4326.zip.json

./download.sh -i datain/address-4326.csv  -mime text/plain -url $URL -o datain/address-4326.csv.gml -assign_srs epsg:4326
cat dataout/rdpunten-28992.zip.json

./download.sh -i datain/address-4326.json  -source_format GeoJSON -target_format GML -mime text/plain -url $URL -o dataout/address-4326.json.gml

cat dataout/address-4326.json.gml

./download.sh -i datain/point-4326.json  -source_format GeoJSON -mime text/plain -url $URL -source_srs epsg:4326\
              -target_srs epsg:900913 -encoding none -o dataout/point-900913.gml -target_format GML

cat dataout/point-900913.gml

./download.sh -i dataout/point-900913.gml  -source_format GML -target_format GML -mime text/plain -url $URL \
  -source_srs epsg:900913 -target_srs epsg:4326 -encoding none -o dataout/point-900913to4326.gml

cat dataout/point-900913to4326.gml
