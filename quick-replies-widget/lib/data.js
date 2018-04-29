(function (ns) {

    var quickRepliesSchemaInstance = {
        "type": "quickReplies",
        "itemsPerRow": 5,
        "replies": [
            {
                "type": "button",
                "tooltip": "Macaron",
                "title": "Macaron",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Macaron"
                        }
                    ],
                    "actions": [
                        {
                            "type": "publishText",
                            "text": "Macaron"
                        },
                        {
                            "type": "navigate",
                            "lo": 23423423,
                            "la": 2423423423
                        }
                    ]
                },
                "style": {
                    "color": "#fff",
                    "border-color": "lightpink",
                    "background-color": "lightpink",
                    "bold": true
                }
            },
            {
                "type": "button",
                "title": "Krumiri"
            },
            {
                "type": "button",
                "tooltip": "Churro",
                "title": "Churro",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Churro"
                        }
                    ],
                    "actions": [
                        {
                            "type": "publishText",
                            "text": "Churro"
                        }
                    ]
                },
                "style": {
                    "color": "#fff",
                    "border-color": "gold",
                    "background-color": "gold",
                    "border-radius": 0,
                    "bold": true
                }
            },
            {
                "type": "button",
                "tooltip": "Alfajor",
                "title": "Alfajor",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Alfajor"
                        }
                    ],
                    "actions": [
                        {
                            "type": "publishText",
                            "text": "Alfajor"
                        }
                    ]
                }
            },
            {
                "type": "button",
                "tooltip": "Pig's ears",
                "title": "Pig's ears",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Pig's ears"
                        }
                    ],
                    "actions": [
                        {
                            "type": "publishText",
                            "text": "Pig's ears"
                        }
                    ]
                },
                "style": {
                    "color": "#fff",
                    "border-color": "skyblue",
                    "background-color": "skyblue",
                    "bold": true
                }
            },
            {
                "type": "button",
                "tooltip": "Amaretti di Saronno",
                "title": "Amaretti di Saronno",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Amaretti di Saronno"
                        }
                    ],
                    "actions": [
                        {
                            "type": "publishText",
                            "text": "Amaretti di Saronno"
                        }
                    ]
                },
                "style": {
                    "color": "darkgreen",
                    "bold": true,
                    "italic": true
                }
            },
            {
                "type": "button",
                "tooltip": "Stroopwafel",
                "title": "Stroopwafel",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Stroopwafel"
                        }
                    ],
                    "actions": [
                        {
                            "type": "publishText",
                            "text": "Stroopwafel"
                        }
                    ]
                },
                "style": {
                    "color": "#fff",
                    "border-color": "#d17813",
                    "background-color": "#d17813",
                    "italic": true
                }
            },
            {
                "type": "button",
                "tooltip": "Coyotas",
                "title": "Coyotas",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Coyotas"
                        }
                    ],
                    "actions": [
                        {
                            "type": "publishText",
                            "text": "Coyotas"
                        }
                    ]
                },
                "style": {
                    "size": "large"
                }
            },
            {
                "type": "button",
                "tooltip": "Gingerbread",
                "title": "Gingerbread",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Gingerbread"
                        }
                    ],
                    "actions": [
                        {
                            "type": "navigate",
                            "lo": 23423423,
                            "la": 2423423423
                        }
                    ]
                },
                "style": {
                    "color": "#fff",
                    "border-color": "brown",
                    "background-color": "brown",
                    "bold": true
                }
            },
            {
                "type": "button",
                "tooltip": "Ghoriba",
                "title": "Ghoriba",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Ghoriba"
                        }
                    ],
                    "actions": [
                        {
                            "type": "publishText",
                            "text": "Ghoriba"
                        }
                    ]
                }
            },
            {
                "type": "button",
                "tooltip": "Snickerdoodle",
                "title": "Snickerdoodle",
                "click": {
                    "metadata": [
                        {
                            "type": "ExternalId",
                            "id": "Snickerdoodle"
                        }
                    ],
                    "actions": [
                        {
                            "type": "navigate",
                            "lo": 23423423,
                            "la": 2423423423
                        }
                    ]
                },
                "style": {
                    "color": "saddlebrown",
                    "border-color": "saddlebrown",
                    "border-radius": 4,
                    "size": "small",
                    "bold": true
                }
            }
        ]
    };

    ns.data = {
        text: 'hiya, which cookie do you like best?',
        quickReplies: quickRepliesSchemaInstance,
    };

})(window.quickRepliesWidget = window.quickRepliesWidget || {});
