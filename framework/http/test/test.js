/**
    test.js
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

var assert = require('assert'),
    http = require('http'),
    utils = require('utils'),
    forEach = utils.forEach;

// we would need caolan async!
function parallel(array, cb) {
    var pending = array.length,
        error;
    function done(err) {
        pending -= 1;
        if (err) {
            error = err;
        }
        if (pending === 0) {
            cb(err);
        }
    }
    forEach(array, function (a) {
        a(done);
    });
}

exports.run = function (test, done) {
    var tested = 0;
    // test http GET
    function testGET(cb) {
        var data = '';
        http.get(
            { path: '/testhttp' },
            function (res) {
                res.on('data', function (d) {
                    data += d;
                });
                res.on('end', function () {
                    var req = JSON.parse(data);
                    // actual tests
                    test(
                        assert.strictEqual,
                        req.method,
                        'GET'
                    );
                    test(
                        assert.strictEqual,
                        req.url,
                        '/testhttp'
                    );
                    test(
                        assert.strictEqual,
                        res.statusCode,
                        200
                    );
                    test(
                        assert.strictEqual,
                        typeof res.headers,
                        'object'
                    );
                    cb(null);
                });
                res.on('error', function (err) {
                    cb(err);
                });
            }
        );
    }
    // test http POST
    function testPOST(cb) {
        var data = '',
            r;
        r = http.request(
            { path: '/testhttp', method: 'POST' },
            function (res) {
                res.on('data', function (d) {
                    data += d;
                });
                res.on('end', function () {
                    var req = JSON.parse(data);
                    // actual tests
                    test(
                        assert.strictEqual,
                        req.method,
                        'POST'
                    );
                    test(
                        assert.strictEqual,
                        req.url,
                        '/testhttp'
                    );
                    test(
                        assert.strictEqual,
                        req.postData,
                        'abcdef'
                    );
                    cb(null);
                });
                res.on('error', function (err) {
                    cb(err);
                });
            }
        );
        r.write('abcdef');
        r.end();
    }

    // test http POST
    function testPUT(cb) {
        var data = '',
            r;
        r = http.request(
            { path: '/testhttp', method: 'PUT' },
            function (res) {
                res.on('data', function (d) {
                    data += d;
                });
                res.on('end', function () {
                    var req = JSON.parse(data);
                    // actual tests
                    test(
                        assert.strictEqual,
                        req.method,
                        'PUT'
                    );
                    test(
                        assert.strictEqual,
                        req.url,
                        '/testhttp'
                    );
                    test(
                        assert.strictEqual,
                        req.postData,
                        'abcdefg'
                    );
                    cb(null);
                });
                res.on('error', function (err) {
                    cb(err);
                });
            }
        );
        r.write('abcdefg');
        r.end();
    }


    // launch the tests
    parallel([
        testGET,
        testPOST,
        testPUT
    ], function () {
        test(
            assert.strictEqual,
            test.total,
            10
        );
        // we are done!
        done();
    });
};