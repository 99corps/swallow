/**
    utils.js
    Copyright (C) 2012 Hugo Windisch

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.
*/

/**
* Returns the type of a vlue, correctly distinguishing between object and array.
* @param {any} value The value we want to inspect.
* @returns {String} The type of the value.
*/
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (value instanceof Array) {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}

/**
* Returns true if is is a string.
* @param {any} s The value to inspect.
* @returns {String} true if s is a string.
*/
function isString(s) {
    return typeOf(s) === 'string';
}

/**
* Returns true if is is a number.
* @param {any} n The value to inspect.
* @returns {String} true if s is a number.
*/
function isNumber(n) {
    return typeOf(n) === 'number';
}

/**
* Returns true if is is an array.
* @param {any} a The value to inspect.
* @returns {String} true if s is an array.
*/
function isArray(a) {
    return typeOf(a) === 'array';
}

/**
* Returns true if is is an object.
* @param {any} o The value to inspect.
* @returns {String} true if s is an object.
*/
function isObject(o) {
    return typeOf(o) === 'object';
}

/**
* Returns true if is is a function.
* @param {any} f The value to inspect.
* @returns {String} true if s is a function.
*/
function isFunction(f) {
    return typeOf(f) === 'function';
}

/**
* Enumerates the object calling f for each (value, name) pair.
* @param {Ojbect} object The object to iterate.
* @param {Function} f The callback to call for each (value, name) pair.
*/
function forEachProperty(object, f) {
    var p;
    if (object) {
        for (p in object) {
            if (object.hasOwnProperty(p)) {
                f(object[p], p, object);
            }
        }
    }
}

/**
* Enumerates the object calling f for each (value, name) pair in sorted
* order of name.
* @param {Ojbect} object The object to iterate.
* @param {Function} f The callback to call for each (value, name) pair.
* @param {Function} optionalSortFunction An optional sorting function.
*/

function forEachSortedProperty(object, f, optionalSortFunction) {
    var a = [],
        l,
        i,
        n;
    function cmp(n1, n2) {
        return n1 > n2;
    }
    optionalSortFunction = optionalSortFunction || cmp;
    forEachProperty(object, function (p, name) {
        a.push(name);
    });
    l = a.length;
    if (l > 0) {
        a.sort(cmp);
        for (i = 0; i < l; i += 1) {
            n = a[i];
            f(object[n], n);
        }
    }
}

/**
* Enumerates the array calling f for each (value, index) pair.
* @param {Ojbect} array The array to iterate.
* @param {Function} f The callback to call for each (value, index) pair.
*/
function forEach(array, f) {
    var l = array.length, i;
    for (i = 0; i < l; i += 1) {
        f(array[i], i, array);
    }
}

/**
* Returns a deep copy of object o.
* @param {any} o The object (or value) to copy.
* @returns A copy of the value.
*/
function deepCopy(o) {
    var res, i, l, v;
    switch (typeOf(o)) {
    case 'object':
        res = {};
        forEachProperty(o, function (p, n) {
            res[n] = deepCopy(p);
        });
        return res;
    case 'array':
        res = [];
        l = o.length;
        for (i = 0; i < l; i += 1) {
            v = o[i];
            if (v !== undefined) {
                res[i] = deepCopy(v);
            }
        }
        return res;
    default:
        return o;
    }
}

/**
* Copies all property of from to to
* @param {Object} from The from object.
* @param {Object} to The to object.
*/
function apply(to, from) {
    forEachProperty(from, function (v, n) {
        to[n] = v;
    });
    return to;
}

/**
* Copies all property of from to to by calling deepCopy on all copied values.
* @param {Object} from The from object.
* @param {Object} to The to object.
*/
function applyDeep(to, from) {
    forEachProperty(from, function (v, n) {
        to[n] = deepCopy(v);
    });
    return to;
}

/**
* Recursively removes undefined an null properties from an object.
* @param {Object} o The object to prune.
* @returns {Number} The number of remaining properties in o
*/
function prune(o) {
    var n = 0;
    forEachProperty(o, function (p, name) {
        var empty;
        if (isObject(p)) {
            if (!prune(p)) {
                empty = true;
            }
        } else if (p === null || p === undefined) {
            empty = true;
        }
        if (empty) {
            delete o[name];
        } else {
            n += 1;
        }
    });
    return n;
}

/**
* ensure(o, 'a', 'b', 'c') will make sure o.a.b.c exists and return it
* @returns The modified object.
*/
function ensure(o) {
    var l = arguments.length, i, n, nextO;
    for (i = 1; i < l; i += 1) {
        n = String(arguments[i]);
        if (!o.hasOwnProperty(n)) {
            o = o[n] = {};
        } else {
            o = o[n];
        }
    }
    return o;
}

/**
* ensure(o, 'a', 'b', 'c') will make sure o.a.b.c exists and return it
* @returns The found value or null
*/
function ensured(o) {
    var l = arguments.length, i, n, nextO;
    for (i = 1; i < l; i += 1) {
        n = String(arguments[i]);
        if (!o.hasOwnProperty(n)) {
            return null;
        } else {
            o = o[n];
        }
    }
    return o;
}

/**
* Limits the range of a number.
* @param {Number} n The number to modify
* @param {Number} minN The minimum value of n.
* @param {Number} maxN The maximum value of n.
* @param {Number} ifNaN The value to use if isNaN(n).
* @returns {Number} The limited number.
*/
function limitRange(n, minN, maxN, ifNaN) {
    n = Number(n);
    if (isNaN(n)) {
        n = (ifNaN === undefined) ? minN : ifNaN;
    } else if (n < minN) {
        n = minN;
    } else if (n > maxN) {
        n = maxN;
    }
    return n;
}

exports.forEachProperty = forEachProperty;
exports.forEachSortedProperty = forEachSortedProperty;
exports.forEach = forEach;
exports.typeOf = typeOf;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.deepCopy = deepCopy;
exports.limitRange = limitRange;
exports.applyDeep = applyDeep;
exports.apply = apply;
exports.prune = prune;
exports.ensure = ensure;
exports.ensured = ensured;
