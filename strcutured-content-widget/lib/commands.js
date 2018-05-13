(function (w, d, ns) {

    var html = d.getElementsByTagName('html')[0];
    var outputLog = d.getElementById('outputLog');
    var jsonInput = d.getElementById('jsonInput');
    var addCardBtn = d.getElementById('addCardBtn');
    var cardOptions = d.getElementById('cardOptions');
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

    function showCardList() {
        cardOptions.style.visibility = 'visible';
        cardOptions.focus();
    }

    function addCard(e) {
        const cardKey = e.target.getAttribute('data-attr-name');
        jsonInput.value = ns.util.prettyPrint(ns.data.cards[cardKey].content);
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
        adjustToFontSize(fontSize + 1);
    }

    function decreaseFontSize() {
        var fontSize = ns.util.getFontSize(html);
        ns.util.setFontSize(html, fontSize - 1);
        adjustToFontSize(fontSize - 1);
    }

    function adjustToFontSize(size) {
        // cardOptions.style.width = addCardBtn.clientWidth - 1 + 'px';
        cardOptions.style.top = addCardBtn.clientHeight + 'px';
    }

    ns.commands = {
        addCard: addCard,
        showCardList: showCardList,
        addMetadata: addMetadata,
        sendSC: sendSC,
        clearLog: clearLog,
        increaseFontSize: increaseFontSize,
        decreaseFontSize: decreaseFontSize
    };

})(window, document, window.structuredContentWidget = window.structuredContentWidget || {});