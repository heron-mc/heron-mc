#!/usr/bin/env python

# Python-based webserver to run Heron examples
#
import CGIHTTPServer
import os

# default port and address to listen to
port = 8000
address = ''

# Extend as to enable .cgi files to be recognized (Windows issue)
class MyCGIHTTPRequestHandler(CGIHTTPServer.CGIHTTPRequestHandler):
    def is_python(self, path):
        """Test whether argument path is a Python script."""
        head, tail = os.path.splitext(path)
        return tail.lower() in (".py", ".pyw", ".cgi")

# Main webserver that also can execute cgi programs
# NOT FOR PRODUCTION USE!!
def main():

    server = CGIHTTPServer.BaseHTTPServer.HTTPServer((address, port), MyCGIHTTPRequestHandler)
    try:
        print('Heron server starting, browse to http://127.0.0.1:%i/examples, shutdown with Ctrl-C' % port)
        server.serve_forever()
    except KeyboardInterrupt:
        server.socket.close()

if __name__ == '__main__':
    main()
