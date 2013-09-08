#!/usr/bin/env python
#
# heron.cgi - generic RESTful services for Heron
#
# This CGI provides Heron services that can only/better be handled
# within a server. The setup is generic: a parameter 'action' determines
# which function is to be called. The other parameters are specific to
# each handler.
import cgi
import cgitb
import base64
import zipfile
import subprocess
import os
import tempfile

cgitb.enable()

# Get form/query params
params = cgi.FieldStorage()


def param_available(param_names):
    for param_name in param_names:
        if param_name not in params:
            print('Content-Type: text/html')
            print('')
            print('<h2>Heron Export - Error</h2>')
            print('Please supply query parameter <i>%s</i>.' % param_name )
            return False

    return True


def findshapelayer(zip_file_path):
    # print("readzipfile content=" + str(fz.namelist()))
    zip_file = zipfile.ZipFile(zip_file_path, "r")
    for file_path in zip_file.namelist():
        ext = file_path.split('.')
        # print("readzipfile: " + naam)
        if len(ext) == 2:
            if ext[1] == 'shp':
                layer_name = ext[0]
                if '/' in layer_name:
                    layer_name = layer_name.split('/')
                    layer_name = layer_name[len(layer_name) - 1]

                return '/' + file_path, layer_name


# Convert a CGI file_item to given format using ogr2ogr
# return result as data blob
# TODO generalize e.g. s_srs and t_srs
def ogr2ogr(file_item, format_out, file_ext):
    # A bit tricky: CGI gives us a file item, but the file
    # is already open, so we need to do the following
    # 1. write form value data to temp zip file (in_file)
    # 2. provide writeable tempfile (out_file)
    # 3. call ogr2ogr
    # 4. read and return the data from the out_file
    in_fd, in_file = tempfile.mkstemp(prefix='hr_', suffix=file_ext)

    # Use tempfile just for filename, we will close and remove file
    # and use the file path/name, wasteful but necessary
    out_fd, out_file = tempfile.mkstemp(prefix='hr_', suffix='.ogr')
    in_ogr_file = in_file

    try:
        os.write(in_fd, file_item.value)
        os.close(in_fd)
        os.close(out_fd)
        os.remove(out_file)

        # Assume ogr2ogr input file is temp file 'in_file
        if file_ext == '.zip':
            # Zipped Shapefile: use /vsizip// virtual path.
            # Find the first layer in the .zip file and the path, we construct
            # an ogr /vsizip path from that
            layer_path, layer_name = findshapelayer(in_file)
            in_ogr_file = '/vsizip/' + in_file + layer_path
        else:
            if file_ext == '.csv':
                # Tricky: .csv needs an OGR VRT file that points to
                # the actual .csv file and contains info mainly for how to create
                # for example geometries from columns.
                # So we create a temp VRT file that points to our .csv, indicating
                # that the X,Y (or lower x,y) contain a Point geometry
                # Also some older versions of ogr2ogr may be picky on leading spaces in the VRT file.
                layer_name, ext = os.path.splitext(os.path.basename(in_file))
                ogr_vrt = '''
<OGRVRTDataSource>
    <OGRVRTLayer name="%s">
        <SrcDataSource SEPARATOR="COMMA">%s</SrcDataSource>
        <GeometryType>wkbPoint</GeometryType>
<!--        <LayerSRS>EPSG:28992</LayerSRS> -->
        <GeometryField encoding="PointFromColumns" x="X" y="Y" z="Z"/>
    </OGRVRTLayer>
</OGRVRTDataSource>
                ''' % (layer_name, in_file)

                # Create temp VRT file and fill
                in_vrt_fd, in_vrt_file = tempfile.mkstemp(prefix='hr_', suffix='.vrt')
                os.write(in_vrt_fd, ogr_vrt.strip())
                os.close(in_vrt_fd)

                in_ogr_file = in_vrt_file

        # Entire ogr2ogr command line
        # Make ogr2ogr command line, use separator | to deal with quotes etc.
        cmd_tmpl = 'ogr2ogr|-f|%s|%s|%s'
        cmd = cmd_tmpl % (format_out, out_file, in_ogr_file)
        cmd = cmd.split('|')

        # Call ogr2ogr
        ret_code = subprocess.call(cmd)
        # print 'ret_code = %d' % ret_code

        # Fetch data result from output file
        # TODO with CGI we should be able to output to stdout thus directly to client
        out_fd = open(out_file)
        data_out = out_fd.read()
        out_fd.close()
    except:
        data_out = 'Error in ogr2ogr in Heron.cgi '  + in_file

    # Cleanup
    os.remove(in_file)
    if os.path.isfile(out_file):
        os.remove(out_file)
    if os.path.isfile(in_ogr_file):
        os.remove(in_ogr_file)

    return data_out

# Echo data back to client forcing a download to file in the browser.
def download():
    if not param_available(['mime', 'data', 'filename']):
        return

    # Get the form-based data values
    filename = params.getvalue('filename')
    mime = params.getvalue('mime')
    data = params.getvalue('data')
    encoding = params.getvalue('encoding', 'base64')
    if encoding == 'base64':
        data = base64.b64decode(data)

    # Echo back to client
    print('Content-Type: %s' % mime)
    # Forces download in browser
    print('Content-Disposition: attachment; filename="%s"' % filename)
    print('')
    print(data)


# Echo uploaded file back to client as data.
def upload():
    if not param_available(['mime', 'file']):
        return

    # Get the form-based data values
    mime = params.getvalue('mime')
    file_item = params['file']
    encoding = params.getvalue('encoding', 'none')

    # Start echo back
    print('Content-Type: %s' % mime)
    print('')

    # Test if the file was uploaded
    if file_item.filename:
        # strip leading path from file name to avoid directory traversal attacks
        # fn = os.path.basename(fileitem.filename)
        # open('files/' + fn, 'wb').write(fileitem.file.read())
        # Echo back file content to client
        # print tempfile.gettempprefix()
        # print file_item.filename
        # file_path = os.path.join(self.path, file_item.filename)
        # temp_file = tempfile.TemporaryFile()
        # file_path = file_item.file.name
        data = file_item.value

        # if the upload is a .zip file we assume a zipped ESRI Shapefile
        # we convert it to GeoJSON, such that the client can read it
        # The config in the Heron client (Upload or Editor) should then have an entry like:
        # {name: 'ESRI Shapefile (1 laag, gezipped)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'}
        f, file_ext = os.path.splitext(file_item.filename.lower())
        if file_ext == '.zip' or file_ext == '.csv':
            data = ogr2ogr(file_item, 'GeoJSON', file_ext)

        if encoding == 'escape':
            data = cgi.escape(data)

        print(data)
    else:
        print(' ')


# Action handlers: jump table with function pointers
handlers = {
    'download': download,
    'upload': upload
}

handlers[params.getvalue('action', 'download')]()
