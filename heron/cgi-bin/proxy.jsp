<%@page session="false" %>
<%@page import="java.net.*,java.io.*" %>

<%!
/* This is a blind proxy for use in Java servers like Tomcat.
Place this in a server (Tomcat) directory where JSP pages are executed.

 We use this to get around browser
restrictions that prevent the Javascript from loading pages not on the
same server as the Javascript (cross-origin).  This has several problems: it's less
efficient, it might break some sites, and it's a security risk because
people can use this proxy to browse the web and possibly do bad stuff
with it.  It only loads pages via http and https, but it can load any
content type. It supports GET and POST requests. */
    String[] serverUrls = {
            // List of allowed servers
            //"<url>[,<token>]"
            //For ex. (secured server): "http://myserver.mycompany.com/arcgis/rest/services,ayn2C2iPvqjeqWoXwV6rjmr43kyo23mhIPnXz2CEiMA6rVu0xR0St8gKsd0olv8a"
            //For ex. (non-secured server): "http://sampleserver1.arcgisonline.com/arcgis/rest/services"
            "http://pdokviewer.pdok.nl",
            "http://www.nationaalgeoregister.nl",
            "http://mesonet.agron.iastate.edu",
            "http://gis.opentraces.org",
            "http://maps.warwickshire.gov.uk",
            "http://suite.opengeo.org",
            "http://gxp.opengeo.org",
            "http://arcserve.lawr.ucdavis.edu",
            "http://dinolab52.dinonet.nl",
            "http://msgcpp-ogc-realtime.knmi.nl",
            "http://geoservices.knmi.nl",
            "http://www.kich.nl",
            "http://open.mapquestapi.com",
            "http://gis.kademo.nl",
            "http://kademo.nl",
            "http://www.dinoservices.nl",
            "http://geodata.nationaalgeoregister.nl",
            "http://www2.demis.nl",
            "http://maps.opengeo.org",
            "http://demo.opengeo.org",
            "http://data.fao.org",
            "http://suite.opengeo.org"
            // NOTE - no comma after the last item
    };
%>
<%
    String reqUrl = "";
    try {
        reqUrl = request.getQueryString();
        reqUrl = URLDecoder.decode(reqUrl, "UTF-8");
        boolean allowed = false;
        String token = null;
        for (String surl : serverUrls) {
            String[] stokens = surl.split("\\s*,\\s*");
            if (reqUrl.toLowerCase().contains(stokens[0].toLowerCase())) {
                allowed = true;
                if (stokens.length >= 2 && stokens[1].length() > 0)
                    token = stokens[1];
                break;
            }
        }
        if (!allowed) {
            log("Proxy voor request met URL: " + reqUrl + " not allowed");
            response.setStatus(403);
            return;
        }
        if (token != null) {
            reqUrl = reqUrl + (reqUrl.indexOf("?") > -1 ? "&" : "?")
                    + "token=" + token;
        }
        URL url = new URL(reqUrl);
        HttpURLConnection con = (HttpURLConnection) url
                .openConnection();
        con.setDoOutput(true);
        con.setRequestMethod(request.getMethod());
        if (request.getContentType() != null) {
            con.setRequestProperty("Content-Type",
                    request.getContentType());
        }
        con.setRequestProperty("Referer", request.getHeader("Referer"));
        int clength = request.getContentLength();
        if (clength > 0) {
            con.setDoInput(true);
            InputStream istream = request.getInputStream();
            OutputStream os = con.getOutputStream();
            final int length = 5000;
            byte[] bytes = new byte[length];
            int bytesRead = 0;
            while ((bytesRead = istream.read(bytes, 0, length)) > 0) {
                os.write(bytes, 0, bytesRead);
            }
        }
        out.clear();
        out = pageContext.pushBody();
        OutputStream ostream = response.getOutputStream();
        // IE 6 ev. cannot cope with "text/xml; subtype=gml/2.1.2" so cut off 'subtype'.
        if (con.getContentType().contains("subtype=")) {
            String ctype = con.getContentType();
            response.setContentType(ctype.substring(0, ctype.indexOf(";")));
        } else {
            response.setContentType(con.getContentType());
        }
        InputStream in = con.getInputStream();
        final int length = 5000;
        byte[] bytes = new byte[length];
        int bytesRead = 0;
        while ((bytesRead = in.read(bytes, 0, length)) > 0) {
            ostream.write(bytes, 0, bytesRead);
        }
    } catch (Exception e) {
        log("Error fetching from url: (" + reqUrl + ")", e);
        response.setStatus(500);
    }
%>
