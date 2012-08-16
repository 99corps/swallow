exports.groups = {
    "TestViewer": {
        "description": "",
        "privateVisual": true,
        "privateTheme": true,
        "dimensions": [
            600,
            400,
            0
        ],
        "gridSize": 8,
        "children": {
            "pos0": {
                "factory": "domvisual",
                "type": "DOMElement",
                "config": {
                    "position": "pos0",
                    "innerText": "",
                    "style": {
                        "factory": "launcher",
                        "type": "Launcher",
                        "style": "background"
                    }
                }
            },
            "pos": {
                "factory": "domvisual",
                "type": "DOMElement",
                "config": {
                    "position": "pos",
                    "innerText": "",
                    "style": {
                        "factory": "launcher",
                        "type": "Launcher",
                        "style": "titleBar"
                    }
                }
            },
            "pos2": {
                "factory": "domvisual",
                "type": "DOMImg",
                "config": {
                    "position": "pos2",
                    "url": "testviewer/img/swallow.png"
                }
            },
            "pos3": {
                "factory": "domvisual",
                "type": "DOMElement",
                "config": {
                    "position": "pos3",
                    "innerText": "Tests",
                    "style": {
                        "factory": "launcher",
                        "type": "Launcher",
                        "style": "maintitle"
                    }
                }
            },
            "results": {
                "factory": "domvisual",
                "type": "DOMElement",
                "config": {
                    "position": "results",
                    "innerText": "",
                    "style": {
                        "factory": "launcher",
                        "type": "Launcher",
                        "style": "list"
                    }
                }
            },
            "lint": {
                "factory": "domvisual",
                "type": "DOMImg",
                "config": {
                    "position": "lint",
                    "url": "testviewer/img/lint.png"
                }
            },
            "test": {
                "factory": "domvisual",
                "type": "DOMImg",
                "config": {
                    "position": "test",
                    "url": "testviewer/img/test.png"
                }
            }
        },
        "positions": {
            "pos": {
                "matrix": {
                    "0": 600,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 48,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 1,
                    "11": 0,
                    "12": 0,
                    "13": 0,
                    "14": 0,
                    "15": 1,
                    "byteOffset": 0,
                    "byteLength": 64,
                    "length": 16,
                    "buffer": {
                        "byteLength": 64
                    }
                },
                "order": 1,
                "snapping": {
                    "left": "px",
                    "right": "px",
                    "width": "auto",
                    "top": "px",
                    "bottom": "auto",
                    "height": "px"
                }
            },
            "pos0": {
                "matrix": {
                    "0": -600,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": -400,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 1,
                    "11": 0,
                    "12": 600,
                    "13": 400,
                    "14": 0,
                    "15": 1,
                    "byteOffset": 0,
                    "byteLength": 64,
                    "length": 16,
                    "buffer": {
                        "byteLength": 64
                    }
                },
                "order": 0,
                "snapping": {
                    "left": "px",
                    "right": "px",
                    "width": "auto",
                    "top": "px",
                    "bottom": "px",
                    "height": "auto"
                }
            },
            "pos2": {
                "matrix": {
                    "0": 43.83561706542969,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 32,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 0,
                    "11": 0,
                    "12": 8,
                    "13": 8,
                    "14": 0,
                    "15": 1,
                    "byteOffset": 0,
                    "byteLength": 64,
                    "length": 16,
                    "buffer": {
                        "byteLength": 64
                    }
                },
                "order": 3,
                "snapping": {
                    "left": "px",
                    "right": "auto",
                    "width": "px",
                    "top": "px",
                    "bottom": "auto",
                    "height": "px"
                }
            },
            "pos3": {
                "matrix": {
                    "0": 104,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 32,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 1,
                    "11": 0,
                    "12": 56,
                    "13": 8,
                    "14": 0,
                    "15": 1,
                    "byteOffset": 0,
                    "byteLength": 64,
                    "length": 16,
                    "buffer": {
                        "byteLength": 64
                    }
                },
                "order": 4,
                "snapping": {
                    "left": "px",
                    "right": "auto",
                    "width": "px",
                    "top": "px",
                    "bottom": "auto",
                    "height": "px"
                }
            },
            "results": {
                "matrix": {
                    "0": 584,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 336,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 1,
                    "11": 0,
                    "12": 8,
                    "13": 56,
                    "14": 0,
                    "15": 1,
                    "byteOffset": 0,
                    "byteLength": 64,
                    "length": 16,
                    "buffer": {
                        "byteLength": 64
                    }
                },
                "order": 2,
                "snapping": {
                    "left": "px",
                    "right": "px",
                    "width": "auto",
                    "top": "px",
                    "bottom": "px",
                    "height": "auto"
                }
            },
            "lint": {
                "matrix": {
                    "0": 69.83908081054688,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 31,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 0,
                    "11": 0,
                    "12": 450.1609191894531,
                    "13": 9,
                    "14": 0,
                    "15": 1,
                    "byteLength": 64,
                    "buffer": {
                        "byteLength": 64
                    },
                    "length": 16,
                    "byteOffset": 0
                },
                "order": 5,
                "snapping": {
                    "left": "auto",
                    "right": "px",
                    "width": "px",
                    "top": "px",
                    "bottom": "auto",
                    "height": "px"
                }
            },
            "test": {
                "matrix": {
                    "0": 69.83908081054688,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 0,
                    "5": 31,
                    "6": 0,
                    "7": 0,
                    "8": 0,
                    "9": 0,
                    "10": 0,
                    "11": 0,
                    "12": 522.1609497070312,
                    "13": 9,
                    "14": 0,
                    "15": 1,
                    "byteLength": 64,
                    "buffer": {
                        "byteLength": 64
                    },
                    "length": 16,
                    "byteOffset": 0
                },
                "order": 6,
                "snapping": {
                    "left": "auto",
                    "right": "px",
                    "width": "px",
                    "top": "px",
                    "bottom": "auto",
                    "height": "px"
                }
            }
        },
        "theme": {},
        "overflowX": "visible",
        "overflowY": "visible"
    }
};

/**
    Exports all visual constructors in the specified module.
*/

exports.TestViewer = require('/testviewer/lib/TestViewer').TestViewer;

exports.TestViewer = require('/testviewer/lib/TestViewer').TestViewer;
