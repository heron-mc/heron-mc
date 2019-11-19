#!/usr/bin/env python
#
# heron.cgi - generic RESTful services for Heron
#
# This WSGI/CGI script provides Heron services that can only/better be handled
# within a server. The setup is generic: a form parameter 'action' determines
# which function is to be called. The other parameters are specific to
# each handler. When using any data conversions and reprojections, the program
# ogr2ogr from GDAL/OGR (www.gdal.org) is required to be installed on your system.

# Global var: name or path of the GDAL/OGR utility: ogr2ogr
# In many cases the program is found via the PATH variable,
# but in some cases, mostly with custom installs, one may change
# this variable to the full pathname where ogr2ogr resides.
# For example: OGR2OGR_PROG = '/usr/local/bin/ogr2ogr'.
# Also note that the GDAL_DATA global var may be required for reprojections.
#
# WSGI: this script can run under as a standard CGI or with Python WSGI. When loaded
# the script sniffs if it runs as CGI or WSGI and acts accordingly.
# When run as a 'main' this script will start a standalone WSGI server.
#
# Authors: Just van den Broecke, Marco Duiker (initial WSGI version)
#
OGR2OGR_PROG = 'ogr2ogr'

import cgi
import cgitb
import base64
import zipfile
import subprocess
import os
import tempfile
import sys
import shutil
from StringIO import StringIO
import urllib


def print_err(*args):
    sys.stderr.write(' '.join(map(str,args)) + '\n')


def send_error(reason='Unknown'):
    raise Exception(reason)


def send_param_error(reason, param_name='Unknown'):
    send_error(reason + ' <i>%s</i>.' % param_name)


def param_available(param_names, params):
    for param_name in param_names:
        if param_name not in params:
            send_param_error('Please supply query parameter', param_name=param_name)
            return False

    return True


def findshapelayer(zip_file_path):
    # print_err("findshapelayer f=" + zip_file_path)
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

                # print_err("findshapelayer file_path=%s layer_name=%s" % (file_path, layer_name))
                return file_path, layer_name


# convert data into file
def prepare_ogr_in_file(data, dir_path, suffix='.ogr', ):
    in_file = os.path.join(dir_path, 'hr_ogr_in' + suffix)

    try:
        in_fd = open(in_file, 'wb')
        in_fd.write(data)
        in_fd.close()
    except Exception, e:
        print_err('Cannot write data to infile: %s err=%s' % (in_file, str(e)))
        raise

    return in_file


# Create temp dir
def prepare_dir(prefix='hr_', suffix=None, dir_path=None):
    return tempfile.mkdtemp(prefix=prefix, suffix=suffix, dir=dir_path)


# Convert a CGI file_item to given format using ogr2ogr
# return result as data blob
# TODO generalize e.g. s_srs and t_srs
def prepare_upload_files(file_item, file_ext_in, work_dir):
    # A bit tricky: CGI gives us a file item, but the file
    # is already open, so we need to do the following
    # 1. write form value data to temp zip file (in_file)
    # 2. provide writeable tempfile (out_file)
    # 3. call ogr2ogr
    # 4. read and return the data from the out_file
    in_file = prepare_ogr_in_file(file_item.value, work_dir, suffix=file_ext_in)
    out_file = os.path.join(work_dir, 'hr_ogr_out.ogr')

    # Assume ogr2ogr input file is temp file 'in_file
    if file_ext_in == '.zip':
        # Zipped Shapefile: use /vsizip// virtual path.
        # Find the first layer in the .zip file and the path, we construct
        # an ogr /vsizip path from that
        # See http://trac.osgeo.org/gdal/wiki/UserDocs/ReadInZip
        layer_path, layer_name = findshapelayer(in_file)
        if layer_path is None or layer_name is None:
            print_err('Cannot find Shape in zip file: %s' % in_file)
            raise Exception('Cannot find Shape in zip file: %s' % in_file)

        in_file = '/vsizip/' + in_file + '/' + layer_path
    else:
        if file_ext_in == '.csv':
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
            in_vrt_fd, in_vrt_file = tempfile.mkstemp(prefix='hr_', suffix='.vrt', dir=work_dir)
            os.write(in_vrt_fd, ogr_vrt.strip())
            os.close(in_vrt_fd)

            in_file = in_vrt_file

    return in_file, out_file


# Convert a CGI file_item to given format using ogr2ogr
# return result as data blob
# TODO generalize e.g. s_srs and t_srs
def ogr2ogr(out_file, in_file, target_format, assign_srs=None, source_srs=None, target_srs=None):
    try:

        # Entire ogr2ogr command line
        # Make ogr2ogr command line, use separator | to deal with quotes etc.
        cmd_tmpl = OGR2OGR_PROG

        # Force 2D otherwise failure with 3D input file
        cmd_tmpl += '|-dim|2'

        if assign_srs:
            cmd_tmpl += '|-a_srs|' + assign_srs
        if source_srs:
            cmd_tmpl += '|-s_srs|' + source_srs
        if target_srs:
            cmd_tmpl += '|-t_srs|' + target_srs

        cmd_tmpl += '|-f|%s|%s|%s'
        cmd = cmd_tmpl % (target_format, out_file, in_file)
        cmd = cmd.split('|')

        # Call ogr2ogr
        ret_code = subprocess.call(cmd)
        # print 'ret_code = %d' % ret_code

    except Exception, e:
        print_err('Error in ogr2ogr in Heron.cgi in=%s out=%s fmt=%s, err=%s' % (in_file, out_file, target_format, str(e)))
        raise

    return out_file

# Echo data back to client forcing a download to file in the browser.
def get_file_data(file_path):
    # Fetch data result from output file
    # TODO with CGI we should be able to output to stdout thus directly to client
    data_out = None
    try:
        out_fd = open(file_path)
        data_out = out_fd.read()
        out_fd.close()
    except Exception, e:
        print_err('Cannot read data from result file: %s, err=%s' % (file_path, str(e)))
        raise

    return data_out


# Echo data back to client forcing a download to file in the browser.
def remove_files(in_file, out_file):
    # Cleanup
    # os.remove(in_file)
    if os.path.isfile(out_file):
        os.remove(out_file)
    if os.path.isfile(in_file):
        os.remove(in_file)


# Echo data back to client forcing a download to file in the browser.
def download(params):
    if not param_available(['mime', 'data', 'filename'], params):
        return

    # Get the form-based data values
    filename = params.getvalue('filename')
    mime = params.getvalue('mime')
    data = params.getvalue('data')

    # decode if Base64 encoded
    encoding = params.getvalue('encoding', 'none')
    if encoding == 'base64':
        data = base64.b64decode(data)
    elif encoding == 'url':
        data = urllib.unquote(data)

    # Data len: string length plus any LF/CRs, override when converted
    # data_len = len(data) + data.count('\n') + data.count('\r')
    # Hmm appearantly this should be correct...
    data_len = len(data)

    # check and do conversion (via ogr2ogr) if required
    if 'target_format' in params or 'target_srs' in params:
        work_dir = prepare_dir(suffix='_dlwrk')

        try:
            format_file_exts = {'GeoJSON': '.json'}
            file_ext_in = '.ogr'

            source_format = params.getvalue('source_format', 'unknown')
            if format_file_exts.has_key(source_format):
                file_ext_in = format_file_exts[source_format]

            in_file = prepare_ogr_in_file(data, work_dir, suffix=file_ext_in)

            f, file_ext_out = os.path.splitext(filename.lower())
            target_format = params.getvalue('target_format')

            out_dir = None
            if target_format == 'ESRI Shapefile':
                out_dir = os.path.join(work_dir, 'hr_ogr_shp')
                os.mkdir(out_dir)
                out_file = os.path.join(out_dir, filename)
                out_file, ignore = os.path.splitext(out_file)
                out_file += '.shp'
            else:
                out_file = os.path.join(work_dir, 'hr_ogr_out' + file_ext_out)

            assign_srs = params.getvalue('assign_srs', None)
            source_srs = params.getvalue('source_srs', None)
            target_srs = params.getvalue('target_srs', None)

            out_file = ogr2ogr(out_file, in_file, target_format, assign_srs=assign_srs, source_srs=source_srs, target_srs=target_srs)

            if target_format == 'ESRI Shapefile':
                # Result in directory with Shapefiles: zip dir into memory buffer
                # http://www.velocityreviews.com/forums/t566125-python-cgi-presenting-a-zip-file-to-user.html
                buf = StringIO()
                z = zipfile.ZipFile(buf, 'w', zipfile.ZIP_DEFLATED)

                files = os.listdir(out_dir)

                # Little nested function to prepare the proper archive path
                # Inspired by http://peterlyons.com/problog/2009/04/zip-dir-python
                def trimPath(path):
                    archivePath = path.replace(out_dir, "", 1)
                    if out_dir:
                        archivePath = archivePath.replace(os.path.sep, "", 1)
                    return os.path.normcase(archivePath)

                for f in files:
                    filePath = os.path.join(out_dir, f)
                    z.write(filePath, trimPath(filePath))

                z.close()

                buf.seek(0)
                data = buf.read()
                data_len = len(data)
                buf.close()
            else:
                data = get_file_data(out_file)
                data_len = os.path.getsize(out_file)

        except Exception, e:
            print_err('Error in conversion: %s' % str(e))
            shutil.rmtree(work_dir)
            raise

        shutil.rmtree(work_dir)

    status = '200 OK'
    response_headers = [
        ('Content-type', mime),
        ("Content-Disposition","attachment; filename=%s" % filename),
        ("Content-Title", filename),
        ("Content-Length", str(data_len))
    ]
    return status, response_headers, data


# Echo uploaded file back to client as data.
def upload(params):
    if not param_available(['mime', 'file'], params):
        return

    # Get the form-based data values
    mime = params.getvalue('mime')
    file_item = params['file']
    encoding = params.getvalue('encoding', 'none')

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
        f, file_ext_in = os.path.splitext(file_item.filename.lower())
        if file_ext_in == '.zip' or file_ext_in == '.gpkg' or file_ext_in == '.csv' or 'target_srs' in params:
            # Convert with ogr2ogr
            work_dir = prepare_dir(suffix='_upwrk')

            in_file, out_file = prepare_upload_files(file_item, file_ext_in, work_dir)
            assign_srs = params.getvalue('assign_srs', None)
            source_srs = params.getvalue('source_srs', None)
            target_srs = params.getvalue('target_srs', None)

            out_file = ogr2ogr(out_file, in_file, 'GeoJSON', assign_srs=assign_srs, source_srs=source_srs, target_srs=target_srs)
            data = get_file_data(out_file)
            shutil.rmtree(work_dir)

        if encoding == 'base64':
            data = base64.b64encode(data)
        elif encoding == 'url':
            data = urllib.quote(data)
        elif encoding == 'escape':
            data = cgi.escape(data)
    else:
        data = 'No file data received'

    status = '200 OK'
    response_headers = [('Content-type', mime),("Content-Length", str(len(data)))]
    return status, response_headers, data

# WSGI entry method: called by WSGI framework
def application(environ, start_response):

    if "REQUEST_METHOD" in environ and environ['REQUEST_METHOD'] == 'POST':
        post_env = environ.copy()
        post_env['QUERY_STRING'] = ''

        # Convert data in WSGI environment dict to FieldStorage
        # object for CGI-compat
        params = cgi.FieldStorage(
            fp=environ['wsgi.input'],
            environ=post_env,
            keep_blank_values=True
        )

        print 'WSGI param_count %d params=%s' % (len(params.keys()), str(params))
        print 'WSGI environ=%s' % str(environ)

        # Execute processing function based on 'action' param
        status, response_headers, data = HANDLERS[params.getvalue('action', 'download')](params)

        # return response
        start_response(status, response_headers)
        return [data]
    else:
        send_error('Only POST is supported')


# WSGI standalone server, mainly for testing
def wsgi_server(app_func, port):
    # WSGI standalone server: no CGI params and the main program
    try:
        from wsgiref.simple_server import make_server
        httpd = make_server('', port, app_func)
        print('Serving on port %d...' % port)
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('Goodbye.')

# CGI entry method: called locally
def cgi_application(params):

    # CGI-version: execute function based on 'action' param
    action = params.getvalue('action', 'download')
    status, response_headers, data = HANDLERS[action](params)
    headers = ''
    if action == 'upload':
        # Echo back data to client
        HEADERS = '\r\n'.join(
        [
            "Content-Type: %s;",
            "Content-Length: %i",
            "\r\n", # empty line to end headers
        ]
        )
        headers = HEADERS % (response_headers[0][1], len(data))

    # response_headers = [('Content-type', mime),("Content-Length", len(data))]
    elif action == 'download':
        # Send result to client
        HEADERS = '\r\n'.join(
        [
            "Content-Type: %s;",
            "Content-Disposition: %s",
            "Content-Title: %s",
            "Content-Length: %i",
            "\r\n", # empty line to end headers
        ]
        )
        # newlines are not counted with len so add newlines to length
        headers = HEADERS % (response_headers[0][1], response_headers[1][1], response_headers[2][1], len(data))

    sys.stdout.write(headers)

    sys.stdout.write(data)


# Enable exception handling
cgitb.enable()

# Get form/query params (CGI)
parameters = cgi.FieldStorage()
param_count = len(parameters.keys())
# print 'param_count %d params=%s' % (param_count, str(parameters))

# Action handlers: jump table with function pointers
HANDLERS = {
    'download': download,
    'upload': upload
}

# Determine how we are called: as CGI, or WSGI. The latter via a server framework like mod_wsgi
# or our built-in standalone wsgiref server.
if param_count > 0 and 'wsgi.version' not in parameters:
    # We are called as CGI: handle with CGI function
    cgi_application(parameters)

elif param_count == 0 and __name__ == '__main__':
    # WSGI: run standalone server
    wsgi_server(application, 8000)

else:
    # Standard WSGI: do nothing as WSGI entry-function 'application' will be invoked
    pass
