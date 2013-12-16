@echo off

echo if you see
echo "'python` is not recognized as an internal or external command"
echo then see the readme.txt for information to install Python.
echo

rem may need this if you don't want to change global env settings
rem SET PATH=C:\python27;C:\Program files\GDAL;%PATH%
rem SET GDAL_DATA=C:\Program files\GDAL\gdal-data

python startheron.py %*

pause
