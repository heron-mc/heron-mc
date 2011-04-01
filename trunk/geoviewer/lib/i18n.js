/* i18n function */

function __(string) {
	 if (typeof(i18n)!='undefined' && i18n[string]) {
		return i18n[string];
	}
	return string;
}

GeoExt.tree.LayerContainer.prototype.text= __("Layers");
GeoExt.tree.BaseLayerContainer.prototype.text = __("Base Layers");
GeoExt.tree.OverlayLayerContainer.prototype.text = __("Overlays");

