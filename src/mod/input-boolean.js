var $ = require("dom");
var Data = require("data");


module.exports = function( args ) {
    var elem = $.div( 'boolean', [args.text] );
    if( Data.get( args.data ) ) {
        $.addClass( elem, 'yes' );
    }
    $.on( elem, function() {
        if( Data.get( args.data ) ) {
            $.removeClass( elem, 'yes' );
            Data.set( args.data, 0 );
        } else {
            $.addClass( elem, 'yes' );
            Data.set( args.data, 1 );
        }
        Data.save;
    });
    return elem;
};
