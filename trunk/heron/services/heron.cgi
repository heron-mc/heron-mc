#!/usr/bin/env python
#
# heron.cgi - generic RESTful services for Heron
#
# This CGI provides Heron services that can only/better be handled
# within a server. The setup is generic: a parameter 'action' determines
# which function is to be called.
import cgi
import cgitb
import base64

cgitb.enable()

params = cgi.FieldStorage()

def param_available(param_names):
    for param_name in param_names:
        if param_name not in params:
            print('Content-Type: text/html')
            print('')
            print('<h2>Heron Export - Error</h2>')
            print('Please supply in the the param_availabled query parameter <i>%s</i>.' % param_name )
            return False

    return True


def download():
    if not param_available(['mime', 'data', 'filename']):
        return

    filename = params.getvalue('filename')
    mime = params.getvalue('mime')
    data = params.getvalue('data')
    data = base64.b64decode(data)
    print('Content-Type: %s' % mime)
    # Forces download in browser
    print('Content-Disposition: attachment; filename="%s"' % filename)
    print('')
    print(data)

def to_shape():
    if not param_available(['data']):
        return

        print('Content-Type: text/html')
        print('')
        print('ESRI Shapefile export not yet implemented')

# Action handlers: jump table with function pointers
handlers = {
    'download': download,
    'to_shape': to_shape
}

handlers[params.getvalue('action', 'download')]()





