<?xml version="1.0" encoding="UTF-8"?>

<!--
 merge.xslt - merge Heron Map Context references into single HMC file

 DESCRIPTION
 This XSLT Stylesheet can be used to merge Heron Map Context (HMC) context "references" in into a single
 HMC XML file. See e.g. example2.xml

     <contextFolder>
        <isExpanded>true</isExpanded>
        <title>Adminstratieve eenheden</title>
        <context>
            <url>include/bestuurlijkegrenzen</url>
        </context>
        <context>
            <url>include/wijkenenbuurten</url>
        </context>
    </contextFolder>

 Here <url>include/bestuurlijkegrenzen</url> and <url>include/wijkenenbuurten</url> are references
 to HMC files in the subdirectory "include", i.e. include/bestuurlijkegrenzen.xml and
 include/wijkenenbuurten.xml respectively.

 Although the HMC processor can load references, advantage of a single file is loading speed.

 USAGE
 (on Mac/Linux) : xsltproc merge.xslt example2.xml > example2-unmerged.xml

 AUTHOR
 Marco Nijdam - original version for PDOK
 Just van den Broecke - rename preview.pdok.nl to HMC NS and ported to Heron trunk
-->
<xsl:stylesheet version="1.0"
                xmlns:hmc="http://schemas.heron-mc.org/hmc/1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output omit-xml-declaration="no" indent="yes"/>
    <xsl:strip-space elements="*"/>

    <xsl:template match="hmc:context[hmc:url]">
        <xsl:copy-of select="document(concat(current()/hmc:url, '.xml'))/hmc:contextCollection/*"/>
    </xsl:template>

    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>
</xsl:stylesheet>
