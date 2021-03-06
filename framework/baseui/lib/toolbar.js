/**
    toolbar.js
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

var visual = require('visual'),
    domvisual = require('domvisual'),
    utils = require('utils'),
    verticalmenu = require('./verticalmenu'),
    forEachProperty = utils.forEachProperty,
    isFunction = utils.isFunction;


function Toolbar(config) {
    var that = this;
    domvisual.DOMElement.call(this, config);
    // this is called by items that notify us of a change
    this.itemChanged = function () {
        var theItem = this;
        forEachProperty(that.children, function (c) {
            if (c.item === theItem) {
                that.configureItem(c);
            }
        });
    };
}
Toolbar.prototype = new (domvisual.DOMElement)();
Toolbar.prototype.getActiveTheme = visual.getGetActiveTheme(
    'baseui',
    'Toolbar'
);
Toolbar.prototype.getDescription = function () {
    return "A toolbar that will show menuitems";
};
Toolbar.createPreview = function () {
    return new (domvisual.DOMImg)({url: 'baseui/img/toolbarpreview.png'});
};
Toolbar.prototype.theme = new (visual.Theme)({
    tool: {
        basedOn: [
            // take the line styles from here
            { factory: 'baseui', type: 'Theme', style: 'tool' }
        ]
    },
    highlightedTool: {
        basedOn: [
            // take the line styles from here
            { factory: 'baseui', type: 'Theme', style: 'highlightedTool' }
        ]
    },
    grayedTool: {
        basedOn: [
            // take the line styles from here
            { factory: 'baseui', type: 'Theme', style: 'grayedTool' }
        ]
    },
    pressedTool: {
        basedOn: [
            // take the line styles from here
            { factory: 'baseui', type: 'Theme', style: 'pressedTool' }
        ]
    },
    separator: {
        basedOn: [
            { factory: 'baseui', type: 'Theme', style: 'verticalSeparator' }
        ]
    }
});

Toolbar.prototype.clearItems = function () {
    var that = this;
    forEachProperty(this.children, function (c) {
        if (c.item) {
            c.item.removeListener('change', that.itemChanged);
        }
    });
    // we want to remove all our children
    this.removeAllChildren();
    return this;
};

Toolbar.prototype.setItems = function (items) {
    this.clearItems();
    if (isFunction(items)) {
        this.getItems = items;
    } else {
        this.items = items;
    }
    this.updateChildren();
    return this;
};

/**
    Notifies a change of event.
*/

/**
    It is way easier to create something like this in HTML (because the
    automatic layouting fits this thing so well).
*/
Toolbar.prototype.updateChildren = function () {
    // we now want to iterate our items and create children for them
    var items = this.getItems(),
        item,
        i,
        l = items.length;
    for (i = 0; i < l; i += 1) {
        item = items[i];
        if (item) {
            this.createItemHtml(item, i, l);
        } else {
            this.createSeparator();
        }
    }
    return this;
};
Toolbar.prototype.createSeparator = function () {
    var c = new (domvisual.DOMElement)({style: 'separator'});
    c.setHtmlFlowing({ display: 'inline-block' });
    this.addChild(c);
    return this;
};
Toolbar.prototype.createItemHtml = function (item, index, numIndex) {
    var that = this,
        name = String(index),
        icon = item.getIcon(),
        c;
    if (icon) {
        c = new (domvisual.DOMImg)({style: 'tool', url: icon, title: item.getText()});
        this.addChild(c, name);
        c.setDimensions([32, 32, 1]);
        c.setHtmlFlowing({});
        // keep a reference to the item
        c.item = item;
        item.addListener('change', that.itemChanged);
        // is it enabled?
        this.configureItem(c);
    }
    return this;
};
Toolbar.prototype.configureItem = function (c) {
    var item = c.item;
    function getStyle() {
        if (item.getEnabled()) {
            return item.getCheckedState() ? 'highlightedTool' : 'tool';
        }
        return 'grayedTool';
    }
    function noDefault(evt) {
        evt.preventDefault();
        evt.stopPropagation();
    }
    function mouseDown(evt) {
        noDefault(evt);
        c.setStyle('pressedTool');
        c.once('mouseupc', function (evt) {
            noDefault(evt);
            // action
            item.action();
            c.setStyle(getStyle());
        });
    }
    function unhookHandlers() {
        c.removeListener('mousedown', mouseDown);
    }
    // unhook previous handlers
    if (c.unhookHandlers) {
        c.unhookHandlers();
    }
    // grayed
    if (!item.getEnabled()) {
        c.setStyle('grayedTool');
        c.setCursor(null);
    } else {
        c.setStyle(getStyle());
        c.setCursor('pointer');
        c.on('mousedown', mouseDown);
        c.unhookHandlers = unhookHandlers;
    }
    return this;
};
Toolbar.prototype.getItems = function () {
    return this.items;
};

Toolbar.prototype.getConfigurationSheet = function () {
    return { items: null };
};


exports.Toolbar = Toolbar;
