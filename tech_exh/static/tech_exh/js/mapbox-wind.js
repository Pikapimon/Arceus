/*!
 * author: sakitam-fdd <smilefdd@gmail.com> 
 * @sakitam-gis/mapbox-wind v1.1.1-alpha.1
 * build-time: 2021-4-9 18:12
 * LICENSE: MIT
 * (c) 2017-2021 https://github.com/sakitam-fdd/wind-layer#readme
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mapbox-gl')) :
    typeof define === 'function' && define.amd ? define(['exports', 'mapbox-gl'], factory) :
    (global = global || self, factory(global.mapboxWind = {}, global.mapboxgl));
}(this, (function (exports, mapboxgl) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            var arguments$1 = arguments;

            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments$1[i];
                for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) { t[p] = s[p]; } }
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /*!
     * author: sakitam-fdd <smilefdd@gmail.com> 
     * wind-core v1.1.1-alpha.1
     * build-time: 2021-3-30 18:18
     * LICENSE: MIT
     * (c) 2017-2021 https://github.com/sakitam-fdd/wind-layer#readme
     */
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __spreadArrays() {
        var arguments$1 = arguments;

        for (var s = 0, i = 0, il = arguments.length; i < il; i++) { s += arguments$1[i].length; }
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            { for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                { r[k] = a[j]; } }
        return r;
    }

    if (!Array.isArray) {
        // @ts-ignore
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                var arguments$1 = arguments;

                if (target == null) { // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }
                var to = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments$1[index];
                    if (nextSource != null) { // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var symToStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined;
    function baseGetTag(value) {
        if (value === null) {
            return value === undefined ? '[object Undefined]' : '[object Null]';
        }
        if (!(symToStringTag && symToStringTag in Object(value))) {
            return toString.call(value);
        }
        var isOwn = hasOwnProperty.call(value, symToStringTag);
        var tag = value[symToStringTag];
        var unmasked = false;
        try {
            value[symToStringTag] = undefined;
            unmasked = true;
        }
        catch (e) {
        }
        var result = Object.prototype.toString.call(value);
        if (unmasked) {
            if (isOwn) {
                value[symToStringTag] = tag;
            }
            else {
                delete value[symToStringTag];
            }
        }
        return result;
    }
    /**
     * 判断是否为函数
     * @param value
     * @returns {boolean}
     */
    function isFunction(value) {
        if (!isObject(value)) {
            return false;
        }
        var tag = baseGetTag(value);
        return tag === '[object Function]' || tag === '[object AsyncFunction]' ||
            tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
    }
    /**
     * 判断是否为对象
     * @param value
     * @returns {boolean}
     */
    function isObject(value) {
        var type = typeof value;
        return value !== null && (type === 'object' || type === 'function');
    }
    /**
     * 判断是否为合法字符串
     * @param value
     * @returns {boolean}
     */
    function isString(value) {
        if (value == null) {
            return false;
        }
        return typeof value === 'string' || (value.constructor !== null && value.constructor === String);
    }
    /**
     * 判断是否为数字
     * @param value
     * @returns {boolean}
     */
    function isNumber(value) {
        return Object.prototype.toString.call(value) === '[object Number]' && !isNaN(value);
    }
    /**
     * check is array
     * @param arr
     */
    function isArray(arr) {
        return Array.isArray(arr);
    }
    /**
     * assign object
     * @param target
     * @param sources
     */
    function assign(target) {
        var arguments$1 = arguments;

        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments$1[_i];
        }
        return Object.assign.apply(Object, __spreadArrays([target], sources));
    }
    /**
     * Get floored division
     * @param a
     * @param n
     * @returns {Number} returns remainder of floored division,
     * i.e., floor(a / n). Useful for consistent modulo of negative numbers.
     * See http://en.wikipedia.org/wiki/Modulo_operation.
     */
    function floorMod(a, n) {
        return a - n * Math.floor(a / n);
    }
    /**
     * 检查值是否合法
     * @param val
     * @returns {boolean}
     */
    function isValide(val) {
        return val !== undefined && val !== null && !isNaN(val);
    }
    /**
     * format gfs json to vector
     * @param data
     */
    function formatData(data) {
        var uComp;
        var vComp;
        {
            console.time('format-data');
        }
        data.forEach(function (record) {
            switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
                case "1,2":
                case "2,2":
                    uComp = record;
                    break;
                case "1,3":
                case "2,3":
                    vComp = record;
                    break;
            }
        });
        // @ts-ignore
        if (!vComp || !uComp)
            { return; }
        var header = uComp.header;
        var vectorField = new Field({
            xmin: header.lo1,
            ymin: header.la1,
            xmax: header.lo2,
            ymax: header.la2,
            deltaX: header.dx,
            deltaY: header.dy,
            cols: header.nx,
            rows: header.ny,
            us: uComp.data,
            vs: vComp.data
        });
        {
            console.timeEnd('format-data');
        }
        return vectorField;
    }

    // from: https://sourcegraph.com/github.com/IHCantabria/Leaflet.CanvasLayer.Field/-/blob/src/Vector.js?utm_source=share
    var Vector = /** @class */ (function () {
        function Vector(u, v) {
            this.u = u;
            this.v = v;
            this.m = this.magnitude();
        }
        /**
         * the vector value
         * 向量值（流体强度）
         * @returns {Number}
         */
        Vector.prototype.magnitude = function () {
            // Math.pow(u, 2)
            // Math.pow(v, 2)
            return Math.sqrt(this.u * this.u + this.v * this.v);
        };
        /**
         * Angle in degrees (0 to 360º) --> Towards
         * 流体方向
         * N is 0º and E is 90º
         * @returns {Number}
         */
        Vector.prototype.directionTo = function () {
            var verticalAngle = Math.atan2(this.u, this.v);
            var inDegrees = verticalAngle * (180.0 / Math.PI);
            if (inDegrees < 0) {
                inDegrees += 360.0;
            }
            return inDegrees;
        };
        /**
         * Angle in degrees (0 to 360º) From x-->
         * N is 0º and E is 90º
         * @returns {Number}
         */
        Vector.prototype.directionFrom = function () {
            var a = this.directionTo();
            return (a + 180.0) % 360.0;
        };
        return Vector;
    }());

    var Field = /** @class */ (function () {
        function Field(params) {
            this.grid = [];
            this.xmin = params.xmin;
            this.xmax = params.xmax;
            this.ymin = params.ymin;
            this.ymax = params.ymax;
            this.cols = params.cols; // 列数
            this.rows = params.rows; // 行数
            this.us = params.us; //
            this.vs = params.vs;
            this.deltaX = params.deltaX; // x 方向增量
            this.deltaY = params.deltaY; // y方向增量
            if (this.deltaY < 0 && this.ymin < this.ymax) {
                console.warn('[wind-core]: The data is flipY');
            }
            else {
                this.ymin = Math.min(params.ymax, params.ymin);
                this.ymax = Math.max(params.ymax, params.ymin);
            }
            this.isFields = true;
            var cols = Math.ceil((this.xmax - this.xmin) / params.deltaX); // 列
            var rows = Math.ceil((this.ymax - this.ymin) / params.deltaY); // 行
            if (cols !== this.cols || rows !== this.rows) {
                console.warn('[wind-core]: The data grid not equal');
            }
            // Math.floor(ni * Δλ) >= 360;
            // lon lat 经度 纬度
            this.isContinuous = Math.floor(this.cols * params.deltaX) >= 360;
            this.wrappedX = 'wrappedX' in params ? params.wrappedX : this.xmax > 180; // [0, 360] --> [-180, 180];
            this.grid = this.buildGrid();
            this.range = this.calculateRange();
        }
        // from https://github.com/sakitam-fdd/wind-layer/blob/95368f9433/src/windy/windy.js#L110
        Field.prototype.buildGrid = function () {
            var grid = [];
            var p = 0;
            var _a = this, rows = _a.rows, cols = _a.cols, us = _a.us, vs = _a.vs;
            for (var j = 0; j < rows; j++) {
                var row = [];
                for (var i = 0; i < cols; i++, p++) {
                    var u = us[p];
                    var v = vs[p];
                    var valid = this.isValid(u) && this.isValid(v);
                    row[i] = valid ? new Vector(u, v) : null;
                }
                if (this.isContinuous) {
                    row.push(row[0]);
                }
                grid[j] = row;
            }
            return grid;
        };
        Field.prototype.release = function () {
            this.grid = [];
        };
        /**
         * grib data extent
         * 格点数据范围
         */
        Field.prototype.extent = function () {
            return [
                this.xmin,
                this.ymin,
                this.xmax,
                this.ymax ];
        };
        /**
         * Bilinear interpolation for Vector
         * 针对向量进行双线性插值
         * https://en.wikipedia.org/wiki/Bilinear_interpolation
         * @param   {Number} x
         * @param   {Number} y
         * @param   {Number[]} g00
         * @param   {Number[]} g10
         * @param   {Number[]} g01
         * @param   {Number[]} g11
         * @returns {Vector}
         */
        Field.prototype.bilinearInterpolateVector = function (x, y, g00, g10, g01, g11) {
            var rx = 1 - x;
            var ry = 1 - y;
            var a = rx * ry;
            var b = x * ry;
            var c = rx * y;
            var d = x * y;
            var u = g00.u * a + g10.u * b + g01.u * c + g11.u * d;
            var v = g00.v * a + g10.v * b + g01.v * c + g11.v * d;
            return new Vector(u, v);
        };
        /**
         * calculate vector value range
         */
        Field.prototype.calculateRange = function () {
            if (!this.grid || !this.grid[0])
                { return; }
            var rows = this.grid.length;
            var cols = this.grid[0].length;
            // const vectors = [];
            var min;
            var max;
            // @from: https://stackoverflow.com/questions/13544476/how-to-find-max-and-min-in-array-using-minimum-comparisons
            for (var j = 0; j < rows; j++) {
                for (var i = 0; i < cols; i++) {
                    var vec = this.grid[j][i];
                    if (vec !== null) {
                        var val = vec.m || vec.magnitude();
                        // vectors.push();
                        if (min === undefined) {
                            min = val;
                        }
                        else if (max === undefined) {
                            max = val;
                            // update min max
                            // 1. Pick 2 elements(a, b), compare them. (say a > b)
                            min = Math.min(min, max);
                            max = Math.max(min, max);
                        }
                        else {
                            // 2. Update min by comparing (min, b)
                            // 3. Update max by comparing (max, a)
                            min = Math.min(val, min);
                            max = Math.max(val, max);
                        }
                    }
                }
            }
            return [min, max];
        };
        /**
         * 检查 uv是否合法
         * @param x
         * @private
         */
        Field.prototype.isValid = function (x) {
            return x !== null && x !== undefined;
        };
        Field.prototype.getWrappedLongitudes = function () {
            var xmin = this.xmin;
            var xmax = this.xmax;
            if (this.wrappedX) {
                if (this.isContinuous) {
                    xmin = -180;
                    xmax = 180;
                }
                else {
                    // not sure about this (just one particular case, but others...?)
                    xmax = this.xmax - 360;
                    xmin = this.xmin - 360;
                    /* eslint-disable no-console */
                    // console.warn(`are these xmin: ${xmin} & xmax: ${xmax} OK?`);
                    // TODO: Better throw an exception on no-controlled situations.
                    /* eslint-enable no-console */
                }
            }
            return [xmin, xmax];
        };
        Field.prototype.contains = function (lon, lat) {
            var _a = this.getWrappedLongitudes(), xmin = _a[0], xmax = _a[1];
            var longitudeIn = lon >= xmin && lon <= xmax;
            var latitudeIn;
            if (this.deltaY >= 0) {
                latitudeIn = lat >= this.ymin && lat <= this.ymax;
            }
            else {
                latitudeIn = lat >= this.ymax && lat <= this.ymin;
            }
            return longitudeIn && latitudeIn;
        };
        /**
         * 获取经纬度所在的位置索引
         * @param lon
         * @param lat
         */
        Field.prototype.getDecimalIndexes = function (lon, lat) {
            var i = floorMod(lon - this.xmin, 360) / this.deltaX; // calculate longitude index in wrapped range [0, 360)
            var j = (this.ymax - lat) / this.deltaY; // calculate latitude index in direction +90 to -90
            return [i, j];
        };
        /**
         * Nearest value at lon-lat coordinates
         * 线性插值
         * @param lon
         * @param lat
         */
        Field.prototype.valueAt = function (lon, lat) {
            if (!this.contains(lon, lat))
                { return null; }
            var indexes = this.getDecimalIndexes(lon, lat);
            var ii = Math.floor(indexes[0]);
            var jj = Math.floor(indexes[1]);
            var ci = this.clampColumnIndex(ii);
            var cj = this.clampRowIndex(jj);
            return this.valueAtIndexes(ci, cj);
        };
        /**
         * Get interpolated grid value lon-lat coordinates
         * 双线性插值
         * @param lon
         * @param lat
         */
        Field.prototype.interpolatedValueAt = function (lon, lat) {
            if (!this.contains(lon, lat))
                { return null; }
            var _a = this.getDecimalIndexes(lon, lat), i = _a[0], j = _a[1];
            return this.interpolatePoint(i, j);
        };
        Field.prototype.hasValueAt = function (lon, lat) {
            var value = this.valueAt(lon, lat);
            return value !== null;
        };
        /**
         * 基于向量的双线性插值
         * @param i
         * @param j
         */
        Field.prototype.interpolatePoint = function (i, j) {
            //         1      2           After converting λ and φ to fractional grid indexes i and j, we find the
            //        fi  i   ci          four points 'G' that enclose point (i, j). These points are at the four
            //         | =1.4 |           corners specified by the floor and ceiling of i and j. For example, given
            //      ---G--|---G--- fj 8   i = 1.4 and j = 8.3, the four surrounding grid points are (1, 8), (2, 8),
            //    j ___|_ .   |           (1, 9) and (2, 9).
            //  =8.3   |      |
            //      ---G------G--- cj 9   Note that for wrapped grids, the first column is duplicated as the last
            //         |      |           column, so the index ci can be used without taking a modulo.
            var indexes = this.getFourSurroundingIndexes(i, j);
            var fi = indexes[0], ci = indexes[1], fj = indexes[2], cj = indexes[3];
            var values = this.getFourSurroundingValues(fi, ci, fj, cj);
            if (values) {
                var g00 = values[0], g10 = values[1], g01 = values[2], g11 = values[3];
                // @ts-ignore
                return this.bilinearInterpolateVector(i - fi, j - fj, g00, g10, g01, g11);
            }
            return null;
        };
        /**
         * Check the column index is inside the field,
         * adjusting to min or max when needed
         * @private
         * @param   {Number} ii - index
         * @returns {Number} i - inside the allowed indexes
         */
        Field.prototype.clampColumnIndex = function (ii) {
            var i = ii;
            if (ii < 0) {
                i = 0;
            }
            var maxCol = this.cols - 1;
            if (ii > maxCol) {
                i = maxCol;
            }
            return i;
        };
        /**
         * Check the row index is inside the field,
         * adjusting to min or max when needed
         * @private
         * @param   {Number} jj index
         * @returns {Number} j - inside the allowed indexes
         */
        Field.prototype.clampRowIndex = function (jj) {
            var j = jj;
            if (jj < 0) {
                j = 0;
            }
            var maxRow = this.rows - 1;
            if (jj > maxRow) {
                j = maxRow;
            }
            return j;
        };
        /**
         * from: https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/blob/master/src/Field.js#L252
         * 计算索引位置周围的数据
         * @private
         * @param   {Number} i - decimal index
         * @param   {Number} j - decimal index
         * @returns {Array} [fi, ci, fj, cj]
         */
        Field.prototype.getFourSurroundingIndexes = function (i, j) {
            var fi = Math.floor(i); // 左
            var ci = fi + 1; // 右
            // duplicate colum to simplify interpolation logic (wrapped value)
            if (this.isContinuous && ci >= this.cols) {
                ci = 0;
            }
            ci = this.clampColumnIndex(ci);
            var fj = this.clampRowIndex(Math.floor(j)); // 上 纬度方向索引（取整）
            var cj = this.clampRowIndex(fj + 1); // 下
            return [fi, ci, fj, cj];
        };
        /**
         * from https://github.com/IHCantabria/Leaflet.CanvasLayer.Field/blob/master/src/Field.js#L277
         * Get four surrounding values or null if not available,
         * from 4 integer indexes
         * @private
         * @param   {Number} fi
         * @param   {Number} ci
         * @param   {Number} fj
         * @param   {Number} cj
         * @returns {Array}
         */
        Field.prototype.getFourSurroundingValues = function (fi, ci, fj, cj) {
            var row;
            if ((row = this.grid[fj])) {
                var g00 = row[fi]; // << left
                var g10 = row[ci]; // right >>
                if (this.isValid(g00) &&
                    this.isValid(g10) &&
                    (row = this.grid[cj])) {
                    // lower row vv
                    var g01 = row[fi]; // << left
                    var g11 = row[ci]; // right >>
                    if (this.isValid(g01) && this.isValid(g11)) {
                        return [g00, g10, g01, g11]; // 4 values found!
                    }
                }
            }
            return null;
        };
        /**
         * Value for grid indexes
         * @param   {Number} i - column index (integer)
         * @param   {Number} j - row index (integer)
         * @returns {Vector|Number}
         */
        Field.prototype.valueAtIndexes = function (i, j) {
            return this.grid[j][i]; // <-- j,i !!
        };
        /**
         * Lon-Lat for grid indexes
         * @param   {Number} i - column index (integer)
         * @param   {Number} j - row index (integer)
         * @returns {Number[]} [lon, lat]
         */
        Field.prototype.lonLatAtIndexes = function (i, j) {
            var lon = this.longitudeAtX(i);
            var lat = this.latitudeAtY(j);
            return [lon, lat];
        };
        /**
         * Longitude for grid-index
         * @param   {Number} i - column index (integer)
         * @returns {Number} longitude at the center of the cell
         */
        Field.prototype.longitudeAtX = function (i) {
            var halfXPixel = this.deltaX / 2.0;
            var lon = this.xmin + halfXPixel + i * this.deltaX;
            if (this.wrappedX) {
                lon = lon > 180 ? lon - 360 : lon;
            }
            return lon;
        };
        /**
         * Latitude for grid-index
         * @param   {Number} j - row index (integer)
         * @returns {Number} latitude at the center of the cell
         */
        Field.prototype.latitudeAtY = function (j) {
            var halfYPixel = this.deltaY / 2.0;
            return this.ymax - halfYPixel - j * this.deltaY;
        };
        /**
         * 生成粒子位置
         * @param o
         * @param width
         * @param height
         * @param unproject
         */
        Field.prototype.randomize = function (o, width, height, unproject) {
            if (o === void 0) { o = {}; }
            var i = (Math.random() * (width || this.cols)) | 0;
            var j = (Math.random() * (height || this.rows)) | 0;
            var coords = unproject([i, j]);
            if (coords !== null) {
                o.x = coords[0];
                o.y = coords[1];
            }
            else {
                o.x = this.longitudeAtX(i);
                o.y = this.latitudeAtY(j);
            }
            return o;
        };
        /**
         * check is custom field
         */
        Field.prototype.checkFields = function () {
            return this.isFields;
        };
        Field.prototype.startBatchInterpolate = function (width, height, unproject) { };
        return Field;
    }());

    var defaultOptions = {
        globalAlpha: 0.9,
        lineWidth: 1,
        colorScale: '#fff',
        velocityScale: 1 / 25,
        // particleAge: 90, // 粒子在重新生成之前绘制的最大帧数
        maxAge: 90,
        // particleMultiplier: 1 / 300, // TODO: PATHS = Math.round(width * height * particleMultiplier);
        paths: 800,
        frameRate: 20,
        useCoordsDraw: true,
        gpet: true
    };
    function indexFor(m, min, max, colorScale) {
        return Math.max(0, Math.min((colorScale.length - 1), Math.round((m - min) / (max - min) * (colorScale.length - 1))));
    }
    var BaseLayer = /** @class */ (function () {
        function BaseLayer(ctx, options, field) {
            this.particles = [];
            this.generated = false;
            this.ctx = ctx;
            if (!this.ctx) {
                throw new Error('ctx error');
            }
            this.animate = this.animate.bind(this);
            this.setOptions(options);
            if (field) {
                this.updateData(field);
            }
        }
        BaseLayer.prototype.setOptions = function (options) {
            this.options = Object.assign({}, defaultOptions, options);
            var _a = this.ctx.canvas, width = _a.width, height = _a.height;
            if (('particleAge' in options) && !('maxAge' in options) && isNumber(this.options.particleAge)) {
                // @ts-ignore
                this.options.maxAge = this.options.particleAge;
            }
            if (('particleMultiplier' in options) && !('paths' in options) && isNumber(this.options.particleMultiplier)) {
                // @ts-ignore
                this.options.paths = Math.round(width * height * this.options.particleMultiplier);
            }
            this.prerender();
        };
        BaseLayer.prototype.getOptions = function () {
            return this.options;
        };
        BaseLayer.prototype.updateData = function (field) {
            this.field = field;
            if (!this.generated)
                { return; }
            this.particles = this.prepareParticlePaths();
        };
        BaseLayer.prototype.moveParticles = function () {
            var _a = this.ctx.canvas, width = _a.width, height = _a.height;
            var particles = this.particles;
            // 清空组
            var maxAge = this.options.maxAge;
            var optVelocityScale = isFunction(this.options.velocityScale)
                // @ts-ignore
                ? this.options.velocityScale()
                : this.options.velocityScale;
            var velocityScale = optVelocityScale;
            var i = 0;
            var len = particles.length;
            for (; i < len; i++) {
                var particle = particles[i];
                if (particle.age > maxAge) {
                    particle.age = 0;
                    // restart, on a random x,y
                    this.field.randomize(particle, width, height, this.unproject);
                }
                var x = particle.x;
                var y = particle.y;
                var vector = this.field.interpolatedValueAt(x, y);
                if (vector === null) {
                    particle.age = maxAge;
                }
                else {
                    var xt = x + vector.u * velocityScale;
                    var yt = y + vector.v * velocityScale;
                    if (this.field.hasValueAt(xt, yt)) {
                        // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
                        particle.xt = xt;
                        particle.yt = yt;
                        particle.m = vector.m;
                    }
                    else {
                        // Particle isn't visible, but it still moves through the field.
                        particle.x = xt;
                        particle.y = yt;
                        particle.age = maxAge;
                    }
                }
                particle.age++;
            }
        };
        BaseLayer.prototype.fadeIn = function () {
            var prev = this.ctx.globalCompositeOperation; // lighter
            this.ctx.globalCompositeOperation = 'destination-in';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.globalCompositeOperation = prev;
        };
        BaseLayer.prototype.drawParticles = function () {
            var _a;
            var particles = this.particles;
            this.fadeIn();
            this.ctx.globalAlpha = this.options.globalAlpha;
            this.ctx.fillStyle = "rgba(0, 0, 0, " + this.options.globalAlpha + ")";
            this.ctx.lineWidth = (isNumber(this.options.lineWidth) ? this.options.lineWidth : 1);
            this.ctx.strokeStyle = (isString(this.options.colorScale) ? this.options.colorScale : '#fff');
            var i = 0;
            var len = particles.length;
            if (this.field && len > 0) {
                var min = void 0;
                var max = void 0;
                // 如果配置了风速范围
                if (isValide(this.options.minVelocity) && isValide(this.options.maxVelocity)) {
                    min = this.options.minVelocity;
                    max = this.options.maxVelocity;
                }
                else { // 未配置风速范围取格点数据中的最大风速和最小风速
                    _a = this.field.range, min = _a[0], max = _a[1];
                }
                for (; i < len; i++) {
                    this[this.options.useCoordsDraw ? 'drawCoordsParticle' : 'drawPixelParticle'](particles[i], min, max);
                }
            }
        };
        /**
         * 用于绘制像素粒子
         * @param particle
         * @param min
         * @param max
         */
        BaseLayer.prototype.drawPixelParticle = function (particle, min, max) {
            // TODO 需要判断粒子是否超出视野
            // this.ctx.strokeStyle = color;
            var pointPrev = [particle.x, particle.y];
            // when xt isn't exit
            var pointNext = [particle.xt, particle.yt];
            if (pointNext && pointPrev && isValide(pointNext[0]) &&
                isValide(pointNext[1]) && isValide(pointPrev[0]) &&
                isValide(pointPrev[1])
                && particle.age <= this.options.maxAge) {
                this.ctx.beginPath();
                this.ctx.moveTo(pointPrev[0], pointPrev[1]);
                this.ctx.lineTo(pointNext[0], pointNext[1]);
                if (isFunction(this.options.colorScale)) {
                    // @ts-ignore
                    this.ctx.strokeStyle = this.options.colorScale(particle.m);
                }
                else if (Array.isArray(this.options.colorScale)) {
                    var colorIdx = indexFor(particle.m, min, max, this.options.colorScale);
                    this.ctx.strokeStyle = this.options.colorScale[colorIdx];
                }
                if (isFunction(this.options.lineWidth)) {
                    // @ts-ignore
                    this.ctx.lineWidth = this.options.lineWidth(particle.m);
                }
                particle.x = particle.xt;
                particle.y = particle.yt;
                this.ctx.stroke();
            }
        };
        /**
         * 用于绘制坐标粒子
         * @param particle
         * @param min
         * @param max
         */
        BaseLayer.prototype.drawCoordsParticle = function (particle, min, max) {
            // TODO 需要判断粒子是否超出视野
            // this.ctx.strokeStyle = color;
            var source = [particle.x, particle.y];
            // when xt isn't exit
            var target = [particle.xt, particle.yt];
            if (target && source && isValide(target[0]) &&
                isValide(target[1]) && isValide(source[0]) &&
                isValide(source[1]) &&
                this.intersectsCoordinate(target)
                && particle.age <= this.options.maxAge) {
                var pointPrev = this.project(source);
                var pointNext = this.project(target);
                if (pointPrev && pointNext) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(pointPrev[0], pointPrev[1]);
                    this.ctx.lineTo(pointNext[0], pointNext[1]);
                    particle.x = particle.xt;
                    particle.y = particle.yt;
                    if (isFunction(this.options.colorScale)) {
                        // @ts-ignore
                        this.ctx.strokeStyle = this.options.colorScale(particle.m);
                    }
                    else if (Array.isArray(this.options.colorScale)) {
                        var colorIdx = indexFor(particle.m, min, max, this.options.colorScale);
                        this.ctx.strokeStyle = this.options.colorScale[colorIdx];
                    }
                    if (isFunction(this.options.lineWidth)) {
                        // @ts-ignore
                        this.ctx.lineWidth = this.options.lineWidth(particle.m);
                    }
                    this.ctx.stroke();
                }
            }
        };
        BaseLayer.prototype.prepareParticlePaths = function () {
            var _a = this.ctx.canvas, width = _a.width, height = _a.height;
            var particleCount = typeof this.options.paths === 'function' ? this.options.paths(this) : this.options.paths;
            var particles = [];
            if (!this.field)
                { return []; }
            if ('startBatchInterpolate' in this.field) {
                this.field.startBatchInterpolate(width, height, this.unproject);
            }
            var i = 0;
            for (; i < particleCount; i++) {
                particles.push(this.field.randomize({
                    age: this.randomize()
                }, width, height, this.unproject));
            }
            return particles;
        };
        BaseLayer.prototype.randomize = function () {
            return Math.floor(Math.random() * this.options.maxAge); // 例如最大生成90帧插值粒子路径
        };
        // @ts-ignore
        BaseLayer.prototype.project = function () {
            var arguments$1 = arguments;

            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments$1[_i];
            }
            throw new Error('project must be overriden');
        };
        // @ts-ignore
        BaseLayer.prototype.unproject = function () {
            var arguments$1 = arguments;

            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments$1[_i];
            }
            throw new Error('unproject must be overriden');
        };
        BaseLayer.prototype.intersectsCoordinate = function (coordinates) {
            throw new Error('must be overriden');
        };
        BaseLayer.prototype.clearCanvas = function () {
            this.stop();
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.forceStop = false;
        };
        BaseLayer.prototype.start = function () {
            this.starting = true;
            this.forceStop = false;
            this._then = Date.now();
            this.animate();
        };
        BaseLayer.prototype.stop = function () {
            cancelAnimationFrame(this.animationLoop);
            this.starting = false;
            this.forceStop = true;
        };
        BaseLayer.prototype.animate = function () {
            if (this.animationLoop)
                { cancelAnimationFrame(this.animationLoop); }
            this.animationLoop = requestAnimationFrame(this.animate);
            var now = Date.now();
            var delta = now - this._then;
            if (delta > this.options.frameRate) {
                this._then = now - (delta % this.options.frameRate);
                this.render();
            }
        };
        /**
         * 渲染前处理
         */
        BaseLayer.prototype.prerender = function () {
            this.generated = false;
            if (!this.field)
                { return; }
            this.particles = this.prepareParticlePaths();
            this.generated = true;
            if (!this.starting && !this.forceStop) {
                this.starting = true;
                this._then = Date.now();
                this.animate();
            }
        };
        /**
         * 开始渲染
         */
        BaseLayer.prototype.render = function () {
            this.moveParticles();
            this.drawParticles();
            this.postrender();
        };
        /**
         * each frame render end
         */
        BaseLayer.prototype.postrender = function () { };
        BaseLayer.Field = Field;
        return BaseLayer;
    }());

    /**
     * @desc mapbox dom 图层
     * @tip: 为什么实现这个图层，本身mapbox-gl支持 canvas source，但是经过测试添加此图层性能会急剧下降
     */
    /**
     * 移除 dom
     * @param node
     * @returns {removeDomNode}
     */
    function removeDomNode(node) {
        if (!node) {
            return null;
        }
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    }
    var Overlay = /** @class */ (function () {
        function Overlay(id, options) {
            if (options === void 0) { options = {}; }
            if (!id) {
                throw Error('layer id must be specified');
            }
            this.id = id;
            this.options = options;
            this.canvas = null;
            this.canvas2 = null;
            this.devicePixelRatio = this.options.devicePixelRatio ||
                // @ts-ignore
                (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI));
            this.render = this.render.bind(this);
            this.type = 'custom';
            this.renderingMode = '2d';
        }
        Overlay.prototype.onAdd = function (map) {
            this.setMap(map);
            this.canvas = this.initialize();
            if (this.options.doubleBuffer) {
                this.canvas2 = this.initialize();
            }
        };
        Overlay.prototype.resizeCanvas = function (canvas) {
            var mapboxCanvas = this.map.getCanvas();
            // @ts-ignore
            var _a = this.map.transform, width = _a.width, height = _a.height;
            var pixel = this.devicePixelRatio;
            canvas.width = width * pixel;
            canvas.height = height * pixel;
            canvas.style.width = mapboxCanvas.style.width;
            canvas.style.height = mapboxCanvas.style.height;
        };
        Overlay.prototype.initialize = function () {
            var canvasContainer = this.map.getCanvasContainer();
            var mapboxCanvas = this.map.getCanvas();
            var canvasOverlay = document.createElement('canvas');
            // @ts-ignore
            var _a = this.map.transform, width = _a.width, height = _a.height;
            var pixel = this.devicePixelRatio;
            canvasOverlay.width = width * pixel;
            canvasOverlay.height = height * pixel;
            canvasOverlay.style.position = 'absolute';
            canvasOverlay.className = 'mapbox-overlay-canvas';
            canvasOverlay.style.width = mapboxCanvas.style.width;
            canvasOverlay.style.height = mapboxCanvas.style.height;
            canvasContainer.appendChild(canvasOverlay);
            return canvasOverlay;
        };
        Overlay.prototype.render = function () { };
        Overlay.prototype.project = function (coordinates) {
            if (this.map !== undefined) {
                var lnglat = this.map.project(new mapboxgl.LngLat(coordinates[0], coordinates[1]));
                var x = lnglat.x;
                var y = lnglat.y;
                return [
                    x * this.devicePixelRatio,
                    y * this.devicePixelRatio ];
            }
            return coordinates;
        };
        Overlay.prototype.unproject = function (pixel) {
            if (this.map !== undefined) {
                var lnglat = this.map.unproject(new mapboxgl.Point(pixel[0], pixel[1]));
                return [lnglat.lng, lnglat.lat];
            }
            return pixel;
        };
        Overlay.prototype.intersectsCoordinate = function (coordinate) {
            var _a, _b;
            var bounds = this.map.getBounds();
            // @ts-ignore
            var latRange = (_b = (_a = this.map) === null || _a === void 0 ? void 0 : _a.transform) === null || _b === void 0 ? void 0 : _b.latRange;
            if (latRange) {
                if (coordinate[1] > latRange[1] || coordinate[1] < latRange[0])
                    { return false; }
            }
            return bounds.contains(new mapboxgl.LngLat(coordinate[0], coordinate[1]));
            // return true;
        };
        Overlay.prototype.clear = function () {
            if (this.canvas) {
                var ctx = this.canvas.getContext('2d');
                ctx && ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            if (this.canvas2) {
                var ctx = this.canvas2.getContext('2d');
                ctx && ctx.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
            }
        };
        Overlay.prototype.setMap = function (map) {
            this.map = map;
            return this;
        };
        Overlay.prototype.getMap = function () {
            return this.map;
        };
        Overlay.prototype.addTo = function (map) {
            this.onAdd(map);
        };
        Overlay.prototype.remove = function () {
            if (this.canvas) {
                removeDomNode(this.canvas);
                this.canvas = null;
            }
            if (this.canvas2) {
                removeDomNode(this.canvas2);
                this.canvas2 = null;
            }
        };
        return Overlay;
    }());
    //# sourceMappingURL=Overlay.js.map

    /*!
     * author: sakitam-fdd <smilefdd@gmail.com> 
     * wind-gl-core v1.1.1-alpha.1
     * build-time: 2021-3-30 18:18
     * LICENSE: MIT
     * (c) 2017-2021 https://github.com/sakitam-fdd/wind-layer#readme
     */
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics$1 = function(d, b) {
        extendStatics$1 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (b.hasOwnProperty(p)) { d[p] = b[p]; } } };
        return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign$1 = function() {
        __assign$1 = Object.assign || function __assign(t) {
            var arguments$1 = arguments;

            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments$1[i];
                for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p)) { t[p] = s[p]; } }
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };

    var WorkerClass = null;

    try {
        var WorkerThreads =
            typeof module !== 'undefined' && typeof module.require === 'function' && module.require('worker_threads') ||
            typeof __non_webpack_require__ === 'function' && __non_webpack_require__('worker_threads') ||
            typeof require === 'function' && require('worker_threads');
        WorkerClass = WorkerThreads.Worker;
    } catch(e) {} // eslint-disable-line

    function decodeBase64(base64, enableUnicode) {
        return Buffer.from(base64, 'base64').toString(enableUnicode ? 'utf16' : 'utf8');
    }

    function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
        var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
        var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
        var source = decodeBase64(base64, enableUnicode);
        var start = source.indexOf('\n', 10) + 1;
        var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
        return function WorkerFactory(options) {
            return new WorkerClass(body, Object.assign({}, options, { eval: true }));
        };
    }

    function decodeBase64$1(base64, enableUnicode) {
        var binaryString = atob(base64);
        if (enableUnicode) {
            var binaryView = new Uint8Array(binaryString.length);
            for (var i = 0, n = binaryString.length; i < n; ++i) {
                binaryView[i] = binaryString.charCodeAt(i);
            }
            return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
        }
        return binaryString;
    }

    function createURL(base64, sourcemapArg, enableUnicodeArg) {
        var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
        var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
        var source = decodeBase64$1(base64, enableUnicode);
        var start = source.indexOf('\n', 10) + 1;
        var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
        var blob = new Blob([body], { type: 'application/javascript' });
        return URL.createObjectURL(blob);
    }

    function createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg) {
        var url;
        return function WorkerFactory(options) {
            url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
            return new Worker(url, options);
        };
    }

    var kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

    function isNodeJS() {
        return kIsNodeJS;
    }

    function createBase64WorkerFactory$2(base64, sourcemapArg, enableUnicodeArg) {
        if (isNodeJS()) {
            return createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg);
        }
        return createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg);
    }

    var WorkerFactory = createBase64WorkerFactory$2('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwovKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioNCkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLg0KTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlICJMaWNlbnNlIik7IHlvdSBtYXkgbm90IHVzZQ0KdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUNCkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wDQoNClRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkNCktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRUQNCldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsDQpNRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULg0KDQpTZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMNCmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS4NCioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovDQoNCmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHsNCiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsNCiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfQ0KICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9DQogICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTsNCiAgICB9KTsNCn0NCg0KZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkgew0KICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgeyB0aHJvdyB0WzFdOyB9IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnOw0KICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCAidGhyb3ciOiB2ZXJiKDEpLCAicmV0dXJuIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSAiZnVuY3Rpb24iICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnOw0KICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfQ0KICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHsNCiAgICAgICAgaWYgKGYpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcigiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLiIpOyB9DQogICAgICAgIHdoaWxlIChfKSB7IHRyeSB7DQogICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5WyJyZXR1cm4iXSA6IG9wWzBdID8geVsidGhyb3ciXSB8fCAoKHQgPSB5WyJyZXR1cm4iXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgeyByZXR1cm4gdDsgfQ0KICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSB7IG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07IH0NCiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHsNCiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhazsNCiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9Ow0KICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTsNCiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICAgICAgZGVmYXVsdDoNCiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfQ0KICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9DQogICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSB7IF8ub3BzLnBvcCgpOyB9DQogICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTsNCiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfSB9DQogICAgICAgIGlmIChvcFswXSAmIDUpIHsgdGhyb3cgb3BbMV07IH0gcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTsNCiAgICB9DQp9CgpmdW5jdGlvbiBjYWxjTWluTWF4KGFycmF5KSB7CiAgICB2YXIgbWluID0gSW5maW5pdHk7CiAgICB2YXIgbWF4ID0gSW5maW5pdHk7CiAgICAvLyBAZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTM1NDQ0NzYvaG93LXRvLWZpbmQtbWF4LWFuZC1taW4taW4tYXJyYXktdXNpbmctbWluaW11bS1jb21wYXJpc29ucwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykgewogICAgICAgIHZhciB2YWwgPSBhcnJheVtpXTsKICAgICAgICBpZiAobWluID09PSBJbmZpbml0eSkgewogICAgICAgICAgICBtaW4gPSB2YWw7CiAgICAgICAgfQogICAgICAgIGVsc2UgaWYgKG1heCA9PT0gSW5maW5pdHkpIHsKICAgICAgICAgICAgbWF4ID0gdmFsOwogICAgICAgICAgICAvLyB1cGRhdGUgbWluIG1heAogICAgICAgICAgICAvLyAxLiBQaWNrIDIgZWxlbWVudHMoYSwgYiksIGNvbXBhcmUgdGhlbS4gKHNheSBhID4gYikKICAgICAgICAgICAgbWluID0gTWF0aC5taW4obWluLCBtYXgpOwogICAgICAgICAgICBtYXggPSBNYXRoLm1heChtaW4sIG1heCk7CiAgICAgICAgfQogICAgICAgIGVsc2UgewogICAgICAgICAgICAvLyAyLiBVcGRhdGUgbWluIGJ5IGNvbXBhcmluZyAobWluLCBiKQogICAgICAgICAgICAvLyAzLiBVcGRhdGUgbWF4IGJ5IGNvbXBhcmluZyAobWF4LCBhKQogICAgICAgICAgICBtaW4gPSBNYXRoLm1pbih2YWwsIG1pbik7CiAgICAgICAgICAgIG1heCA9IE1hdGgubWF4KHZhbCwgbWF4KTsKICAgICAgICB9CiAgICB9CiAgICByZXR1cm4gW21pbiwgbWF4XTsKfQoKdmFyIGN0eCA9IHNlbGY7CmN0eC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKF9hKSB7CiAgICB2YXIgcGF5bG9hZCA9IF9hLmRhdGE7CiAgICByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHsKICAgICAgICB2YXIgcmVuZGVyRm9ybSwgdURhdGEsIHZEYXRhLCBfYiwgdU1pbiwgdU1heCwgX2MsIHZNaW4sIHZNYXgsIHZlbG9jaXR5RGF0YSwgaSwgciwgZywgc2luZ2xlRGF0YSwgX2QsIG1pbiwgbWF4LCB2ZWxvY2l0eURhdGEsIGksIHI7CiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZSkgewogICAgICAgICAgICByZW5kZXJGb3JtID0gcGF5bG9hZFswXTsKICAgICAgICAgICAgaWYgKHJlbmRlckZvcm0gPT09ICdyZycpIHsKICAgICAgICAgICAgICAgIHVEYXRhID0gcGF5bG9hZFsxXTsKICAgICAgICAgICAgICAgIHZEYXRhID0gcGF5bG9hZFsyXTsKICAgICAgICAgICAgICAgIF9iID0gY2FsY01pbk1heCh1RGF0YSksIHVNaW4gPSBfYlswXSwgdU1heCA9IF9iWzFdOwogICAgICAgICAgICAgICAgX2MgPSBjYWxjTWluTWF4KHZEYXRhKSwgdk1pbiA9IF9jWzBdLCB2TWF4ID0gX2NbMV07CiAgICAgICAgICAgICAgICB2ZWxvY2l0eURhdGEgPSBuZXcgVWludDhBcnJheSh1RGF0YS5sZW5ndGggKiA0KTsKICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB1RGF0YS5sZW5ndGg7IGkrKykgewogICAgICAgICAgICAgICAgICAgIHIgPSAyNTUgKiAodURhdGFbaV0gLSB1TWluKSAvICh1TWF4IC0gdU1pbik7CiAgICAgICAgICAgICAgICAgICAgZyA9IDI1NSAqICh2RGF0YVtpXSAtIHZNaW4pIC8gKHZNYXggLSB2TWluKTsKICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eURhdGEuc2V0KFtyLCBnLCAwLCAyNTVdLCBpICogNCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoW3ZlbG9jaXR5RGF0YS5idWZmZXIsIHVNaW4sIHVNYXgsIHZNaW4sIHZNYXhdLCBbdmVsb2NpdHlEYXRhLmJ1ZmZlcl0pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgewogICAgICAgICAgICAgICAgc2luZ2xlRGF0YSA9IHBheWxvYWRbMV07CiAgICAgICAgICAgICAgICBfZCA9IGNhbGNNaW5NYXgoc2luZ2xlRGF0YSksIG1pbiA9IF9kWzBdLCBtYXggPSBfZFsxXTsKICAgICAgICAgICAgICAgIHZlbG9jaXR5RGF0YSA9IG5ldyBVaW50OEFycmF5KHNpbmdsZURhdGEubGVuZ3RoICogNCk7CiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2luZ2xlRGF0YS5sZW5ndGg7IGkrKykgewogICAgICAgICAgICAgICAgICAgIHIgPSAyNTUgKiAoc2luZ2xlRGF0YVtpXSAtIG1pbikgLyAobWF4IC0gbWluKTsKICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0eURhdGEuc2V0KFtyLCAwLCAwLCAyNTVdLCBpICogNCk7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICBjdHgucG9zdE1lc3NhZ2UoW3ZlbG9jaXR5RGF0YS5idWZmZXIsIG1pbiwgbWF4XSwgW3ZlbG9jaXR5RGF0YS5idWZmZXJdKTsKICAgICAgICAgICAgfQogICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107CiAgICAgICAgfSk7CiAgICB9KTsKfSk7Cgo=', 'data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YVByb2Nlc3NlLmpzIiwic291cmNlcyI6WyIuLi8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwic3JjL3V0aWxzL2NvbW1vbi50cyIsInNyYy93b3JrZXJzL0RhdGFQcm9jZXNzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gY2FsY01pbk1heChhcnJheTogbnVtYmVyW10pOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgbGV0IG1pbiA9IEluZmluaXR5O1xuICBsZXQgbWF4ID0gSW5maW5pdHk7XG4gIC8vIEBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMzU0NDQ3Ni9ob3ctdG8tZmluZC1tYXgtYW5kLW1pbi1pbi1hcnJheS11c2luZy1taW5pbXVtLWNvbXBhcmlzb25zXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB2YWwgPSBhcnJheVtpXTtcblxuICAgIGlmIChtaW4gPT09IEluZmluaXR5KSB7XG4gICAgICBtaW4gPSB2YWw7XG4gICAgfSBlbHNlIGlmIChtYXggPT09IEluZmluaXR5KSB7XG4gICAgICBtYXggPSB2YWw7XG4gICAgICAvLyB1cGRhdGUgbWluIG1heFxuICAgICAgLy8gMS4gUGljayAyIGVsZW1lbnRzKGEsIGIpLCBjb21wYXJlIHRoZW0uIChzYXkgYSA+IGIpXG4gICAgICBtaW4gPSBNYXRoLm1pbihtaW4sIG1heCk7XG4gICAgICBtYXggPSBNYXRoLm1heChtaW4sIG1heCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIDIuIFVwZGF0ZSBtaW4gYnkgY29tcGFyaW5nIChtaW4sIGIpXG4gICAgICAvLyAzLiBVcGRhdGUgbWF4IGJ5IGNvbXBhcmluZyAobWF4LCBhKVxuICAgICAgbWluID0gTWF0aC5taW4odmFsLCBtaW4pO1xuICAgICAgbWF4ID0gTWF0aC5tYXgodmFsLCBtYXgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW21pbiwgbWF4XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRlKHZhbDogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCAmJiB2YWwgIT09IG51bGwgJiYgIWlzTmFOKHZhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kU3RvcExlc3NUaGFuT3JFcXVhbFRvKHN0b3BzOiBudW1iZXJbXSwgaW5wdXQ6IG51bWJlcikge1xuICBjb25zdCBsYXN0SW5kZXggPSBzdG9wcy5sZW5ndGggLSAxO1xuICBsZXQgbG93ZXJJbmRleCA9IDA7XG4gIGxldCB1cHBlckluZGV4ID0gbGFzdEluZGV4O1xuICBsZXQgY3VycmVudEluZGV4ID0gMDtcbiAgbGV0IGN1cnJlbnRWYWx1ZTtcbiAgbGV0IG5leHRWYWx1ZTtcblxuICB3aGlsZSAobG93ZXJJbmRleCA8PSB1cHBlckluZGV4KSB7XG4gICAgY3VycmVudEluZGV4ID0gTWF0aC5mbG9vcigobG93ZXJJbmRleCArIHVwcGVySW5kZXgpIC8gMik7XG4gICAgY3VycmVudFZhbHVlID0gc3RvcHNbY3VycmVudEluZGV4XTtcbiAgICBuZXh0VmFsdWUgPSBzdG9wc1tjdXJyZW50SW5kZXggKyAxXTtcblxuICAgIGlmIChjdXJyZW50VmFsdWUgPD0gaW5wdXQpIHtcbiAgICAgIGlmIChjdXJyZW50SW5kZXggPT09IGxhc3RJbmRleCB8fCBpbnB1dCA8IG5leHRWYWx1ZSkge1xuICAgICAgICAvLyBTZWFyY2ggY29tcGxldGVcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICAgIH1cblxuICAgICAgbG93ZXJJbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50VmFsdWUgPiBpbnB1dCkge1xuICAgICAgdXBwZXJJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW5wdXQgaXMgbm90IGEgbnVtYmVyLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnA2NExvd1BhcnQoeDogbnVtYmVyKSB7XG4gIHJldHVybiB4IC0gTWF0aC5mcm91bmQoeCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0SW52ZXJ0KG91dDogbnVtYmVyW10sIGE6IG51bWJlcltdKSB7XG4gIGNvbnN0IGEwMCA9IGFbMF07XG4gIGNvbnN0IGEwMSA9IGFbMV07XG4gIGNvbnN0IGEwMiA9IGFbMl07XG4gIGNvbnN0IGEwMyA9IGFbM107XG4gIGNvbnN0IGExMCA9IGFbNF07XG4gIGNvbnN0IGExMSA9IGFbNV07XG4gIGNvbnN0IGExMiA9IGFbNl07XG4gIGNvbnN0IGExMyA9IGFbN107XG4gIGNvbnN0IGEyMCA9IGFbOF07XG4gIGNvbnN0IGEyMSA9IGFbOV07XG4gIGNvbnN0IGEyMiA9IGFbMTBdO1xuICBjb25zdCBhMjMgPSBhWzExXTtcbiAgY29uc3QgYTMwID0gYVsxMl07XG4gIGNvbnN0IGEzMSA9IGFbMTNdO1xuICBjb25zdCBhMzIgPSBhWzE0XTtcbiAgY29uc3QgYTMzID0gYVsxNV07XG5cbiAgY29uc3QgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICBjb25zdCBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gIGNvbnN0IGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgY29uc3QgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICBjb25zdCBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gIGNvbnN0IGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgY29uc3QgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICBjb25zdCBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gIGNvbnN0IGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgY29uc3QgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICBjb25zdCBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gIGNvbnN0IGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcblxuICAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG4gIGxldCBkZXQgPVxuICAgIGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICBpZiAoIWRldCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGRldCA9IDEuMCAvIGRldDtcblxuICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICBvdXRbM10gPSAoYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzKSAqIGRldDtcbiAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICBvdXRbNl0gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICBvdXRbOV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxMl0gPSAoYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2KSAqIGRldDtcbiAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gIG91dFsxNV0gPSAoYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwKSAqIGRldDtcblxuICByZXR1cm4gb3V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQ6IG51bWJlcltdLCBhOiBudW1iZXJbXSwgbTogbnVtYmVyW10pIHtcbiAgY29uc3QgeCA9IGFbMF07XG4gIGNvbnN0IHkgPSBhWzFdO1xuICBjb25zdCB6ID0gYVsyXTtcbiAgY29uc3QgdyA9IGFbM107XG4gIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogdzsgLy8gMFxuICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7IC8vIDBcbiAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdzsgLy8gMFxuICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3OyAvLyAxXG4gIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFeWUobWF0cml4OiBudW1iZXJbXSkge1xuICBjb25zdCBkZWZhdWx0TWF0NCA9IFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxXTsgLy8gaW5zdGVkIG9mIG1hdDQuY3JlYXRlKClcbiAgbGV0IGV5ZSA9IHRyYW5zZm9ybU1hdDQoXG4gICAgW10sXG4gICAgWzAsIDAsIDAsIDFdLFxuICAgIG1hdDRJbnZlcnQoZGVmYXVsdE1hdDQsIG1hdHJpeCkgYXMgbnVtYmVyW10sXG4gICk7XG4gIGNvbnN0IGNsaXBXID0gMS4wIC8gZXllWzNdO1xuICBleWUgPSBleWUubWFwKChpdGVtOiBudW1iZXIpID0+IGl0ZW0gLyBleWVbM10pO1xuICBleWVbM10gPSBjbGlwVztcbiAgcmV0dXJuIGV5ZTtcbn1cbiIsImltcG9ydCB7IGNhbGNNaW5NYXggfSBmcm9tICcuLi91dGlscy9jb21tb24nO1xuXG5jb25zdCBjdHg6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xuXG5jdHguYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGFzeW5jICh7IGRhdGE6IHBheWxvYWQgfSkgPT4ge1xuICBjb25zdCByZW5kZXJGb3JtID0gcGF5bG9hZFswXTtcbiAgaWYgKHJlbmRlckZvcm0gPT09ICdyZycpIHtcbiAgICBjb25zdCB1RGF0YSA9IHBheWxvYWRbMV07XG4gICAgY29uc3QgdkRhdGEgPSBwYXlsb2FkWzJdO1xuICAgIGNvbnN0IFt1TWluLCB1TWF4XSA9IGNhbGNNaW5NYXgodURhdGEpO1xuICAgIGNvbnN0IFt2TWluLCB2TWF4XSA9IGNhbGNNaW5NYXgodkRhdGEpO1xuICAgIGNvbnN0IHZlbG9jaXR5RGF0YSA9IG5ldyBVaW50OEFycmF5KHVEYXRhLmxlbmd0aCAqIDQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHIgPSAyNTUgKiAodURhdGFbaV0gLSB1TWluKSAvICh1TWF4IC0gdU1pbik7XG4gICAgICBjb25zdCBnID0gMjU1ICogKHZEYXRhW2ldIC0gdk1pbikgLyAodk1heCAtIHZNaW4pO1xuICAgICAgdmVsb2NpdHlEYXRhLnNldChbciwgZywgMCwgMjU1XSwgaSAqIDQpO1xuICAgIH1cblxuICAgIGN0eC5wb3N0TWVzc2FnZShbdmVsb2NpdHlEYXRhLmJ1ZmZlciwgdU1pbiwgdU1heCwgdk1pbiwgdk1heF0sIFt2ZWxvY2l0eURhdGEuYnVmZmVyXSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2luZ2xlRGF0YSA9IHBheWxvYWRbMV07XG4gICAgY29uc3QgW21pbiwgbWF4XSA9IGNhbGNNaW5NYXgoc2luZ2xlRGF0YSk7XG4gICAgY29uc3QgdmVsb2NpdHlEYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2luZ2xlRGF0YS5sZW5ndGggKiA0KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbmdsZURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHIgPSAyNTUgKiAoc2luZ2xlRGF0YVtpXSAtIG1pbikgLyAobWF4IC0gbWluKTtcbiAgICAgIHZlbG9jaXR5RGF0YS5zZXQoW3IsIDAsIDAsIDI1NV0sIGkgKiA0KTtcbiAgICB9XG5cbiAgICBjdHgucG9zdE1lc3NhZ2UoW3ZlbG9jaXR5RGF0YS5idWZmZXIsIG1pbiwgbWF4XSwgW3ZlbG9jaXR5RGF0YS5idWZmZXJdKTtcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsQUFvREE7QUFDQSxBQUFPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtJQUN6RCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7UUFDdkQsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMzRixTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDOUYsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7UUFDL0ksSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3pFLENBQUMsQ0FBQztDQUNOOztBQUVELEFBQU8sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtJQUN2QyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pILE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pKLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2xFLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNkLElBQUksQ0FBQyxJQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsR0FBQztRQUM5RCxPQUFPLENBQUMsSUFBRSxJQUFJO1lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLElBQUUsT0FBTyxDQUFDLEdBQUM7WUFDN0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBQztZQUN4QyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtnQkFDOUIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUN4RCxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO2dCQUNqRCxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO2dCQUNqRDtvQkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO29CQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBQztvQkFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7YUFDOUI7WUFDRCxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBRTtRQUMxRCxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ3BGO0NBQ0o7O1NDdEdlLFVBQVUsQ0FBQyxLQUFlO0lBQ3hDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztJQUNuQixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUM7O0lBRW5CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3JDLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyQixJQUFJLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDcEIsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNYO2FBQU0sSUFBSSxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLEdBQUcsR0FBRyxHQUFHLENBQUM7OztZQUdWLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN6QixHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUI7YUFBTTs7O1lBR0wsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxQjtLQUNGO0lBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNuQjs7QUNyQkQsSUFBTSxHQUFHLEdBQVcsSUFBVyxDQUFDO0FBRWhDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBTyxFQUFpQjtRQUFmLGlCQUFhOzs7O1lBQzlDLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO2dCQUNqQixLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixLQUFlLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBL0IsSUFBSSxRQUFBLEVBQUUsSUFBSSxRQUFBLENBQXNCO2dCQUNqQyxLQUFlLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBL0IsSUFBSSxRQUFBLEVBQUUsSUFBSSxRQUFBLENBQXNCO2dCQUNqQyxZQUFZLEdBQUcsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMvQixDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQzVDLENBQUMsR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDbEQsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDekM7Z0JBRUQsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUN2RjtpQkFBTTtnQkFDQyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixLQUFhLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBbEMsR0FBRyxRQUFBLEVBQUUsR0FBRyxRQUFBLENBQTJCO2dCQUNwQyxZQUFZLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsS0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwQyxDQUFDLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQ3BELFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3pDO2dCQUVELEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ3pFOzs7O0NBQ0YsQ0FBQyxDQUFDIn0=', false);
    function isNumber$1(val) {
        return typeof val === 'number' && !isNaN(val);
    }
    function findStopLessThanOrEqualTo(stops, input) {
        var lastIndex = stops.length - 1;
        var lowerIndex = 0;
        var upperIndex = lastIndex;
        var currentIndex = 0;
        var currentValue;
        var nextValue;
        while (lowerIndex <= upperIndex) {
            currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
            currentValue = stops[currentIndex];
            nextValue = stops[currentIndex + 1];
            if (currentValue <= input) {
                if (currentIndex === lastIndex || input < nextValue) {
                    // Search complete
                    return currentIndex;
                }
                lowerIndex = currentIndex + 1;
            }
            else if (currentValue > input) {
                upperIndex = currentIndex - 1;
            }
            else {
                throw new Error('Input is not a number.');
            }
        }
        return 0;
    }
    function fp64LowPart(x) {
        return x - Math.fround(x);
    }
    function mat4Invert(out, a) {
        var a00 = a[0];
        var a01 = a[1];
        var a02 = a[2];
        var a03 = a[3];
        var a10 = a[4];
        var a11 = a[5];
        var a12 = a[6];
        var a13 = a[7];
        var a20 = a[8];
        var a21 = a[9];
        var a22 = a[10];
        var a23 = a[11];
        var a30 = a[12];
        var a31 = a[13];
        var a32 = a[14];
        var a33 = a[15];
        var b00 = a00 * a11 - a01 * a10;
        var b01 = a00 * a12 - a02 * a10;
        var b02 = a00 * a13 - a03 * a10;
        var b03 = a01 * a12 - a02 * a11;
        var b04 = a01 * a13 - a03 * a11;
        var b05 = a02 * a13 - a03 * a12;
        var b06 = a20 * a31 - a21 * a30;
        var b07 = a20 * a32 - a22 * a30;
        var b08 = a20 * a33 - a23 * a30;
        var b09 = a21 * a32 - a22 * a31;
        var b10 = a21 * a33 - a23 * a31;
        var b11 = a22 * a33 - a23 * a32;
        // Calculate the determinant
        var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return out;
    }
    function transformMat4(out, a, m) {
        var x = a[0];
        var y = a[1];
        var z = a[2];
        var w = a[3];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w; // 0
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w; // 0
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w; // 0
        out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w; // 1
        return out;
    }
    function getEye(matrix) {
        var defaultMat4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; // insted of mat4.create()
        var eye = transformMat4([], [0, 0, 0, 1], mat4Invert(defaultMat4, matrix));
        var clipW = 1.0 / eye[3];
        eye = eye.map(function (item) { return item / eye[3]; });
        eye[3] = clipW;
        return eye;
    }

    // 大量代码来自于 [webgl-utils](https://github.com/gfxfundamentals/webgl-fundamentals/blob/master/webgl/resources/webgl-utils.js)
    function getDevicePixelRatio() {
        return devicePixelRatio || 1;
    }
    /**
     * resize gl context
     * @link https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
     * @link https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-anti-patterns.html
     * @param canvas
     * @param pixelRatio
     * @returns {boolean}
     */
    function resizeCanvasSize(canvas, pixelRatio) {
        if (!canvas) {
            return false;
        }
        pixelRatio = pixelRatio || getDevicePixelRatio();
        if (!(canvas instanceof OffscreenCanvas)) {
            var width = canvas.clientWidth * pixelRatio;
            var height = canvas.clientHeight * pixelRatio;
            if (width <= 0 || height <= 0) {
                return false;
            }
            else if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                return true;
            }
        }
        return false;
    }
    /**
     * inject shader module
     * @param shader
     * @param modules
     */
    function injectShaderModule(shader, modules) {
        Object.keys(modules).map(function (key) {
            if (modules[key]) {
                shader = shader.replace(new RegExp(key, 'g'), modules[key] + " \n");
            }
        });
        return shader;
    }
    /**
     * create shader and compile shader
     * @param gl
     * @param type
     * @param source
     * @returns {WebGLShader}
     */
    function createShader(gl, type, source) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            throw new Error(gl.getShaderInfoLog(shader) || '');
        }
        return shader;
    }
    /**
     * create program from vertex and frag
     * @param gl
     * @param vertexShaderSource
     * @param fragmentShaderSource
     * @returns {WebGLProgram}
     */
    function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
        // create the shader program
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        var program = gl.createProgram();
        if (program !== null) {
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(program) || '');
            }
        }
        return program;
    }
    /**
     * create 2d texture
     * @param gl
     * @param filter
     * @param data
     * @param width
     * @param height
     * @returns {WebGLTexture}
     */
    function createTexture(gl, filter, data, width, height) {
        // 创建纹理对象
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // 指定水平方向填充算法
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        // 指定垂直方向填充算法
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        // 指定缩小算法
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        // 指定放大算法
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        if (data instanceof Uint8Array) {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
        }
        else {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    }
    /**
     * create data buffer
     * @param gl
     * @param data
     * @returns {AudioBuffer | WebGLBuffer}
     */
    function createBuffer(gl, data) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        if (data) {
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        }
        return buffer;
    }
    /**
     * clear scene
     * @param gl
     * @param color
     */
    function clearScene(gl, color) {
        var r = color[0], g = color[1], b = color[2], a = color[3];
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(r, g, b, a);
        gl.clearDepth(1);
        // tslint:disable-next-line:no-bitwise
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
    }
    /**
     * load image by url
     * @param src
     * @returns {Promise<Image>}
     */
    function loadImage(src) {
        return new Promise(function (resolve, reject) {
            if (!src) {
                reject(new Event('url is null'));
            }
            var image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = function () { return resolve(image); };
            image.onerror = reject;
            image.src = src;
            if (image.complete) {
                resolve(image);
            }
        });
    }
    function getPlaneBuffer(startX, endX, startY, endY, widthSegments, heightSegments) {
        var width = endX - startX;
        var height = endY - startY;
        var widthHalf = width / 2;
        var heightHalf = height / 2;
        var gridX = Math.floor(widthSegments);
        var gridY = Math.floor(heightSegments);
        var gridX1 = gridX + 1;
        var gridY1 = gridY + 1;
        var segmentWidth = width / gridX;
        var segmentHeight = height / gridY;
        var indices = [];
        var wireframeIndexes = [];
        var vertices = [];
        var verticesLow = [];
        var uvs = [];
        for (var iy = 0; iy < gridY1; iy++) {
            var y = iy * segmentHeight;
            for (var ix = 0; ix < gridX1; ix++) {
                var x = ix * segmentWidth;
                var vx = startX + (x / widthHalf / 2) * width;
                var vy = startY + (y / heightHalf / 2) * height;
                vertices.push(vx, vy, 0);
                verticesLow.push(fp64LowPart(vx), fp64LowPart(vy), 0);
                // vertices.push(ix / gridX, 1 - (iy / gridY));
                uvs.push(ix / gridX, iy / gridY);
            }
        }
        for (var iy = 0; iy < gridY; iy++) {
            for (var ix = 0; ix < gridX; ix++) {
                var a = ix + gridX1 * iy;
                var b = ix + gridX1 * (iy + 1);
                var c = ix + 1 + gridX1 * (iy + 1);
                var d = ix + 1 + gridX1 * iy;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }
        for (var i = 0, l = indices.length; i < l; i += 3) {
            var a = indices[i];
            var b = indices[i + 1];
            var c = indices[i + 2];
            wireframeIndexes.push(a, b, b, c, c, a);
        }
        return {
            uvs: {
                data: uvs,
                size: 2
            },
            elements: {
                data: indices,
                count: indices.length
            },
            wireframeElements: {
                data: wireframeIndexes,
                count: wireframeIndexes.length
            },
            position: {
                data: vertices,
                size: 3
            },
            positionLow: {
                data: verticesLow,
                size: 3
            }
        };
    }

    var Base = /** @class */ (function () {
        function Base(gl, vShader, fShader, modules) {
            this.vertShader = '';
            this.fragShader = '';
            if (vShader) {
                this.vertShader = vShader;
            }
            if (fShader) {
                this.fragShader = fShader;
            }
            this.program = createProgram(gl, injectShaderModule(this.vertShader, modules), this.fragShader);
            this.gl = gl;
            this.textureUnit = 0;
            this.uniformSetters = this.createUniformSetters();
            this.attribSetters = this.createAttributeSetters();
            this.transfromStack = []; // 矩阵变换调用栈
        }
        Base.prototype.active = function () {
            this.gl.useProgram(this.program);
            return this;
        };
        Base.prototype.deactive = function () {
            this.gl.deleteProgram(this.program);
            return this;
        };
        /**
         * from webgl-utils
         * @param gl
         * @param type
         * @returns {GLenum|undefined}
         */
        Base.prototype.getBindPointForSamplerType = function (gl, type) {
            if (type === gl.SAMPLER_2D) {
                return gl.TEXTURE_2D;
            } // eslint-disable-line
            if (type === gl.SAMPLER_CUBE) {
                return gl.TEXTURE_CUBE_MAP;
            } // eslint-disable-line
            return undefined;
        };
        /**
         * from webgl-utils
         * @param program
         * @param uniformInfo
         * @returns {function(...[*]=)}
         */
        Base.prototype.createUniformSetter = function (program, uniformInfo) {
            var gl = this.gl;
            var location = gl.getUniformLocation(program, uniformInfo.name);
            var type = uniformInfo.type;
            // Check if this uniform is an array
            var isArray = uniformInfo.size > 1 && uniformInfo.name.substr(-3) === '[0]';
            if (type === gl.FLOAT && isArray) {
                return function (v) {
                    gl.uniform1fv(location, v);
                };
            }
            if (type === gl.FLOAT) {
                return function (v) {
                    gl.uniform1f(location, v);
                };
            }
            if (type === gl.FLOAT_VEC2) {
                return function (v) {
                    gl.uniform2fv(location, v);
                };
            }
            if (type === gl.FLOAT_VEC3) {
                return function (v) {
                    gl.uniform3fv(location, v);
                };
            }
            if (type === gl.FLOAT_VEC4) {
                return function (v) {
                    gl.uniform4fv(location, v);
                };
            }
            if (type === gl.INT && isArray) {
                return function (v) {
                    gl.uniform1iv(location, v);
                };
            }
            if (type === gl.INT) {
                return function (v) {
                    gl.uniform1i(location, v);
                };
            }
            if (type === gl.INT_VEC2) {
                return function (v) {
                    gl.uniform2iv(location, v);
                };
            }
            if (type === gl.INT_VEC3) {
                return function (v) {
                    gl.uniform3iv(location, v);
                };
            }
            if (type === gl.INT_VEC4) {
                return function (v) {
                    gl.uniform4iv(location, v);
                };
            }
            if (type === gl.BOOL) {
                return function (v) {
                    gl.uniform1iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC2) {
                return function (v) {
                    gl.uniform2iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC3) {
                return function (v) {
                    gl.uniform3iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC4) {
                return function (v) {
                    gl.uniform4iv(location, v);
                };
            }
            if (type === gl.FLOAT_MAT2) {
                return function (v) {
                    gl.uniformMatrix2fv(location, false, v);
                };
            }
            if (type === gl.FLOAT_MAT3) {
                return function (v) {
                    gl.uniformMatrix3fv(location, false, v);
                };
            }
            if (type === gl.FLOAT_MAT4) {
                return function (v) {
                    gl.uniformMatrix4fv(location, false, v);
                };
            }
            if ((type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) && isArray) {
                var units = [];
                for (var ii = 0; ii < uniformInfo.size; ++ii) {
                    units.push(this.textureUnit++);
                }
                return (function (bindPoint, units) {
                    return function (textures) {
                        gl.uniform1iv(location, units);
                        textures.forEach(function (texture, index) {
                            gl.activeTexture(gl.TEXTURE0 + units[index]);
                            if (bindPoint !== undefined) {
                                gl.bindTexture(bindPoint, texture);
                            }
                        });
                    };
                })(this.getBindPointForSamplerType(gl, type), units);
            }
            if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
                return (function (bindPoint, unit) {
                    return function (texture) {
                        gl.uniform1i(location, unit);
                        gl.activeTexture(gl.TEXTURE0 + unit);
                        if (bindPoint !== undefined) {
                            gl.bindTexture(bindPoint, texture);
                        }
                    };
                })(this.getBindPointForSamplerType(gl, type), this.textureUnit++);
            }
            throw new Error('unknown type: 0x' + type.toString(16)); // we should never get here.
        };
        /**
         * from webgl-utils
         * @returns {{}}
         */
        Base.prototype.createUniformSetters = function () {
            var gl = this.gl;
            this.textureUnit = 0;
            var uniformSetters = {};
            if (this.program !== null) {
                var numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
                for (var ii = 0; ii < numUniforms; ++ii) {
                    var uniformInfo = gl.getActiveUniform(this.program, ii);
                    if (!uniformInfo) {
                        break;
                    }
                    var name_1 = uniformInfo.name;
                    // remove the array suffix.
                    if (name_1.substr(-3) === '[0]') {
                        name_1 = name_1.substr(0, name_1.length - 3);
                    }
                    var setter = this.createUniformSetter(this.program, uniformInfo);
                    uniformSetters[name_1] = setter;
                }
            }
            return uniformSetters;
        };
        /**
         * from webgl-utils
         * @returns {function(...[*]=)}
         */
        Base.prototype.createAttribSetter = function (index) {
            var gl = this.gl;
            return function (b) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
                gl.enableVertexAttribArray(index);
                if (b.numComponents !== undefined || b.size !== undefined) {
                    gl.vertexAttribPointer(index, (b.numComponents || b.size), b.type || gl.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
                }
            };
        };
        Base.prototype.createAttributeSetters = function () {
            var gl = this.gl;
            var attribSetters = {};
            if (this.program !== null) {
                var numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
                for (var ii = 0; ii < numAttribs; ++ii) {
                    var attribInfo = gl.getActiveAttrib(this.program, ii);
                    if (!attribInfo) {
                        break;
                    }
                    var index = gl.getAttribLocation(this.program, attribInfo.name);
                    attribSetters[attribInfo.name] = this.createAttribSetter(index);
                }
            }
            return attribSetters;
        };
        Base.prototype.setAttributes = function (attribs, setters) {
            if (setters) {
                setters = setters.attribSetters || setters;
            }
            else {
                setters = this.attribSetters;
            }
            Object.keys(attribs).forEach(function (name) {
                var setter = setters[name];
                if (setter) {
                    setter(attribs[name]);
                }
            });
            return this;
        };
        Base.prototype.setUniforms = function (values, setters) {
            if (setters) {
                setters = setters.uniformSetters || setters;
            }
            else {
                setters = this.uniformSetters;
            }
            Object.keys(values).forEach(function (name) {
                var setter = setters[name];
                if (setter) {
                    setter(values[name]);
                }
            });
            return this;
        };
        Base.prototype.elements = function (element) {
            var _a;
            if (!this.elementsBuffer) {
                this.elementsBuffer = this.gl.createBuffer();
            }
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.elementsBuffer);
            if (element.data) {
                this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, element.data, ((_a = element) === null || _a === void 0 ? void 0 : _a.usage) || this.gl.STATIC_DRAW);
            }
            if (element.count !== undefined) {
                this.runTimes(element.count);
            }
            if (element.primitive) {
                this.setPrimitive(element.primitive);
            }
            return this;
        };
        /**
         * 可以override，默认使用此种方式清空画布
         * @param color
         * @returns {Base}
         */
        Base.prototype.clear = function (color) {
            clearScene(this.gl, color);
            this.transfromStack = [];
            return this;
        };
        /**
         * 运行次数
         * TODO: 目前没有好的方式去绑定顶点数量的关系
         * @param count
         */
        Base.prototype.runTimes = function (count) {
            this.count = count || 0;
            return this;
        };
        Base.prototype.setPrimitive = function (primitive) {
            this.primitive = primitive || this.gl.TRIANGLES;
        };
        Base.prototype.resize = function () {
            resizeCanvasSize(this.gl.canvas);
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
            return this;
        };
        Base.prototype.draw = function () {
            throw new Error('should override');
        };
        Base.prototype.translate = function () {
            throw new Error('should override');
        };
        Base.prototype.rotate = function () {
            throw new Error('should override');
        };
        Base.prototype.scale = function () {
            throw new Error('should override');
        };
        return Base;
    }());

    var FillFrag = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_image;uniform sampler2D u_color_ramp;uniform vec2 u_image_res;uniform vec2 u_range;uniform vec2 u_color_range;uniform vec2 u_display_range;uniform float u_opacity;varying vec2 v_tex_pos;float calcTexture(const vec2 uv){return texture2D(u_image,uv).r;}float bilinear(const vec2 uv){vec2 px=1.0/u_image_res;vec2 vc=(floor(uv*u_image_res))*px;vec2 f=fract(uv*u_image_res);float tl=calcTexture(vc);float tr=calcTexture(vc+vec2(px.x,0));float bl=calcTexture(vc+vec2(0,px.y));float br=calcTexture(vc+px);return mix(mix(tl,tr,f.x),mix(bl,br,f.x),f.y);}float getValue(const vec2 uv){float min=u_range.x;float max=u_range.y;float r=bilinear(uv);return r*(max-min)+min;}const float PI=3.14159265359;/***Converts mapbox style pseudo-mercator coordinates(this is just like mercator,but the unit isn't a meter,but 0..1*spans the entire world)into texture like WGS84 coordinates(this is just like WGS84,but instead of angles,it uses*intervals of 0..1).*/vec2 mercatorToWGS84(vec2 xy){float y=radians(180.0-xy.y*360.0);y=360.0/PI*atan(exp(y))-90.0;y=y/-180.0+0.5;return vec2(xy.x,y);}void main(){vec2 globalWGS84=mercatorToWGS84(v_tex_pos);float value=getValue(globalWGS84);float value_t=(value-u_color_range.x)/(u_color_range.y-u_color_range.x);vec2 ramp_pos=vec2(fract(16.0*value_t),floor(16.0*value_t)/16.0);vec4 color=texture2D(u_color_ramp,ramp_pos);bool display=value<u_display_range.y&&value>u_display_range.x;if(display){gl_FragColor=vec4(floor(255.0*color*u_opacity)/255.0);}else{gl_FragColor=vec4(0.0,0.0,0.0,0.0);}}"; // eslint-disable-line

    var FillVert = "#define GLSLIFY 1\nattribute vec3 instancePositions;attribute vec3 instancePositions64Low;attribute vec2 a_texCoord;uniform mat4 u_matrix;uniform vec4 u_cameraEye;uniform vec4 u_cameraEye64Low;uniform float u_offset;uniform sampler2D u_image;uniform vec2 u_image_res;uniform vec2 u_range;uniform vec2 u_mapping_range;varying vec2 v_tex_pos;varying float v_value;float calcTexture(const vec2 uv){return texture2D(u_image,uv).r;}float bilinear(const vec2 uv){vec2 px=1.0/u_image_res;vec2 vc=(floor(uv*u_image_res))*px;vec2 f=fract(uv*u_image_res);float tl=calcTexture(vc);float tr=calcTexture(vc+vec2(px.x,0));float bl=calcTexture(vc+vec2(0,px.y));float br=calcTexture(vc+px);return mix(mix(tl,tr,f.x),mix(bl,br,f.x),f.y);}float getValue(const vec2 uv){float min=u_mapping_range.x;float max=u_mapping_range.y;float r=bilinear(uv);return r*(max-min)+min;}const float PI=3.14159265359;/***Converts mapbox style pseudo-mercator coordinates(this is just like mercator,but the unit isn't a meter,but 0..1*spans the entire world)into texture like WGS84 coordinates(this is just like WGS84,but instead of angles,it uses*intervals of 0..1).*/vec2 mercatorToWGS84(vec2 xy){float y=radians(180.0-xy.y*360.0);y=360.0/PI*atan(exp(y))-90.0;y=y/-180.0+0.5;return vec2(xy.x,y);}\n#modules-transformZ\nvoid main(){v_tex_pos=a_texCoord;vec2 globalWGS84=mercatorToWGS84(v_tex_pos);float value=getValue(globalWGS84);float z=transformZ(value,instancePositions);vec4 pos=vec4(instancePositions-u_cameraEye.xyz,0.0);pos+=vec4(instancePositions64Low-u_cameraEye64Low.xyz,0.0);\n#modules-project\n}"; // eslint-disable-line

    var Fill = /** @class */ (function (_super) {
        __extends$1(Fill, _super);
        function Fill(gl, vShader, fShader, modules) {
            var _this = _super.call(this, gl, vShader || FillVert, fShader || FillFrag, modules || {}) || this;
            _this.vertShader = FillVert;
            _this.fragShader = FillFrag;
            return _this;
        }
        Fill.prototype.draw = function () {
            // draw
            if (this.checkExt !== undefined) {
                var primitiveType = this.primitive || this.gl.TRIANGLES;
                // gl.UNSIGNED_BYTE对应Uint8Array，gl.UNSIGNED_SHORT对应Uint16Array
                if (this.checkExt) {
                    this.gl.drawElements(primitiveType, this.count, this.gl.UNSIGNED_INT, 0);
                }
                else {
                    this.gl.drawElements(primitiveType, this.count, this.gl.UNSIGNED_SHORT, 0);
                }
            }
            else {
                this.checkExt = this.gl.getExtension('OES_element_index_uint');
            }
            return this;
        };
        Fill.prototype.translate = function () {
            return this;
        };
        Fill.prototype.rotate = function () {
            return this;
        };
        Fill.prototype.scale = function () {
            return this;
        };
        return Fill;
    }(Base));

    /**
     * ```js
     * [
     *   'interpolate',
     *   ['linear'],
     *   ['get', 'value'],
     *   0.0,
     *   '#3288bd',
     *   10,
     *   '#66c2a5',
     *   20,
     *   '#abdda4',
     * ]
     * ```
     */
    function parseColorStyle(styleAttrField) {
        if (Array.isArray(styleAttrField) && styleAttrField.length > 3) {
            var type = styleAttrField[0]; // interpolate \ step
            var action = styleAttrField[1]; // linear
            var expression = styleAttrField[2];
            var interpolateColor = [];
            for (var i = 3; i < styleAttrField.length; i += 2) {
                var val = styleAttrField[i];
                var color = styleAttrField[i + 1];
                interpolateColor.push({
                    key: val,
                    value: color
                });
            }
            return {
                operator: type,
                interpolation: {
                    name: action[0],
                    base: action[1]
                },
                input: interpolateColor
            };
        }
        else {
            console.warn('[wind-core]: style-parser style config invalid');
            return {};
        }
    }
    function parseZoomStyle(styleAttrField) {
        if (Array.isArray(styleAttrField) && styleAttrField.length > 3) {
            var type = styleAttrField[0]; // interpolate
            var action = styleAttrField[1]; // linear
            var expression = styleAttrField[2];
            var interpolateZoom = [];
            for (var i = 3; i < styleAttrField.length; i += 2) {
                var val = styleAttrField[i];
                var color = styleAttrField[i + 1];
                interpolateZoom.push({
                    key: val,
                    value: color
                });
            }
            return {
                operator: type,
                interpolation: {
                    name: action[0],
                    base: action[1]
                },
                input: interpolateZoom
            };
        }
        else {
            console.warn('[wind-core]: style-parser style config invalid');
            return {};
        }
    }
    function createLinearGradient(range, styleAttrField) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 1;
        var interpolateColor = parseColorStyle(styleAttrField).input;
        if (ctx && interpolateColor && Array.isArray(interpolateColor)) {
            var keys = interpolateColor.map(function (d) { return parseFloat(d.key); });
            var colorRange = [Math.min.apply(Math, keys), Math.max.apply(Math, keys)];
            var _a = [range[0] || colorRange[0], range[1] || colorRange[1]], min = _a[0], max = _a[1];
            var gradient = ctx.createLinearGradient(0, 0, 256, 0);
            for (var i = 0; i < interpolateColor.length; i += 1) {
                var key = interpolateColor[i].key;
                var color = interpolateColor[i].value;
                gradient.addColorStop((key - min) / (max - min), color);
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 256, 1);
            return {
                data: new Uint8Array(ctx.getImageData(0, 0, 256, 1).data),
                colorRange: colorRange
            };
        }
        else {
            // @ts-ignore
            return {};
        }
    }
    function exponentialInterpolation(input, base, lowerValue, upperValue) {
        var difference = upperValue - lowerValue;
        var progress = input - lowerValue;
        if (difference === 0) {
            return 0;
        }
        else if (base === 1) {
            return progress / difference;
        }
        else {
            return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
        }
    }
    function interpolationFactor(interpolation, input, lower, upper) {
        var t = 0;
        if (interpolation.name === 'exponential') {
            t = exponentialInterpolation(input, interpolation.base, lower, upper);
        }
        else if (interpolation.name === 'linear') {
            t = exponentialInterpolation(input, 1, lower, upper);
        }
        else if (interpolation.name === 'cubic-bezier') {
            console.warn('interpolationFactor');
        }
        return t;
    }
    function interpolateNumber(a, b, t) {
        return a * (1 - t) + b * t;
    }
    var cachedStyle;
    function createZoom(zoom, styleAttrField) {
        if (styleAttrField && Array.isArray(styleAttrField)) {
            cachedStyle = parseZoomStyle(styleAttrField);
        }
        if (cachedStyle) {
            var _a = cachedStyle || {}, interpolateZoom = _a.input, interpolation = _a.interpolation;
            if (interpolateZoom && Array.isArray(interpolateZoom)) {
                var labels = interpolateZoom.map(function (i) { return i.key; });
                var outputs = interpolateZoom.map(function (i) { return i.value; });
                if (zoom <= labels[0]) {
                    return outputs[0];
                }
                var stopCount = labels.length;
                if (zoom >= labels[stopCount - 1]) {
                    return outputs[stopCount - 1];
                }
                var index = findStopLessThanOrEqualTo(labels, zoom);
                var idx = labels.length - 1;
                var lower = labels[index];
                var upper = labels[index >= idx ? idx : index + 1];
                var t = interpolationFactor(interpolation, zoom, lower, upper);
                var outputLower = outputs[index];
                var outputUpper = outputs[index >= idx ? idx : index + 1];
                return interpolateNumber(outputLower, outputUpper, t);
            }
            else {
                return 1;
            }
        }
        return isNumber$1(styleAttrField) ? styleAttrField : 1;
    }

    var FillFrag$1 = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D u_wind;uniform sampler2D u_color_ramp;uniform vec2 u_image_res;uniform vec2 u_wind_min;uniform vec2 u_wind_max;uniform vec2 u_color_range;uniform vec2 u_display_range;uniform float u_opacity;varying vec2 v_tex_pos;vec2 windTexture(const vec2 uv){return texture2D(u_wind,uv).rg;}float bilinearU(const vec2 uv){vec2 px=1.0/u_image_res;vec2 vc=(floor(uv*u_image_res))*px;vec2 f=fract(uv*u_image_res);float tl=windTexture(vc).r;float tr=windTexture(vc+vec2(px.x,0)).r;float bl=windTexture(vc+vec2(0,px.y)).r;float br=windTexture(vc+px).r;return mix(mix(tl,tr,f.x),mix(bl,br,f.x),f.y);}float bilinearV(const vec2 uv){vec2 px=1.0/u_image_res;vec2 vc=(floor(uv*u_image_res))*px;vec2 f=fract(uv*u_image_res);float tl=windTexture(vc).g;float tr=windTexture(vc+vec2(px.x,0.0)).g;float bl=windTexture(vc+vec2(0.0,px.y)).g;float br=windTexture(vc+px).g;return mix(mix(tl,tr,f.x),mix(bl,br,f.x),f.y);}float getV(const vec2 uv){float min=u_wind_min.y;float max=u_wind_max.y;float r=bilinearV(uv);return r*(max-min)+min;}float getU(const vec2 uv){float min=u_wind_min.x;float max=u_wind_max.x;float r=bilinearU(uv);return r*(max-min)+min;}float windSpeed(const vec2 uv){float u=getU(uv);float v=getV(uv);return length(vec2(u,v));}const float PI=3.14159265359;/***Converts mapbox style pseudo-mercator coordinates(this is just like mercator,but the unit isn't a meter,but 0..1*spans the entire world)into texture like WGS84 coordinates(this is just like WGS84,but instead of angles,it uses*intervals of 0..1).*/vec2 mercatorToWGS84(vec2 xy){float y=radians(180.0-xy.y*360.0);y=360.0/PI*atan(exp(y))-90.0;y=y/-180.0+0.5;return vec2(xy.x,y);}void main(){vec2 globalWGS84=mercatorToWGS84(v_tex_pos);float value=windSpeed(globalWGS84);float value_t=(value-u_color_range.x)/(u_color_range.y-u_color_range.x);vec2 ramp_pos=vec2(fract(16.0*value_t),floor(16.0*value_t)/16.0);vec4 color=texture2D(u_color_ramp,ramp_pos);bool display=value<u_display_range.y&&value>u_display_range.x;if(display){gl_FragColor=vec4(floor(255.0*color*u_opacity)/255.0);}else{gl_FragColor=vec4(0.0,0.0,0.0,0.0);}}"; // eslint-disable-line

    var FillVert$1 = "#define GLSLIFY 1\nattribute vec3 instancePositions;attribute vec3 instancePositions64Low;attribute vec2 a_texCoord;uniform mat4 u_matrix;uniform vec4 u_cameraEye;uniform vec4 u_cameraEye64Low;uniform float u_offset;uniform sampler2D u_wind;uniform vec2 u_image_res;uniform vec2 u_wind_min;uniform vec2 u_wind_max;uniform vec2 u_mapping_range;varying vec2 v_tex_pos;varying float v_value;vec2 windTexture(const vec2 uv){return texture2D(u_wind,uv).rg;}float bilinearU(const vec2 uv){vec2 px=1.0/u_image_res;vec2 vc=(floor(uv*u_image_res))*px;vec2 f=fract(uv*u_image_res);float tl=windTexture(vc).r;float tr=windTexture(vc+vec2(px.x,0)).r;float bl=windTexture(vc+vec2(0,px.y)).r;float br=windTexture(vc+px).r;return mix(mix(tl,tr,f.x),mix(bl,br,f.x),f.y);}float bilinearV(const vec2 uv){vec2 px=1.0/u_image_res;vec2 vc=(floor(uv*u_image_res))*px;vec2 f=fract(uv*u_image_res);float tl=windTexture(vc).g;float tr=windTexture(vc+vec2(px.x,0.0)).g;float bl=windTexture(vc+vec2(0.0,px.y)).g;float br=windTexture(vc+px).g;return mix(mix(tl,tr,f.x),mix(bl,br,f.x),f.y);}float getV(const vec2 uv){float min=u_wind_min.y;float max=u_wind_max.y;float r=bilinearV(uv);return r*(max-min)+min;}float getU(const vec2 uv){float min=u_wind_min.x;float max=u_wind_max.x;float r=bilinearU(uv);return r*(max-min)+min;}float windSpeed(const vec2 uv){float u=getU(uv);float v=getV(uv);float min=u_mapping_range.x;float max=u_mapping_range.y;float val=length(vec2(u,v));return val*(max-min)+min;}const float PI=3.14159265359;/***Converts mapbox style pseudo-mercator coordinates(this is just like mercator,but the unit isn't a meter,but 0..1*spans the entire world)into texture like WGS84 coordinates(this is just like WGS84,but instead of angles,it uses*intervals of 0..1).*/vec2 mercatorToWGS84(vec2 xy){float y=radians(180.0-xy.y*360.0);y=360.0/PI*atan(exp(y))-90.0;y=y/-180.0+0.5;return vec2(xy.x,y);}\n#modules-transformZ\nvoid main(){v_tex_pos=a_texCoord;vec2 globalWGS84=mercatorToWGS84(v_tex_pos);float value=windSpeed(globalWGS84);float z=transformZ(value,instancePositions);vec4 pos=vec4(instancePositions-u_cameraEye.xyz,0.0);pos+=vec4(instancePositions64Low-u_cameraEye64Low.xyz,0.0);\n#modules-project\n}"; // eslint-disable-line

    var WindFill = /** @class */ (function (_super) {
        __extends$1(WindFill, _super);
        function WindFill(gl, vShader, fShader, modules) {
            var _this = _super.call(this, gl, vShader || FillVert$1, fShader || FillFrag$1, modules || {}) || this;
            _this.vertShader = FillVert$1;
            _this.fragShader = FillFrag$1;
            return _this;
        }
        WindFill.prototype.draw = function () {
            // draw
            if (this.checkExt !== undefined) {
                var primitiveType = this.primitive || this.gl.TRIANGLES;
                // gl.UNSIGNED_BYTE对应Uint8Array，gl.UNSIGNED_SHORT对应Uint16Array
                if (this.checkExt) {
                    this.gl.drawElements(primitiveType, this.count, this.gl.UNSIGNED_INT, 0);
                }
                else {
                    this.gl.drawElements(primitiveType, this.count, this.gl.UNSIGNED_SHORT, 0);
                }
            }
            else {
                this.checkExt = this.gl.getExtension('OES_element_index_uint');
            }
            return this;
        };
        WindFill.prototype.translate = function () {
            return this;
        };
        WindFill.prototype.rotate = function () {
            return this;
        };
        WindFill.prototype.scale = function () {
            return this;
        };
        return WindFill;
    }(Base));

    var defaultOptions$1 = {
        renderForm: 'r',
        styleSpec: {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'value'],
                0.0,
                '#3288bd',
                10,
                '#66c2a5',
                20,
                '#abdda4',
                30,
                '#e6f598',
                40,
                '#fee08b',
                50,
                '#fdae61',
                60,
                '#f46d43',
                100.0,
                '#d53e4f' ],
            opacity: 1
        },
        displayRange: [Infinity, Infinity],
        mappingRange: [0, 0],
        depthRange: [0, 1],
        widthSegments: 1,
        heightSegments: 1,
        wireframe: false,
        createPlaneBuffer: function (points, widthSegments, heightSegments) {
            var _a = [
                points[0][0],
                points[2][0],
                points[0][1],
                points[1][1] ], startX = _a[0], endX = _a[1], startY = _a[2], endY = _a[3];
            return getPlaneBuffer(startX, endX, startY, endY, widthSegments, heightSegments);
        },
        injectShaderModules: {
            '#modules-transformZ': "\nfloat transformZ(float value, vec3 pos) {\n  return 0.0;\n}\n    ",
            '#modules-project': "\ngl_Position = u_matrix * vec4(pos.xy + vec2(u_offset, 0.0), pos.z + z, 1.0);\n    "
        }
    };
    var ScalarFill = /** @class */ (function () {
        function ScalarFill(gl, options) {
            this.gl = gl;
            if (!this.gl) {
                throw new Error('initialize error');
            }
            if (!options) {
                options = {};
            }
            this.options = __assign$1(__assign$1({}, defaultOptions$1), options);
            this.opacity = this.options.opacity || 1;
        }
        ScalarFill.prototype.updateOptions = function (options) {
            var _a;
            this.options = __assign$1(__assign$1({}, this.options), options);
            this.buildColorRamp();
            if (typeof this.options.getZoom === 'function') {
                this.setOpacity(createZoom(this.options.getZoom(), (_a = this.options.styleSpec) === null || _a === void 0 ? void 0 : _a.opacity));
            }
        };
        ScalarFill.prototype.setFillColor = function () {
            this.buildColorRamp();
        };
        ScalarFill.prototype.setOpacity = function (opacity) {
            this.opacity = opacity;
        };
        ScalarFill.prototype.handleZoom = function () {
            var _a;
            if (typeof this.options.getZoom === 'function') {
                this.setOpacity(createZoom(this.options.getZoom(), (_a = this.options.styleSpec) === null || _a === void 0 ? void 0 : _a.opacity));
            }
        };
        ScalarFill.prototype.buildColorRamp = function () {
            var _a;
            var _b = createLinearGradient([], (_a = this.options.styleSpec) === null || _a === void 0 ? void 0 : _a['fill-color']), data = _b.data, colorRange = _b.colorRange;
            if (colorRange) {
                this.colorRange = colorRange;
            }
            if (data) {
                this.colorRampTexture = createTexture(this.gl, this.gl.NEAREST, data, 16, 16);
            }
        };
        ScalarFill.prototype.initialize = function (gl) {
            var _a;
            if (!this.drawCommand) {
                if (this.options.renderForm === 'rg') {
                    this.drawCommand = new WindFill(gl, undefined, undefined, this.options.injectShaderModules);
                }
                else if (this.options.renderForm === 'r') {
                    this.drawCommand = new Fill(gl, undefined, undefined, this.options.injectShaderModules);
                }
                else {
                    console.warn('This type is not supported temporarily');
                }
            }
            this.buildColorRamp();
            if (typeof this.options.getZoom === 'function') {
                this.setOpacity(createZoom(this.options.getZoom(), (_a = this.options.styleSpec) === null || _a === void 0 ? void 0 : _a.opacity));
            }
        };
        ScalarFill.prototype.initializeVertex = function (coordinates) {
            var i = 0;
            var len = coordinates.length;
            var points = [];
            for (; i < len; i++) {
                var coords = coordinates[i];
                var mc = this.getMercatorCoordinate(coords);
                points.push([mc[0], mc[1]]);
            }
            // @ts-ignore
            var buffers = (this.options.createPlaneBuffer || defaultOptions$1.createPlaneBuffer)(points, this.options.widthSegments || 1, this.options.heightSegments || 1);
            return {
                indexes: buffers.elements.data,
                wireframeIndexes: buffers.wireframeElements.data,
                quadBuffer: createBuffer(this.gl, new Float32Array(buffers.position.data)),
                quad64LowBuffer: createBuffer(this.gl, new Float32Array(buffers.positionLow.data)),
                texCoordBuffer: createBuffer(this.gl, new Float32Array(buffers.uvs.data))
            };
        };
        ScalarFill.prototype.getTextureData = function (data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (data.type === 'image' && data.url) {
                    loadImage(data.url)
                        .then(function (image) {
                        // this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
                        var processedData = __assign$1({ width: image.width, height: image.height, texture: createTexture(_this.gl, _this.gl.LINEAR, image, image.width, image.height) }, _this.initializeVertex(data.extent));
                        if (_this.options.renderForm === 'rg') {
                            processedData.uMin = data.uMin;
                            processedData.uMax = data.uMax;
                            processedData.vMin = data.vMin;
                            processedData.vMax = data.vMax;
                        }
                        else if (_this.options.renderForm === 'r') {
                            processedData.min = data.min;
                            processedData.max = data.max;
                        }
                        else {
                            console.warn('This type is not supported temporarily');
                        }
                        resolve(processedData);
                    })["catch"](function (error) { return reject(error); });
                }
                else if (data.type === 'jsonArray' && data.data) {
                    var gfsData = data.data;
                    var pos = void 0;
                    if (data.extent) {
                        // tip: fix extent
                        pos = data.extent;
                    }
                    else {
                        pos = [
                            [gfsData[0].header.lo1, gfsData[0].header.la1],
                            [gfsData[0].header.lo1, gfsData[0].header.la2],
                            [gfsData[0].header.lo2, gfsData[0].header.la1],
                            [gfsData[0].header.lo2, gfsData[0].header.la2] ];
                    }
                    var processedData_1 = __assign$1({ width: gfsData[0].header.nx, height: gfsData[0].header.ny }, _this.initializeVertex(pos));
                    if (!_this.worker) {
                        _this.worker = new WorkerFactory();
                        _this.worker.addEventListener('message', function (_a) {
                            var payload = _a.data;
                            if (_this.options.renderForm === 'rg') {
                                processedData_1.uMin = payload[1];
                                processedData_1.uMax = payload[2];
                                processedData_1.vMin = payload[3];
                                processedData_1.vMax = payload[4];
                                processedData_1.texture = createTexture(_this.gl, _this.gl.LINEAR, new Uint8Array(payload[0]), processedData_1.width, processedData_1.height);
                            }
                            else if (_this.options.renderForm === 'r') {
                                processedData_1.min = payload[1];
                                processedData_1.max = payload[2];
                                processedData_1.texture = createTexture(_this.gl, _this.gl.LINEAR, new Uint8Array(payload[0]), processedData_1.width, processedData_1.height);
                            }
                            else {
                                console.warn('This type is not supported temporarily');
                            }
                            resolve(processedData_1);
                        });
                    }
                    if (_this.options.renderForm === 'rg') {
                        var uComp_1;
                        var vComp_1;
                        // if (("development" as string) === ('development' as string)) {
                        //   console.time('format-data');
                        // }
                        gfsData.forEach(function (record) {
                            switch (record.header.parameterCategory +
                                ',' +
                                record.header.parameterNumber) {
                                case '1,2':
                                case '2,2':
                                    uComp_1 = record;
                                    break;
                                case '1,3':
                                case '2,3':
                                    vComp_1 = record;
                                    break;
                            }
                        });
                        // @ts-ignore
                        var u = new Float32Array(uComp_1.data);
                        // @ts-ignore
                        var v = new Float32Array(vComp_1.data);
                        _this.worker.postMessage(['rg', u, v]); // TIP: 需要确定transfer是否支持多个
                    }
                    else if (_this.options.renderForm === 'r') {
                        // processedData.min = data.min;
                        // processedData.max = data.max;
                        var singleData = new Float32Array(gfsData[0].data);
                        _this.worker.postMessage(['r', singleData]);
                    }
                    else {
                        console.warn('This type is not supported temporarily');
                    }
                }
            });
        };
        ScalarFill.prototype.setData = function (data, cb) {
            var _this = this;
            if (this.gl && data) {
                // Error Prevention
                this.getTextureData(data)
                    .then(function (data) {
                    _this.data = data;
                    cb && cb(true);
                    if (_this.data) {
                        _this.initialize(_this.gl);
                    }
                    if (_this.options.triggerRepaint) {
                        _this.handleZoom();
                        _this.options.triggerRepaint();
                    }
                })["catch"](function (error) {
                    cb && cb(false);
                    console.error(error);
                });
            }
        };
        ScalarFill.prototype.getData = function () {
            return this.data;
        };
        ScalarFill.prototype.getMercatorCoordinate = function (_a) {
            var lng = _a[0], lat = _a[1];
            return [lng, lat];
        };
        ScalarFill.prototype.prerender = function () { };
        ScalarFill.prototype.render = function (matrix, offsetX, cameraParams) {
            var _a;
            if (this.data &&
                this.drawCommand &&
                this.data.texture &&
                this.colorRampTexture) {
                var opacity = this.opacity;
                var uniforms = {
                    u_opacity: isNumber$1(opacity) ? opacity : 1,
                    u_image_res: [this.data.width, this.data.height],
                    u_matrix: matrix,
                    u_offset: isNumber$1(offsetX) ? offsetX : 0,
                    u_color_ramp: this.colorRampTexture,
                    u_color_range: this.colorRange,
                    u_mapping_range: this.options.mappingRange || [0, 0]
                };
                if (cameraParams) {
                    uniforms.u_cameraEye = cameraParams.cameraEye;
                    uniforms.u_cameraEye64Low = cameraParams.cameraEye64Low;
                }
                if (this.options.renderForm === 'rg') {
                    uniforms.u_wind_min = [this.data.uMin, this.data.vMin];
                    uniforms.u_wind_max = [this.data.uMax, this.data.vMax];
                    uniforms.u_wind = this.data.texture;
                    var speeds = [
                        Math.sqrt(
                        // @ts-ignore
                        this.data.uMin * this.data.uMin + this.data.vMin * this.data.vMin),
                        Math.sqrt(
                        // @ts-ignore
                        this.data.uMin * this.data.uMin + this.data.vMax * this.data.vMax),
                        Math.sqrt(
                        // @ts-ignore
                        this.data.uMax * this.data.uMax + this.data.vMax * this.data.vMax),
                        Math.sqrt(
                        // @ts-ignore
                        this.data.uMax * this.data.uMax + this.data.vMin * this.data.vMin) ];
                    var min = 0;
                    var max = Math.max.apply(Math, speeds);
                    uniforms.u_display_range = this.options.displayRange || [min, max];
                }
                else if (this.options.renderForm === 'r') {
                    uniforms.u_range = [this.data.min, this.data.max];
                    uniforms.u_image = this.data.texture;
                    // 如果不指定，使用数据范围，并简单做一个数据 buffer
                    uniforms.u_display_range = this.options.displayRange || [
                        uniforms.u_range[0] - 1,
                        uniforms.u_range[1] + 1 ];
                }
                else {
                    console.warn('This type is not supported temporarily');
                }
                var cullFaceEnabled = this.gl.isEnabled(this.gl.CULL_FACE);
                var cullFaceMode = this.gl.getParameter(this.gl.CULL_FACE_MODE);
                this.gl.enable(this.gl.CULL_FACE);
                this.gl.cullFace(this.gl.BACK);
                var depthEnabled = this.gl.isEnabled(this.gl.DEPTH_TEST);
                this.gl.enable(this.gl.DEPTH_TEST);
                this.gl.depthMask(true);
                this.gl.depthFunc(this.gl.LEQUAL);
                if (this.options.depthRange &&
                    Array.isArray(this.options.depthRange) &&
                    this.options.depthRange.length === 2) {
                    this.gl.depthRange(this.options.depthRange[0], this.options.depthRange[1]);
                }
                else {
                    this.gl.depthRange(0.0, 1);
                }
                var data = this.options.wireframe
                    ? this.data.wireframeIndexes
                    : this.data.indexes;
                this.drawCommand
                    .active()
                    // .resize()
                    .setUniforms(uniforms)
                    .setAttributes({
                    instancePositions: {
                        buffer: this.data.quadBuffer,
                        numComponents: 3
                    },
                    instancePositions64Low: {
                        buffer: this.data.quad64LowBuffer,
                        numComponents: 3
                    },
                    a_texCoord: {
                        buffer: this.data.texCoordBuffer,
                        numComponents: 2
                    }
                })
                    .elements({
                    data: new Uint32Array(data),
                    primitive: this.options.wireframe ? this.gl.LINES : this.gl.TRIANGLES,
                    count: (_a = data) === null || _a === void 0 ? void 0 : _a.length,
                    usage: this.gl.STATIC_DRAW
                })
                    .draw();
                if (!depthEnabled) {
                    this.gl.disable(this.gl.DEPTH_TEST);
                }
                if (!cullFaceEnabled) {
                    this.gl.disable(this.gl.CULL_FACE);
                }
                this.gl.cullFace(cullFaceMode);
            }
        };
        ScalarFill.prototype.postrender = function () { };
        return ScalarFill;
    }());

    function getCoords(_a) {
        var lng = _a[0], lat = _a[1];
        var mercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat({
            lng: lng,
            lat: lat
        });
        return [mercatorCoordinate.x, mercatorCoordinate.y];
    }
    var ScalarFill$1 = /** @class */ (function () {
        function ScalarFill$1(id, data, options) {
            this.id = id;
            this.type = 'custom';
            this.renderingMode = '3d';
            this.options = __assign({}, (options || {}));
            this.data = data;
            this.handleZoom = this.handleZoom.bind(this);
        }
        ScalarFill$1.prototype.handleZoom = function () {
            if (this.scalarFill) {
                this.scalarFill.handleZoom();
            }
        };
        ScalarFill$1.prototype.initialize = function () {
            var _this = this;
            if (!this.scalarFill && this.gl) {
                this.scalarFill = new ScalarFill(this.gl, {
                    opacity: this.options.opacity,
                    renderForm: this.options.renderForm,
                    styleSpec: this.options.styleSpec,
                    displayRange: this.options.displayRange,
                    mappingRange: this.options.mappingRange,
                    widthSegments: this.options.widthSegments,
                    heightSegments: this.options.heightSegments,
                    wireframe: this.options.wireframe,
                    createPlaneBuffer: this.options.createPlaneBuffer,
                    depthRange: this.options.depthRange || [0.0, 1.0],
                    getZoom: function () { return _this.map.getZoom(); },
                    triggerRepaint: function () {
                        _this.map.triggerRepaint();
                    },
                    injectShaderModules: {
                        '#modules-transformZ': "\nconst float MATH_PI = 3.141592653589793;\nconst float earthRadius = 6371008.8;\nconst float earthCircumfrence = 2.0 * MATH_PI * earthRadius;\n\n            float latFromMercatorY(float y) {\n  float y2 = 180.0 - y * 360.0;\n  return 360.0 / MATH_PI * atan(exp(y2 * MATH_PI / 180.0)) - 90.0;\n}\n\nfloat circumferenceAtLatitude(float latitude) {\n  return earthCircumfrence * cos(latitude * MATH_PI / 180.0);\n}\n\nfloat mercatorScale(float lat) {\n  return 1.0 / cos(lat * MATH_PI / 180.0);\n}\n\nfloat transformZ(float value, vec3 pos) {\n  float mercatorY = pos.y;\n  //  float scale = circumferenceAtLatitude(latFromMercatorY(mercatorY));\n  float scale = earthCircumfrence * mercatorScale(latFromMercatorY(mercatorY));\n\n  return value / scale;\n}\n          ",
                        '#modules-project': "\ngl_Position = u_matrix * vec4(pos.xy + vec2(u_offset, 0.0), pos.z + z, pos.w);\ngl_Position.w += u_cameraEye.w;\n    "
                    }
                });
                this.scalarFill.getMercatorCoordinate = getCoords;
                this.map.on('zoom', this.handleZoom);
            }
            if (this.data) {
                this.setData(this.data);
            }
        };
        ScalarFill$1.prototype.onAdd = function (map, gl) {
            this.gl = gl;
            this.map = map;
            if (this.map) {
                this.initialize();
            }
        };
        ScalarFill$1.prototype.setData = function (data) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.data = data;
                if (_this.data && _this.scalarFill) {
                    _this.scalarFill.setData(_this.data, function (status) {
                        if (status) {
                            resolve(true);
                        }
                        else {
                            reject(false);
                        }
                    });
                }
                else {
                    resolve(false);
                }
            });
        };
        // This is called when the map is destroyed or the gl context lost.
        ScalarFill$1.prototype.onRemove = function (map) {
            delete this.gl;
            delete this.map;
            map.off('zoom', this.handleZoom);
        };
        ScalarFill$1.prototype.getWrappedWorlds = function () {
            var result = [0];
            if (this.options.wrapX) {
                // @ts-ignore
                var _a = this.map.transform, width = _a.width, height = _a.height;
                // @ts-ignore
                var utl = this.map.transform.pointCoordinate(new mapboxgl.Point(0, 0));
                // @ts-ignore
                var utr = this.map.transform.pointCoordinate(new mapboxgl.Point(width, 0));
                // @ts-ignore
                var ubl = this.map.transform.pointCoordinate(new mapboxgl.Point(width, height));
                // @ts-ignore
                var ubr = this.map.transform.pointCoordinate(new mapboxgl.Point(0, height));
                var w0 = Math.floor(Math.min(utl.x, utr.x, ubl.x, ubr.x));
                var w1 = Math.floor(Math.max(utl.x, utr.x, ubl.x, ubr.x));
                var extraWorldCopy = 1;
                for (var w = w0 - extraWorldCopy; w <= w1 + extraWorldCopy; w++) {
                    if (w === 0) {
                        continue;
                    }
                    result.push(w);
                }
            }
            return result;
        };
        ScalarFill$1.prototype.render = function (gl, matrix) {
            var cameraEye = getEye(matrix);
            var cameraEye64Low = cameraEye.map(function (item) { return fp64LowPart(item); });
            if (this.data && this.scalarFill) {
                var worlds = this.getWrappedWorlds();
                // tslint:disable-next-line:prefer-for-of
                for (var i = 0; i < worlds.length; i++) {
                    this.scalarFill.render(matrix, worlds[i], {
                        cameraEye: cameraEye,
                        cameraEye64Low: cameraEye64Low
                    });
                }
            }
        };
        return ScalarFill$1;
    }());

    var defaultConfig = {
        doubleBuffer: false,
        windOptions: defaultOptions
    };
    var WindLayer = /** @class */ (function (_super) {
        __extends(WindLayer, _super);
        function WindLayer(id, data, options) {
            if (options === void 0) { options = {}; }
            var _this = _super.call(this, id, Object.assign({}, defaultConfig, options)) || this;
            _this.field = null;
            _this.pickWindOptions();
            if (data) {
                _this.setData(data);
            }
            _this.stop = _this.stop.bind(_this);
            _this.render = _this.render.bind(_this);
            _this.handleResize = _this.handleResize.bind(_this);
            return _this;
        }
        WindLayer.prototype.onAdd = function (map) {
            _super.prototype.onAdd.call(this, map);
            if (!this.map) {
                throw new Error('map is null');
            }
            if (this.canvas !== null) {
                // this._retina = window.devicePixelRatio >= 2;
                this.render();
                this.registerEvents();
            }
        };
        WindLayer.prototype.handleResize = function () {
            if (this.canvas) {
                this.resizeCanvas(this.canvas);
            }
            this.render();
        };
        WindLayer.prototype.registerEvents = function () {
            this.map.on('resize', this.handleResize);
            this.map.on('movestart', this.stop);
            this.map.on('moveend', this.render);
            this.map.on('zoomstart', this.stop);
            this.map.on('zoomend', this.render);
            this.map.on('rotatestart', this.stop);
            this.map.on('rotateend', this.render);
            this.map.on('pitchstart', this.stop);
            this.map.on('pitchend', this.render);
        };
        WindLayer.prototype.unregisterEvents = function () {
            this.map.off('resize', this.handleResize);
            this.map.off('movestart', this.stop);
            this.map.off('moveend', this.render);
            this.map.off('zoomstart', this.stop);
            this.map.off('zoomend', this.render);
            this.map.off('rotatestart', this.stop);
            this.map.off('rotateend', this.render);
            this.map.off('pitchstart', this.stop);
            this.map.off('pitchend', this.render);
        };
        WindLayer.prototype.stop = function () {
            if (this.wind) {
                this.wind.clearCanvas();
            }
        };
        WindLayer.prototype.render = function () {
            if (!this.map)
                { return; }
            var opt = this.getWindOptions();
            if (!this.wind && this.map && this.canvas !== null) {
                var ctx = this.canvas.getContext('2d');
                if (!ctx) {
                    console.error('create canvas context failed');
                    return;
                }
                var data = this.getData();
                // @ts-ignore
                this.wind = new BaseLayer(ctx, opt, data);
                // @ts-ignore
                this.wind.project = this.project.bind(this);
                // @ts-ignore
                this.wind.unproject = this.unproject.bind(this);
                this.wind.intersectsCoordinate = this.intersectsCoordinate.bind(this);
                this.wind.postrender = function () {
                    // @ts-ignore
                    // this.setCanvasUpdated();
                };
            }
            this.wind.prerender();
            this.wind.render();
        };
        WindLayer.prototype.remove = function () {
            _super.prototype.remove.call(this);
            if (this.wind) {
                this.wind.stop();
            }
            this.unregisterEvents();
        };
        WindLayer.prototype.pickWindOptions = function () {
            var _this = this;
            Object.keys(defaultOptions).forEach(function (key) {
                if (key in _this.options) {
                    if (_this.options.windOptions === undefined) {
                        _this.options.windOptions = {};
                    }
                    // @ts-ignore
                    _this.options.windOptions[key] = _this.options[key];
                }
            });
        };
        /**
         * get wind layer data
         */
        WindLayer.prototype.getData = function () {
            return this.field;
        };
        /**
         * set layer data
         * @param data
         * @returns {WindLayer}
         */
        WindLayer.prototype.setData = function (data) {
            var _a, _b;
            if (data && data.checkFields && data.checkFields()) {
                this.field = data;
            }
            else if (isArray(data)) {
                this.field = formatData(data);
            }
            else {
                console.error('Illegal data');
            }
            (_b = (_a = this) === null || _a === void 0 ? void 0 : _a.wind) === null || _b === void 0 ? void 0 : _b.updateData(this.field);
            return this;
        };
        WindLayer.prototype.setWindOptions = function (options) {
            var beforeOptions = this.options.windOptions || {};
            this.options = assign(this.options, {
                windOptions: assign(beforeOptions, options || {})
            });
            if (this.wind) {
                var windOptions = this.options.windOptions;
                this.wind.setOptions(windOptions);
                this.wind.prerender();
            }
        };
        WindLayer.prototype.getWindOptions = function () {
            return this.options.windOptions || {};
        };
        return WindLayer;
    }(Overlay));
    //# sourceMappingURL=index.js.map

    exports.Field = Field;
    exports.ScalarFill = ScalarFill$1;
    exports.WindLayer = WindLayer;
    exports.default = WindLayer;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mapbox-wind.js.map
