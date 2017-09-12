(function (w, d, ns) {

    var html = d.getElementsByTagName('html')[0];
    var outputLog = d.getElementById('outputLog');
    var jsonInput = d.getElementById('jsonInput');
    var metadataInput = d.getElementById('metadataInput');

    function sendSC() {

        var cmdName = lpTag.agentSDK.cmdNames.writeSC;
        var data = {
            json: jsonInput.value,
            metadata: metadataInput.value
        };

        clearLog();

        lpTag.agentSDK.command(cmdName, data, function (err) {
            outputLog.value = err ? err : 'done';
        });
    }

    function addCard() {
        jsonInput.value = ns.util.prettyPrint(ns.data.card);
    }

    function addMetadata() {
        metadataInput.value = ns.util.prettyPrint(ns.data.metadata);
    }

    function clearLog() {
        outputLog.value = '';
    }

    function increaseFontSize() {
        var fontSize = ns.util.getFontSize(html);
        ns.util.setFontSize(html, fontSize + 1);
    }

    function decreaseFontSize() {
        var fontSize = ns.util.getFontSize(html);
        ns.util.setFontSize(html, fontSize - 1);
    }


    ns.commands = {
        addCard: addCard,
        addMetadata: addMetadata,
        sendSC: sendSC,
        clearLog: clearLog,
        increaseFontSize: increaseFontSize,
        decreaseFontSize: decreaseFontSize
    };

})(window, document, window.structuredContentWidget = window.structuredContentWidget || {});