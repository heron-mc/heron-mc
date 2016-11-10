/**
 * Defines the most minimal Heron layout: just a Map with a zoomslider.
 *
 **/
Heron.layout = {
	xtype: 'window',
	title: "Hello Heron",
	closeAction: "hide",
	height: 300,
	width: 400,
	layout: 'fit',

	/** Below are Heron-specific settings for the Heron MapPanel (xtype: 'gx_mappanel') */
	items: [
		{
			xtype: "gx_mappanel",
			layers: [new OpenLayers.Layer.OSM()]
		}
	]
};

Ext.onReady(function() {
    var button = new Ext.Button({
        text: "Run it!",
        cls: "execute",
        handler: function() {
			Heron.App.create();
			Heron.App.show();
        }
    });
	var block = Ext.Element.get(Ext.DomQuery.select("div.execute")[0]);
    var container = Ext.Element.get(Ext.DomHelper.append(block, {tag: "div"}));
    container.setHeight(35, {callback: function() {button.render(container)}});
});