Ext.onReady(function() {
    var blocks = Ext.select("div.exampleblock");
    var loc = window.location.href;
    var exbase = "http://local.lib.heron-mc.org:8082/examples/";
    if (/^https:\/\/(www\.)?heron-mc.org\/examples.html/.test(loc)) {
        exbase = "https://lib.heron-mc.org/heron/" + docversion + "/examples/";
    } else if (/^https:\/\/(www2\.)?heron-mc.org\/examples.html/.test(loc)) {
        exbase = "https://lib2.heron-mc.org/heron/" + docversion + "/examples/";
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

