(function (ns) {

    var card = {
        "type": "vertical",
        "elements": [
            {
                "type": "image",
                "url": "https://cdn.bgr.com/2016/08/iphone-8-concept.jpg",
                "tooltip": "image tooltip",
                "click": {
                    "actions": [
                        {
                            "type": "navigate",
                            "name": "Navigate to store via image",
                            "lo": 23423423,
                            "la": 2423423423
                        }
                    ]
                }
            },
            {
                "type": "text",
                "text": "IPhone 8",
                "tooltip": "brand new iphone 8",
                "style": {
                    "bold": true,
                    "size": "large"
                }
            },
            {
                "type": "text",
                "text": "Now on sale!"
            },
            {
                "type": "text",
                "text": "$155.99",
                "tooltip": "155.99"
            },
            {
                "type": "button",
                "title": "Add to cart",
                "click": {
                    "actions": [
                        {
                            "type": "link",
                            "name": "add to cart",
                            "uri": "http://www.google.com"
                        }
                    ]
                }
            },
            {
                "type": "horizontal",

                "elements": [
                    {
                        "type": "button",
                        "title": "Buy",
                        "tooltip": "store is the thing",
                        "click": {
                            "actions": [
                                {
                                    "type": "navigate",
                                    "name": "Navigate to store",
                                    "lo": 23423423,
                                    "la": 2423423423
                                }
                            ]
                        }
                    },
                    {
                        "type": "button",
                        "title": "Find",
                        "tooltip": "store is the thing",
                        "click": {
                            "actions": [
                                {
                                    "type": "navigate",
                                    "name": "Navigate to store",
                                    "lo": 23423423,
                                    "la": 2423423423
                                }
                            ]
                        }
                    }
                ]
            },
            {
                "type": "button",
                "title": "Navigate to store",
                "tooltip": "store is the thing",
                "click": {
                    "actions": [
                        {
                            "type": "navigate",
                            "name": "Navigate to store",
                            "lo": 23423423,
                            "la": 2423423423
                        }
                    ]
                }
            },
            {
                "type": "button",
                "title": "More details",
                "click": {
                    "actions": [
                        {
                            "type": "link",
                            "uri": "http://www.google.com",
                            "name": "open browser"
                        }
                    ]
                }
            }
        ]
    };

    var metadata = [
        {
            "type": "ExternalId",
            "id": "123456789"
        }
    ];


    ns.data = {
        card: card,
        metadata: metadata
    };

})(window.structuredContentWidget = window.structuredContentWidget || {});
