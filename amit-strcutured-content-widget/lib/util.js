(function (w, d, ns) {

    function prettyPrint(jsonObj) {
        return JSON.stringify(jsonObj, null, 2);
    }

    function getFontSize(el) {
        return parseFloat(w.getComputedStyle(el, null).getPropertyValue('font-size'));
    }

    function setFontSize(el, fontSize) {
        el.style.fontSize = fontSize + 'px';
    }


    ns.util = {
        prettyPrint: prettyPrint,
        getFontSize: getFontSize,
        setFontSize: setFontSize
    };

})(window, document, window.structuredContentWidget = window.structuredContentWidget || {});