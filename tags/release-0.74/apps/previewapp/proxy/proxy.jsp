<%@page session="false"%>
<%@page import="java.net.*,java.io.*"%>
<%!String[] serverUrls = {
        	// lijst met toegestane servers; deze lijst aanpassen per omgeving
            //"<url>[,<token>]"
            //For ex. (secured server): "http://myserver.mycompany.com/arcgis/rest/services,ayn2C2iPvqjeqWoXwV6rjmr43kyo23mhIPnXz2CEiMA6rVu0xR0St8gKsd0olv8a"
            //For ex. (non-secured server): "http://sampleserver1.arcgisonline.com/arcgis/rest/services"
            "http://localhost:8080",
            "http://www.openrouteservice.org/",
            "http://ontwikkel.geodata.nationaalgeoregister.nl/",
            "http://test.geodata.nationaalgeoregister.nl/",
            "http://acceptatie.geodata.nationaalgeoregister.nl/",
            "http://geodata.nationaalgeoregister.nl/" // NOTE - no comma after the last item
    };%>
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
            log("Proxy voor request met URL: " + reqUrl + " is niet toegestaan.");
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
        //IE 6 ev. kan "text/xml; subtype=gml/2.1.2" niet aan dus knippen we het 
        // subtype stukje eraf.
        if(con.getContentType().contains("subtype=")){
          String ctype=con.getContentType();
          response.setContentType(ctype.substring(0, ctype.indexOf(";")));
        }
        else{
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
        log("Fout met ophalen van url. ("+ reqUrl +")", e);
        response.setStatus(500);
    }
%>
