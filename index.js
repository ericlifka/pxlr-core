DefineModule('pxlr/core', function () {
    return {
        name: "pxlr-core",
        information: "Backbone utilities and core classes of pxlr"
    };
});

/* provide namespace backwards compatibility for v1 */
DefineModule('models/cell-grid', function (require) {
    return require('pxlr/core/cell-grid');
});
