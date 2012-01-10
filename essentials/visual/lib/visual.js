/**
    visual.js
    
    Copyright (c) Hugo Windisch 2012 All Rights Reserved
*/

/**
Thinking
========
- I don't want something big but I want to be able to graphically deal with
graphical stuff.

- I don't want to be a dom manipulation framework. Somehow, people should be
able to use the one they like. But, often web frameworks deal with component
loading and for this I want to stick to CommonJS packages & modules. So there
are clashing elements.

- Positioning is an element of skinning that is somehow different (in terms
of human manipulation of elements)


- Maybe ids are good enough

- user data vs container: the dom is shared by many components. Components
may want to have userdata.

Features I want:
----------------
* Theming: wellknown styles that apply to all components of a set (this could
work with multiple classes)

* Skinning should be done through css (css style)


1. type of 'box', just like in html, the element.


==============
If I could use the same model for canvas, webgl, and html (i.e. see the dom
as an output format)

... th

The first level of abstraction has in fact nothing to do with html.
It is an abstraction of graphic elements that need to refreshs themselves
=========================================================================
---------------
Visual()
Position()
Event()
Dirt()

The second level of abstraction is the html thing (it has to do with
implementing a visual on top of the DOM)

Then we could implement a visual on top of a canvas (other libray)

A position can be a named position inside our parent or an unmanaged position.

*/

var forAllProperties = require('./utils').forAllProperties,
    dirty = require('./dirty'),
    setDirty = dirty.setDirty;

function setContainmentDepth(v, depth) {
    v.containmentDepth = depth;
    if (v.children) {
        forAllProperties(v.children, function (c) {
            // sets the containment depth of the children
            setContainmentDepth(c, depth + 1);
        });
    }
}

/**
    A visual.
    A visual can contain other visuals.
    It has a position.
    It can render itself in its container (DOM, canvas, webgl)
*/
function Visual() {
    this.containmentDepth = -1;
    this.container = null;
}
Visual.prototype.getSize = function () {
};
Visual.prototype.setPosition = function (position) {
    this.position = position;
    setDirty(this);
};

Visual.prototype.addChild = function (child, name) {
    if (child.parent) {
        child.parent.removeChild(child);
    }
    if (this.children === undefined) {
        this.children = {};
    }
    this.children[name] = child;
    child.name = name;
    setContainmentDepth(child, this.containmentDepth + 1);
    setDirty(child);
};
Visual.prototype.removeChild = function (child) {
    // we become a container
    if (child.parent === this) {
        delete this.children[child.name];
        // you only have a name inside a parent
        delete child.name;
        // we must remove it from our array of children
        // stay light
        if (this.numChildren === 0) {
            delete this.children;
            delete this.numChildren;
        }
        child.parent = null;
        setContainmentDepth(child, -1);
    }
};
/**
    Called to update the visual part.
*/
Visual.prototype.update = function () {
};

/**
    Creates multiple children from a description like:
*/
Visual.prototype.createChildren = function (info) {
    var that = this;
    forAllProperties(info.items, function (it, name) {
        var v = it.visual;
        that.addChild(
            require(v.factory).createVisual(v.type, v.data),
            name
        );
    });
};

/**
    Layouts multiple children.
*/



// export all what we want to export for the module
exports.Visual = Visual;
exports.createVisual = function (type, data) {
    if (type === 'visual') {
        return new Visual();
    }
};
exports.getVisualNames = function () {
    return [ 'visual' ];
};

