(function (w, d, ns) {

    var html = d.getElementsByTagName('html')[0];
    var contentOptions = d.getElementById('contentOptions');
    var outputLog = d.getElementById('outputLog');
    var contentInput = d.getElementById('contentInput');
    var quickRepliesInput = d.getElementById('quickRepliesInput');
    var quickRepliesOptions = d.getElementById('quickRepliesOptions');
    var contentTypeJson = d.getElementById('json');

    function send() {
        if (!contentInput.value || contentInput.value === '') {
            return;
        }

        var contentType = contentTypeJson && contentTypeJson.checked ? 'json' : 'text';
        var cmdName = contentType === 'text' ? lpTag.agentSDK.cmdNames.write : lpTag.agentSDK.cmdNames.writeSC;
        var data = {
            quickReplies: quickRepliesInput.value,
        };
        data[contentType] = contentInput.value;

        clearLog();

        lpTag.agentSDK.command(cmdName, data, function (err) {
            outputLog.value = err ? err : 'done';
        });
    }

    function changeContentType(e) {
        populateContentListByType(e.target.id);
    }

    function populateContentListByType(type) {
        const contentList = [];
        for (c in ns.data[type]) {
            contentList.push('<div data-attr-type=' + type + ' data-attr-name=' + c + '>' + ns.data[type][c].title + '</div>');
        }
        contentOptions.innerHTML = contentList.join('');
        contentOptions.onblur = function() { contentOptions.style.visibility = 'hidden'; };

        // clear previous value
        contentInput.value = '';
    }

    function populateQuickReplies() {
        const quickRepliesList = [];
        for (qr in ns.data.quickReplies) {
            quickRepliesList.push('<div data-attr-name=' + qr + '>' + ns.data.quickReplies[qr].title + '</div>');
        }
        quickRepliesOptions.innerHTML = quickRepliesList.join('');
        quickRepliesOptions.onblur = function() { quickRepliesOptions.style.visibility = 'hidden'; };
    }

    function showContentOptionsList() {
        contentOptions.style.visibility = 'visible';
        contentOptions.focus();
    }

    function addContent(e) {
        const contentType = e.target.getAttribute('data-attr-type');
        const contentKey = e.target.getAttribute('data-attr-name');
        if (contentType && contentKey) {
            var content = ns.data[contentType][contentKey].content;
            contentInput.value = contentType === 'json' ? ns.util.prettyPrint(content) : content;
        }
    }

    function showQuickRepliesList() {
        quickRepliesOptions.style.visibility = 'visible';
        quickRepliesOptions.focus();
    }

    function addQuickReplies(e) {
        const quickRepliesKey = e.target.getAttribute('data-attr-name');
        if (quickRepliesKey) {
            quickRepliesInput.value = ns.util.prettyPrint(ns.data.quickReplies[quickRepliesKey].content);
        }
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
        populateQuickReplies: populateQuickReplies,
        changeContentType: changeContentType,
        populateContentListByType: populateContentListByType,
        showContentOptionsList: showContentOptionsList,
        addContent: addContent,
        showQuickRepliesList: showQuickRepliesList,
        addQuickReplies: addQuickReplies,
        send: send,
        clearLog: clearLog,
        increaseFontSize: increaseFontSize,
        decreaseFontSize: decreaseFontSize
    };

})(window, document, window.quickRepliesWidget = window.quickRepliesWidget || {});