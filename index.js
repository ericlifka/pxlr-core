SM.DefineModule('pxlr/core', function () {
    return {
        name: "pxlr-core",
        information: "Backbone utilities and core classes of pxlr"
    };
});

/* provide namespace backwards compatibility for v1 */
SM.DefineModule('models/animation', function (require) {
    return require('pxlr/core/animation');
});
SM.DefineModule('models/cell-grid', function (require) {
    return require('pxlr/core/cell-grid');
});
SM.DefineModule('models/sprite', function (require) {
    return require('pxlr/core/sprite');
});
SM.DefineModule('models/sprite-group', function (require) {
    return require('pxlr/core/sprite-group');
});
