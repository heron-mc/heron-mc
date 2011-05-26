Ext.onReady(function() {
    var blocks = Ext.select("div.exampleblock");
    var loc = window.location.href;
    var exbase = "../examples/"
    if (/^http:\/\/(www\.)?heron-mc.org\/examples.html/.test(loc)) {
        exbase = "http://lib.heron-mc.org/heron/" + docversion + "/examples/";
    } else if (/^http:\/\/dev.heron-mc.org\/docs\/examples.html/.test(loc)) {
        exbase = "http://dev.heron-mc.org/trunk/examples/";
    }
    blocks.each(function(el) {
        el.wrap({
            tag: "a", 
            href: el.first().id.replace(
                /^example-(.*)/, 
                exbase + "$1" + "/index.html"
            ),
            cls: "examplelink",
            target: "_blank"
        });
    });
});

