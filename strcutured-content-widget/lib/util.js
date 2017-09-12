(function (w, d, ns) {

    function prettyPrint(jsonObj) {
        return JSON.stringify(jsonObj, null, 2);
    }

    ns.util = {
        prettyPrint: prettyPrint
    };

})(window, document, window.structuredContentWidget = window.structuredContentWidget || {});