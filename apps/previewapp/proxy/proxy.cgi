#!/usr/bin/env python

import urllib2
import cgi
import sys, os

# Designed to prevent Open Proxy type stuff.

allowedHosts = ['local.lib.heron-mc.org','apps.heron-mc.org', 'geodata.nationaalgeoregister.nl', 'local.geodata.nationaalgeoregister.nl',
                'ontwikkel.geodata.nationaalgeoregister.nl', 'test.geodata.nationaalgeoregister.nl',
                'acceptatie.geodata.nationaalgeoregister.nl', 'http:/www.dinoservices.nl']

# Blacklist: whitelisted PDOK services
blockedPaths = ['kadastralekaart', 'brkpilot', 'asbestscholenkaart']

method = os.environ["REQUEST_METHOD"]

if method == "POST":
    qs = os.environ["QUERY_STRING"]
    d = cgi.parse_qs(qs)
    if d.has_key("url"):
        url = d["url"][0]
    else:
        url = "http://geodata.nationaalgeoregister.nl"
else:
    fs = cgi.FieldStorage()
    url = fs.getvalue('url', 'http://geodata.nationaalgeoregister.nl')

try:
    host = url.split("/")[2]
    blockedPath = False

    for path in blockedPaths:
        if path in url:
            blockedPath = True

    if allowedHosts and not host in allowedHosts or blockedPath:
        print "Status: 502 Bad Gateway"
        print "Content-Type: text/plain"
        print
        print "Proxy disallowed access to url: %s" % url
        print
        # print os.environ

    elif url.startswith("http://") or url.startswith("https://"):
        if method == "POST":
            length = int(os.environ["CONTENT_LENGTH"])
            headers = {"Content-Type": os.environ["CONTENT_TYPE"]}
            body = sys.stdin.read(length)
            r = urllib2.Request(url, body, headers)
            y = urllib2.urlopen(r)
        else:
            y = urllib2.urlopen(url)

        # print content type header
        i = y.info()
        if i.has_key("Content-Type"):
            print "Content-Type: %s" % (i["Content-Type"])
        else:
            print "Content-Type: text/plain"
        print

        print y.read()

        y.close()
    else:
        print "Content-Type: text/plain"
        print
        print "Illegal request."

except Exception, E:
    print "Status: 500 Unexpected Error"
    print "Content-Type: text/plain"
    print
    print "Some unexpected error occurred. Error text was:", E
