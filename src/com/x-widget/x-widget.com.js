/**********************************************************************
 @example
<x-widget name="tfw.input">
{
  label: "Email",
  validator: "[^@]+@[^@]\\.[^@.]+"
}
</x-widget>

<x-widget name="tfw.input" $label="Email" $validator="[^@]+@[^@]\\.[^@.]+"/>

 **********************************************************************/

exports.tags = ["x-widget"];
exports.priority = 0;

var ID = 0;

/**
 * Compile a node of the HTML tree.
 */
exports.compile = function(root, libs) {
    var name = root.attribs.name;
    if (!name || name.length == 0) {
        libs.fatal("[x-widget] Missing attribute \"name\"!");
    }
    var id = root.attribs.id || (name + ID++);
    var src = (root.attribs.src || "").trim();
    var args = null;
    if (src.length > 0) {
        if (!libs.fileExists(src)) {
            libs.fatal("File not found: \"" + src + "\"!");
        }
        libs.addInclude(src);
        args = libs.readFileContent(src);
    }
    if (!args) {
        args = libs.Tree.text(root).trim();
    }
    if (args.charAt(0) != '{' && args.charAt(0) != '[') {
        try {
            args = JSON.parse(args);
        }
        catch (ex) {
            // This is a string.
            args = JSON.stringify(args);
        }
    }
    if( args == '""' ) {
        // All the attributes that start with a '$' are used as args attributes.
        args = {};
        var key, val;
        for( key in root.attribs ) {
            if( key.charAt(0) == '$' ) {
                val = root.attribs[key];
                args[key.substr( 1 )] = val;
            }
        }
        args = JSON.stringify( args );
    }

    root.children = [];
    root.name = "div";
    delete root.autoclose;
    root.attribs = {
        id: id,
        style: "display:none"
    };

    libs.require(name);
    libs.require("x-widget");
    libs.addInitJS(
        "try{"
        + "require('x-widget')('" + id + "','" + name + "'," + args + ")"
        + "}catch(x){console.error('Unable to initialize " + name + "!', x)}"
    );
};
