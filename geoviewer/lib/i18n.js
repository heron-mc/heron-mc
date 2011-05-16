/* i18n function */

function __(string) {
	if (typeof(i18n) != 'undefined' && i18n[string]) {
		return i18n[string];
	}
	return string;
}

if (GeoExt.tree.LayerContainer) GeoExt.tree.LayerContainer.prototype.text = __("Layers");
if (GeoExt.tree.BaseLayerContainer) GeoExt.tree.BaseLayerContainer.prototype.text = __("Base Layers");
if (GeoExt.tree.OverlayLayerContainer) GeoExt.tree.OverlayLayerContainer.prototype.text = __("Overlays");

