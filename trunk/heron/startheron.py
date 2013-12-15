#!/usr/bin/env python
import CGIHTTPServer

port = 8000

def main():
    server_address = ('', port)
    handler = CGIHTTPServer.CGIHTTPRequestHandler
    # handler.cgi_directories = ['/services/cgi-bin', '/cgi-bin']
    server = CGIHTTPServer.BaseHTTPServer.HTTPServer(server_address, handler)
    try:
        print('Heron server starting, browse to http://127.0.0.1:%i, shutdown with Ctrl-C' % port)
        server.serve_forever()
    except KeyboardInterrupt:
        server.socket.close()

if __name__ == '__main__':
    main()
