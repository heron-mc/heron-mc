<?xml version="1.0" encoding="UTF-8"?>
<!--
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation, either version 3 of the License, or
  ~ (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~ GNU General Public License for more details.
  ~
  ~ You should have received a copy of the GNU General Public License
  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.
  -->


<!--

Transform WMS capabilities doc to OpenLayers Layer JavaScript objects.

Author:  Just van den Broecke, Just Objects B.V.

-->
<xsl:stylesheet version="1.0"

                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="text" version="1.0" encoding="utf-8" indent="yes"/>

    <xsl:variable name="WMSTITLE">
         <xsl:value-of select="//Service/Title"/>
     </xsl:variable>

<!--    <xsl:variable name="WMSURL">
        '<xsl:value-of select="//Service/OnlineResource/@xlink:href"/>'
    </xsl:variable>    -->

    <xsl:variable name="WMSURL">Heron.urls.KB_NK_NL_WMS</xsl:variable>

    <xsl:template match="/">


        <!-- Loop through all Layer elements -->
        <xsl:apply-templates select="//Layer/Layer" mode="layerdef"/>

        {
            text: '<xsl:value-of select="$WMSTITLE"/>', expanded: true, children:
        [
        <xsl:apply-templates select="//Layer/Layer" mode="layertree"/>
        ]
        },

    </xsl:template>

    <!-- Generate JS for WMS Layer obj def -->
    <xsl:template match="Layer" mode="layerdef">
        <!-- Get Layer LayerName -->
        <xsl:variable name="LayerName">
            <xsl:value-of select="Name"/>
        </xsl:variable>
    new OpenLayers.Layer.WMS(
        '<xsl:value-of select="$LayerName"/>',
        <xsl:value-of select="$WMSURL"/>,
        {layers: '<xsl:value-of select="$LayerName"/>', format: 'image/png', transparent: true},
        {singleTile: true, isBaseLayer: false, visibility: false}),
    </xsl:template>

    <!-- Generate JS for WMS Layer obj def for Layer tree -->
      <xsl:template match="Layer" mode="layertree">
          <!-- Get Layer LayerName -->
          <xsl:variable name="LayerName">
              <xsl:value-of select="Name"/>
          </xsl:variable>
          {nodeType: "gx_layer", layer: "<xsl:value-of select="$LayerName"/>" },
     </xsl:template>

</xsl:stylesheet>
