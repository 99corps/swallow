/**
    doxhtml.js
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
var utils = require('utils'),
    forEach = utils.forEach;

/*!
* transforms the tags array to an object
*/
function filterTags(tags) {
    var res = {};
    forEach(tags, function (t) {
        var n = t.type;
        if (res[n]) {
            res[n].push(t);
        } else {
            res[n] = [t];
        }
    });
    return res;
}

/**
* Converts a json generated by dox to some html. This is a poor man's solution
* to my current help problems.
* @param {String} json The dox json to convert
* @returns {String} an html.
*/
function jsonToHtml(json) {
    var html = '',
        packageName;
    // FIXME: I don't currently have a template solution that works on the
    // client side (porting jqtpl, or dust, or take a look at mustache or
    // I don't know)

    // do package documentation
    forEach(json, function (item) {
        var ctx = item.ctx,
            descr = item.description,
            params = [],
            tags = item.tags || [],
            fname,
            disp,
            txt;
        if (!ctx && tags.length > 0 && tags[0].type === 'package') {
            packageName = tags[0].string;
            html += '<h1>Package: ' + tags[0].string + '</h1>';
            html += descr.full;
            html += '<hr>';
        }
    });
    // do functions
    forEach(json, function (item) {
        var ctx = item.ctx,
            descr = item.description,
            params = [],
            tags = item.tags || [],
            fTags = filterTags(tags),
            memberOf,
            fname,
            disp,
            txt;
        if (ctx &&
                (ctx.type === 'function' || ctx.type === 'method') &&
                !item.isPrivate &&
                !item.ignore) {
            // determine the memberOf thing
            memberOf = ctx.receiver || ctx.constructor;
            if (fTags.memberOf) {
                if (fTags.memberOf[0].parent) {
                    memberOf = fTags.memberOf[0].parent;
                }
            }
            // extract all the parameters
            forEach(item.tags, function (t) {
                if (t.type === 'param') {
                    params.push(t);
                }
            });
            // display the function name
            fname = ctx.name;
            if (memberOf && memberOf !== packageName) {
                fname = memberOf + '.' + fname;
            }
            html += '<h1>' + fname + '(';
            if (params.length > 0) {
                forEach(params, function (p, i) {
                    html += p.name;
                    if (i !== params.length - 1) {
                        html += ', ';
                    }
                });
            }
            html += ')</h1>';
            // display the description
            if (descr) {
                txt = descr.full || descr.summary;
                if (txt) {
                    html += '<h2>Description</h2>';
                    html += '<p>' + txt + '</p>';
                }
            }
            // display the parameters
            disp = false;
            forEach(item.tags, function (t) {
                if (t.type === 'param') {
                    if (!disp) {
                        html += '<h2>Parameters</h2>';
                        disp = true;
                    }
                    html += '<b>' +
                        t.name + '</b> (' +
                        t.types[0] + ') : ' +
                        t.description + '</p>';
                }
            });
            // display the return value
            disp = false;
            forEach(item.tags, function (t) {
                if (t.type === 'returns') {
                    if (!disp) {
                        html += '<h2>Returns</h2>';
                        disp = true;
                    }
                    html += '<p>';
                    if (fTags.type) {
                        html += '<b>(' + fTags.type[0].types.join(', ') + ')</b> ';
                    }
                    html += t.string + '</p>';

                }
            });
            html += '<hr>';
        }
    });
    return html;
}

exports.jsonToHtml = jsonToHtml;
