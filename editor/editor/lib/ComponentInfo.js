/**
    ComponentInfo.js
    Copyright (c) Hugo Windisch 2012 All Rights Reserved
*/
var visual = require('visual'),
    domvisual = require('domvisual'),
    groups = require('./definition').definition.groups,
    glmatrix = require('glmatrix'),
    mat4 = glmatrix.mat4,
    vec3 = glmatrix.vec3;

function ComponentInfo(config) {
    // call the baseclass
    domvisual.DOMElement.call(this, config, groups.ComponentInfo);
}
ComponentInfo.prototype = new (domvisual.DOMElement)();
ComponentInfo.prototype.getConfigurationSheet = function () {
    return { typeInfo: {} };
};
ComponentInfo.prototype.init = function (editor) {
    var viewer = editor.getViewer(),
        children = this.children;

    function updateDoc() {
        var group = viewer.getGroup(),
            documentData = group.documentData,
            gridSize = Number(children.grid.getValue());
        if (isNaN(gridSize)) {
            gridSize = 8;
        } else if (gridSize > 64) {
            gridSize = 64;
        } else if (gridSize < 2) {
            gridSize = 2;
        }
        group.doCommand(group.cmdSetComponentProperties(
            [children.w.getText(), children.h.getText(), 1],
            children.description.getText(),
            children.privateCheck.getChecked(),
            gridSize
        ));
    }

    function updateControls() {
        var group = viewer.getGroup(),
            documentData = group.documentData;
        children.w.setText(documentData.dimensions[0]);
        children.h.setText(documentData.dimensions[1]);
        children.description.setText(documentData.description);
        children.privateCheck.setChecked(documentData.private === true);
        children.grid.setValue(documentData.gridSize);
    }

    children.w.on('change', updateDoc);
    children.h.on('change', updateDoc);
    children.description.on('change', updateDoc);
    children.privateCheck.on('change', updateDoc);
    children.grid.on('change', updateDoc);
    viewer.on('updateSelectionControlBox', updateControls);
    updateControls();
};

exports.ComponentInfo = ComponentInfo;
