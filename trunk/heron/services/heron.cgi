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


def findshapelayer(fz):
    # print("readzipfile content=" + str(fz.namelist()))
    for file_path in fz.namelist():
        ext = file_path.split('.')
        # print("readzipfile: " + naam)
        if len(ext) == 2:
            if ext[1] == 'shp':
                layer_name = ext[0]
                if '/' in layer_name:
                    layer_name = layer_name.split('/')
                    layer_name = layer_name[len(layer_name)-1]

                return '/' + file_path, layer_name


def shape2json(zip_file_path):
    import fiona

    zip_file = zipfile.ZipFile(zip_file_path, "r")
    shape_file, shape_layer = findshapelayer(zip_file)

    vfs_path = 'zip://' + zip_file_path
    with fiona.open(shape_file, 'r', layer=shape_layer, vfs=vfs_path) as source:
        meta = source.meta
        # print source.meta
        meta['driver'] = 'GeoJSON'

        # Open an output file, using the same format driver and coordinate
        # reference system as the source. The ``meta`` mapping fills in
        # the keyword parameters of fiona.open().
        with fiona.open('/vsistdout/', 'w', **meta) as sink:
            for f in source:
                sink.write(f)


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
        if zipfile.is_zipfile(file_item.filename):
            shape2json(file_item.file)
        else:
            if encoding == 'escape':
                data = cgi.escape(data)
            print(data)
    else:
        print(' ')


# Convert data to shape file and force a download to file in the browser.
def to_shape():
    if not param_available(['data']):
        return

    print('Content-Type: text/html')
    print('')
    print('ESRI Shapefile export not yet implemented')

# Action handlers: jump table with function pointers
handlers = {
'download': download,
'upload': upload,
'to_shape': to_shape
}

handlers[params.getvalue('action', 'download')]()





