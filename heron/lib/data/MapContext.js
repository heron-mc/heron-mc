/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.namespace("Heron.data");

/** api: (define)
 *  module = Heron.data
 *  class = MapContext
 *  base_link = `Ext.DomHelper <http://docs.sencha.com/ext-js/3-4/#!/api/Ext.DomHelper>`_
 */
/**
 * Define functions to help with Map Context open and save.
 */
Heron.data.MapContext = {
    prefix: "heron:",
    initComponent: function () {
        Heron.data.MapContext.superclass.initComponent.call(this);
    },
    /** method[saveContext]
     *  Save a Web Map Context file
     *  :param mapPanel: Panel with the Heron map
     *         options: config options
     */
    saveContext: function (mapPanel, options) {
        var self = this;
        var data = self.writeContext (mapPanel);
        // data = Heron.Utils.formatXml;
        // this formatter is preferred: less returns, smaller padding
        data = this.formatXml(data);
        data = Base64.encode(data);
        try {
            // Cleanup previous form if required
            Ext.destroy(Ext.get('hr_downloadForm'));
        }
        catch (e) {
        }
        var formFields = [
            {tag: 'input', type: 'hidden', name: 'data', value: data},
            {tag: 'input', type: 'hidden', name: 'filename', value: options.fileName + options.fileExt},
            //{tag: 'input', type: 'hidden', name: 'fileExt', value: options.fileExt},
            {tag: 'input', type: 'hidden', name: 'mime', value: 'text/xml'},
            //{tag: 'input', type: 'hidden', name: 'encoding', value: 'url'},
            {tag: 'input', type: 'hidden', name: 'encoding', value: 'base64'},
            //{tag: 'input', type: 'hidden', name: 'encoding', value: 'none'},
            {tag: 'input', type: 'hidden', name: 'action', value: 'download'},
        ];

        var form = Ext.DomHelper.append(
                document.body,
                {
                    tag: 'form',
                    id: 'hr_downloadForm',
                    method: 'post',
                    /** Heron CGI URL, see /services/heron.cgi. */
                    action: Heron.globals.serviceUrl,
                    children: formFields
                }
        );

        // Add Form to document and submit
        document.body.appendChild(form);
        form.submit();
    },
     /** method[openContext]
     *  Open a Web Map Context file
     *  :param mapPanel: Panel with the Heron map
     *         options: config options
     */
    openContext: function (mapPanel, options){
        var self = this;
        var data = null;
        try {
            // Cleanup previous form if required
            Ext.destroy(Ext.get('hr_uploadForm'));
        }
        catch (e) {
        }

        var uploadForm = new Ext.form.FormPanel({
            id: 'hr_uploadForm',
            fileUpload: true,
            width: 300,
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 5,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items:[
            {
                xtype: 'field',
                id: 'mapfile',
        		name: 'file',
                inputType: 'file'
            }],

            buttons: [{
                text: __('Upload'),
                handler: function(){
                    if(uploadForm.getForm().isValid()){
                        var fileField = uploadForm.getForm().findField('mapfile');
                        var selectedFile = fileField.getValue();
                        if (!selectedFile) {
                            Ext.Msg.alert(__('Warning'), __('No file specified.'));
                            return;
                        }
                        uploadForm.getForm().submit({
                            url: Heron.globals.serviceUrl,
                            params: {
                                action: 'upload',
                                mime: 'text/html',
                                encoding: 'base64'
                            },
                            waitMsg: __('Uploading file...'),
                            success: function(form, action){
                                console.log ('Processed file on the server.');
                                //data = decodeURIComponent(action.response.responseText);
                                data = Base64.decode(action.response.responseText);
                                self.loadContext (mapPanel, data);
                                uploadWindow.close();
                            },
                            failure: function (form, action){
                                //somehow we allways get no succes althought the response is as expected
                                console.log ('Fail on the server? But can go on.');
                                //data = decodeURIComponent(action.response.responseText);
                                data = Base64.decode(action.response.responseText);
                                self.loadContext (mapPanel, data);
                                uploadWindow.close();
                            }
                        });
                    }
                }
            },
            {
                text: __('Cancel'),
                handler: function(){
                    uploadWindow.close();
            }
            }]
        });

        var uploadWindow = new Ext.Window({
            id: 'hr_uploadWindow',
            title: 'Upload',
            closable:true,
            width: 400,
            height: 120,
            plain:true,
            layout: 'fit',
            items: uploadForm,
            listeners: {
                show: function() {
                    var form = this.items.get(0);
                    form.getForm().load();
                }
            }
        });
        uploadWindow.show();

    },
     /** private: method[writeContext]
     *  Write a Web Map Context in the map
     *  :param mapPanel: Panel with the Heron map
     *  :return data: the Web Map Context
     */
    writeContext: function (mapPanel) {
        var map = mapPanel.getMap();
        // Write the standard context including OpenLayers context
        var format = new OpenLayers.Format.WMC();
        var data = format.write(map);
        format = new OpenLayers.Format.XML();

        // Convert XML string to DOM document
        // We skip this as we cannot find the root element
        //data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
        var node = null;
        var nodeExtension = format.createElementNSPlus("Extension");

        if (Heron.App.topComponent.findByType('hr_layertreepanel')[0].treeConfig != null){

            var treeJson = Heron.App.topComponent.findByType('hr_layertreepanel')[0].treeConfig
            node = format.createElementNSPlus(this.prefix + "treeConfig", {value: treeJson});

            nodeExtension.appendChild(node);
            nodeExtension = OpenLayers.Format.XML.prototype.write.apply(this, [nodeExtension]);

            // Remove xmlns="undefined" xmlns:heron="undefined"
            nodeExtension = nodeExtension.replace(/ xmlns="undefined"/g,'');
            nodeExtension = nodeExtension.replace(/ xmlns:heron="undefined"/g,'');
            //console.log (nodeExtension);
            data = data.replace("</LayerList>","</LayerList>" + nodeExtension);
        }

        //console.log (data);
        return data;
    },
    /** private: method[loadContext]
     *  Load a Web Map Context in the map
     *  :param mapPanel: Panel with the Heron map
     *         data: the Web Map Context
     */
    loadContext: function (mapPanel, data) {
        var map = mapPanel.getMap();
        var format = new OpenLayers.Format.WMC();

        var newTreeConfig = this.readHeronContext(mapPanel, data);

        // remove existing layers
        var num = map.getNumLayers();
        for (var i = num - 1; i >= 0; i--) {
            if (map.layers[i] != null)
                map.removeLayer(map.layers[i]);
        }
        map = format.read(data, {map: map});

        //console.log (format.context.projection);
        if (map.projection != format.context.projection) {
            // set projection after first loading the new map otherwise it is not effective
            map.setOptions({projection:format.context.projection, displayProjection : format.context.projection});
            // refresh the map with the new layers so the map is in the right projection
            num = map.getNumLayers();
            for (i = num - 1; i >= 0; i--) {
                if (map.layers[i] != null)
                    map.removeLayer(map.layers[i]);
            }
            map = format.read(data, {map: map});

        }
        
        map.zoomToExtent(format.context.bounds);

        //
        //root.attributes.children = Ext.decode(value);
        //                tree.getLoader().load(root);
        var treePanel = Heron.App.topComponent.findByType('hr_layertreepanel')[0];
        if (treePanel != null) {
            var treeRoot = treePanel.root;
            treeRoot.attributes.children = Ext.decode(newTreeConfig);
            //var layerTree = Heron.App.topComponent.findByType('hr_layertreepanel')
            //console.log(treeRoot);
            treePanel.getLoader().load(treeRoot);
        }

        //set active baselayer
        num = format.context.layersContext.length;
        for ( i = num - 1; i >= 0; i--) {
            if ((format.context.layersContext[i].isBaseLayer == true) &&
                (format.context.layersContext[i].visibility == true)){
                var strActiveBaseLayer = format.context.layersContext[i].title;
                var newBaseLayer = map.getLayersByName(strActiveBaseLayer)[0];
                if (newBaseLayer)
                    map.setBaseLayer(newBaseLayer);
            }
        }
    },
    /** private: method[readHeronContext]
     *  Read Heron specific context
     *  :param mapPanel: Panel with the Heron map
     *         data: the Web Map Context
     */
    readHeronContext: function (mapPanel, data) {
        var format = new OpenLayers.Format.XML();

        //console.log (data);
        var doc = format.read(data);

        var elem = doc.getElementsByTagName('treeConfig')[0];
        //console.log( elem);
        // check on this.prefix !!!
        // !!! Todo
        
        var val = format.getChildValue(elem);
        //console.log (val)
        return val;
    },
     /** private: method[formatXml]
     *  Format as readable XML
     *  :param xml: xml text to format with indents
     *  This formatXml differs from Heron.Utils.formatXml:
     *      less returns, smaller padding
     *  If accepted, replace Heron.Utils.formatXml with this one
     */
    formatXml: function (xml) {
        // Thanks to: https://gist.github.com/sente/1083506
        var formatted = '';
        var reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\n$2$3');
        var arrSplit = xml.split('\n');
        var pad = 0;
        for (var intNode = 0; intNode < arrSplit.length; intNode++) {
            var node = arrSplit[intNode];
            var indent = 0;
            if (node.match( /.+<\/\w[^>]*>$/ )) {
                indent = 0;
            } else if (node.match( /^<\/\w/ )) {
                if (pad != 0) {
                    pad -= 1;
                }
            } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
                indent = 1;
            } else {
               indent = 0;
            }

            var padding = '';
            for (var i = 0; i < pad; i++) {
                padding += '  ';
            }

            formatted += padding + node + '\n';
            pad += indent;
        }

        return formatted;
    }
};