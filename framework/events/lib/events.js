/**
    event.js
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
* @private
*/
function ensureEvents(ee) {
    if (!ee.hasOwnProperty('_events')) {
        ee._events = {};
    }
    return ee._events;
}

/**
* @constructor Constructs an event emitter.
*/
function EventEmitter() {
}

/**
* Adds a listener to the emitter.
* @param {String} event The name of the event.
* @param {Function} listener The listener to add.
* @returns {EventEmitter} this.
*/
EventEmitter.prototype.addListener = function (event, listener) {
    var events = ensureEvents(this);
    if (!events[event]) {
        events[event] = listener;
    } else if (events[event] instanceof Array) {
        events[event].push(listener);
    } else {
        events[event] = [ this._events[event], listener ];
    }
    // we should check for max Events
    // we should fire an event for addListener
    this.emit('addListener', event, listener);
    return this;
};

/**
* Adds a listener to the emitter.
* @param {String} event The name of the event.
* @param {Function} listener The listener to add.
* @returns {EventEmitter} this.
*/
EventEmitter.prototype.on = EventEmitter.prototype.addListener;

/**
* Adds a one-shot listener to the emitter.
* @param {String} event The name of the event.
* @param {Function} listener The listener to add.
* @returns {EventEmitter} this.
*/
EventEmitter.prototype.once = function (event, listener) {
    var that = this;
    function onetime() {
        that.removeListener(event, onetime);
        listener.apply(this, arguments);
    }
    this.on(event, onetime);
    return this;
};

/**
* Removes a listener from the emitter.
* @param {String} event The name of the event.
* @param {Function} listener The listener to add.
* @returns {EventEmitter} this.
*/
EventEmitter.prototype.removeListener = function (event, listener) {
    var events, i, n, handlers;
    if (this._events) {
        events = this._events;
        handlers = events[event];
        if (handlers === listener) {
            delete events[event];
        } else if (handlers instanceof Array) {
            n = handlers.length;
            for (i = 0; i < n; i += 1) {
                if (handlers[i] === listener) {
                    handlers.splice(i, 1);
                    break;
                }
            }
            if (handlers.length === 0) {
                delete events[event];
            }
        }
    }
    return this;
};

/**
* Removes all listener for the specified event from the emitter.
* @param {String} event The name of the event.
* @returns {EventEmitter} this.
*/
EventEmitter.prototype.removeAllListeners = function (event) {
    if (this._events) {
        delete this._events[event];
    }
    return this;
};

/**
* Sets the maximum number of listeners on this emitter
* (not currently supported).
* @param {Number} n The maximum number of listeners.
* @returns {EventEmitter} this.
*/
EventEmitter.prototype.setMaxListeners = function (n) {
    // FIXME: NOT SUPPORTED YET (this behaves weirdly in node)
    return this;
};

/**
* Returns an array of listeners for the specified event.
* @param {String} event The event for which we want to retrieve listeners.
* @returns {Array} the listeners.
*/
EventEmitter.prototype.listeners = function (event) {
    var events = ensureEvents(this),
        ret = events[event];
    if (!ret) {
        ret = events[event] = [];
    } else if (!(ret instanceof Array)) {
        ret = events[event] = [ret];
    }
    return ret;
};

/**
* Returns an array of listeners but unlike the listeners function has no
* side effect on the _events member of the EventEmitter (listeners was coded
* to be compatible with what node does, getListeners was coded to not inflate
* _events when we query the listeners for events that have no listeners).
* @param {String} event The event for which we want to retrieve listeners.
* @returns {Array} the listeners.
*/
EventEmitter.prototype.getListeners = function (event) {
    var ret;
    if (this._events) {
        ret = this._events[event] || [];
        // buggy: what if the listener IS an array?
        if (!(ret instanceof Array)) {
            ret = [ret];
        }
    } else {
        ret = [];
    }
    return ret;
};

/**
* Emits an event. The first parameter is the name of the event. Other (optional)
* parameters are the event data.
* @param {String} event The name of the event.
* @returns {EventEmittter} this.
*/
EventEmitter.prototype.emit = function (event) {
    var events = this._events,
        ret = false,
        listeners,
        args,
        i,
        n;
    if (events) {
        listeners = events[event];
        if (listeners instanceof Array) {
            args = Array.prototype.slice.call(arguments, 1);
            n = listeners.length;
            listeners = listeners.slice(0);
            for (i = 0; i < n; i += 1) {
                listeners[i].apply(this, args);
            }
            ret = true;
        } else if (listeners) {
            listeners.apply(this, Array.prototype.slice.call(arguments, 1));
            ret = true;
        }
    }
    return ret;
};

exports.EventEmitter = EventEmitter;
