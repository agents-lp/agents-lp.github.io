(function (w, d, ns) {

    var html = d.getElementsByTagName('html')[0];
    var outputLog = d.getElementById('outputLog');
    var textInput = d.getElementById('textInput');
    var quickRepliesInput = d.getElementById('quickRepliesInput');

    function send() {

        var cmdName = lpTag.agentSDK.cmdNames.write;
        var data = {
            text: textInput.value,
            quickReplies: quickRepliesInput.value,
            metadata: {
                title: 'quick replies example',
            }
        };

        clearLog();

        lpTag.agentSDK.command(cmdName, data, function (err) {
            outputLog.value = err ? err : 'done';
        });
    }

    function addText() {
        textInput.value = ns.data.text;
    }

    function addQuickReplies() {
        quickRepliesInput.value = ns.util.prettyPrint(ns.data.quickReplies);
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
        addText: addText,
        addQuickReplies: addQuickReplies,
        send: send,
        clearLog: clearLog,
        increaseFontSize: increaseFontSize,
        decreaseFontSize: decreaseFontSize
    };

})(window, document, window.quickRepliesWidget = window.quickRepliesWidget || {});