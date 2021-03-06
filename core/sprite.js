SM.DefineModule('pxlr/core/sprite', function (require) {
    var CellGrid = require('pxlr/core/cell-grid');

    // This variable is for the clone function to have a reference to the constructor
    var Sprite = SM.DefineClass([CellGrid, {
        finished: true,
        constructor: function (pixels, meta) {
            this.meta = meta || {};
            this.width = pixels.length;
            this.height = pixels[ 0 ].length;
            this.offsetAdjustment = { x: 0, y: 0 };

            this.cells = [];
            for (var x = 0; x < this.width; x++) {
                this.cells[ x ] = [];
                for (var y = 0; y < this.height; y++) {
                    this.cells[ x ][ y ] = {
                        x: x,
                        y: y,
                        color: pixels[ x ][ y ]
                    };
                }
            }
        },
        setPermanentOffset: function (offset) {
            offset = offset || { };
            this.offsetAdjustment.x = offset.x || 0;
            this.offsetAdjustment.y = offset.y || 0;

            return this;
        },
        applyColor: function (color) {
            this.iterateCells(function (cell) {
                if (cell.color) {
                    cell.color = color;
                }
            });

            return this;
        },
        update: function (dtime) {
            /*
             sprites ignore updates by default, but accept the event
             so that the api signature of sprites and animations matches
             */
        },
        renderToFrame: function (frame, x, y, index) {
            index = index || 0;
            var offset_x = this.offsetAdjustment.x;
            var offset_y = this.offsetAdjustment.y;
            this.iterateCells(function (cell, _x, _y) {
                if (cell.color) {
                    var frameCell = frame.cellAt(x + _x + offset_x, y + _y + offset_y);
                    if (index >= frameCell.index) {
                        frameCell.color = cell.color;
                        frameCell.index = index;
                    }
                }
            });
        },
        clone: function () {
            var colorGrid = [];
            for (var x = 0; x < this.width; x++) {
                colorGrid[ x ] = [];
                for (var y = 0; y < this.height; y++) {
                    colorGrid[ x ][ y ] = this.cells[ x ][ y ].color;
                }
            }

            var sprite = new Sprite(colorGrid);
            sprite.setPermanentOffset(this.offsetAdjustment);

            return sprite;
        },
        rotateLeft: function () {
            var width = this.width;
            var height = this.height;
            var oldCells = this.cells;
            var newCells = [];
            var x, y;

            for (x = 0; x < height; x++) {
                newCells[ x ] = [];
            }

            for (x = 0; x < width; x++) {
                for (y = 0; y < height; y++) {
                    newCells[ y ][ width - x - 1 ] = {
                        x: y,
                        y: width - x - 1,
                        color: oldCells[ x ][ y ].color
                    };
                }
            }

            this.width = height;
            this.height = width;
            this.cells = newCells;
            return this;
        },
        rotateRight: function () {
            return this
                .rotateLeft()
                .rotateLeft()
                .rotateLeft();
        },
        invertX: function () {
            for (var x = 0; x < this.width / 2; x++) {
                var left = this.cells[ x ];
                var right = this.cells[ this.width - x - 1 ];
                this.cells[ x ] = right;
                this.cells[ this.width - x - 1 ] = left;
            }
            return this;
        },
        invertY: function () {
            for (var x = 0; x < this.width; x++) {
                this.cells[ x ].reverse();
            }
            return this;
        }
    }]);

    return Sprite;
});
