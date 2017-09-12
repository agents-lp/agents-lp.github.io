(function (w, d, ns) {

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


    ns.commands = {
        addCard: addCard,
        addMetadata: addMetadata,
        sendSC: sendSC,
        clearLog: clearLog
    };

})(window, document, window.structuredContentWidget = window.structuredContentWidget || {});