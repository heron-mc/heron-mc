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
    initComponent: function () {
        Heron.data.MapContext.superclass.initComponent.call(this);
    },
    /** method[saveContext]
     *  Save a Web Map Context file
     *  :param mapPanel: Panel with the Heron map
     *         options: config options
     */
    saveContext: function (mapPanel, options) {
        var map = mapPanel.getMap();
        var format = new OpenLayers.Format.WMC();
        var text;
        text = format.write(map);
        this.data = encodeURIComponent(text);
        try {
            // Cleanup previous form if required
            Ext.destroy(Ext.get('hr_downloadForm'));
        }
        catch (e) {
        }
        var formFields = [
            {tag: 'input', type: 'hidden', name: 'data', value: this.data},
            {tag: 'input', type: 'hidden', name: 'filename', value: options.fileName + options.fileExt},
            //{tag: 'input', type: 'hidden', name: 'fileExt', value: options.fileExt},
            {tag: 'input', type: 'hidden', name: 'mime', value: 'text/xml'},
            {tag: 'input', type: 'hidden', name: 'encoding', value: 'url'},
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
        var data;
        try {
            // Cleanup previous form if required
            Ext.destroy(Ext.get('hr_uploadForm'));
        }
        catch (e) {
        }
        var uploadForm = new Ext.form.FormPanel({
            id: 'hr_uploadForm',
            fileUpload: true,
            width: 500,
            autoHeight: true,
            bodyStyle: 'padding: 10px 10px 10px 10px;',
            labelWidth: 50,
            defaults: {
                anchor: '95%',
                allowBlank: false,
                msgTarget: 'side'
            },
            items:[
            {
                xtype: 'textfield',
                id: 'file',
                inputType: 'file'
            }],

            buttons: [{
                text: __('Upload'),
                handler: function(){
                    if(uploadForm.getForm().isValid()){
                        uploadForm.getForm().submit({
                            url: Heron.globals.serviceUrl,
                            params: {
                                action: 'upload',
                                mime: 'text/html',
                                encoding: 'url'
                            },
                            waitMsg: __('Uploading file...'),
                            success: function(form, action){
                                console.log ('Processed file on the server.');
                                data = decodeURIComponent(action.response.responseText);
                                self.loadContext (mapPanel, options, data);
                                uploadWindow.close();
                            },
                            failure: function (form, action){
                                //somehow we allways get no succes althought the response is as expected
                                console.log ('Fail on the server? But can go on.');
                                data = decodeURIComponent(action.response.responseText);
                                self.loadContext (mapPanel, options, data);
                                uploadWindow.close();
                            }
                        });
                    }
                }
            }]
        });

        var uploadWindow = new Ext.Window({
            id: 'hr_uploadWindow',
            title: 'Upload',
            closable:true,
            width: 600,
            height: 150,
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
     /** private: method[loadContext]
     *  Load a Web Map Context in the map
     *  :param mapPanel: Panel with the Heron map
     *         options: config options
     *         data: the Web Map Context
     */
    loadContext: function (mapPanel, options, data) {
        var map = mapPanel.getMap();
        var format = new OpenLayers.Format.WMC();


        if (data){
            //console.log (data);
            // remove existing layers
            var num = map.getNumLayers();
            for (var i = num - 1; i >= 0; i--) {
                map.removeLayer(map.layers[i]);
            }
            map = format.read(data, {map: map});
            //console.log ('map proj: ' + map.projection);
            //console.log ('wmc proj: ' + format.context.projection);
            map.projection = format.context.projection;
            //console.log ('map proj: ' + map.projection);
            map.zoomToExtent(format.context.bounds);
            //console.log(format.context);
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
        }
    }

};