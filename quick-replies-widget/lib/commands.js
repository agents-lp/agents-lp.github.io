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

        // clear previous value
        contentInput.value = '';
    }

    function populateQuickReplies() {
        const quickRepliesList = [];
        for (qr in ns.data.quickReplies) {
            quickRepliesList.push('<div data-attr-name=' + qr + '>' + ns.data.quickReplies[qr].title + '</div>');
        }
        quickRepliesOptions.innerHTML = quickRepliesList.join('');
    }

    function toggleContentOptionsList() {
        if (contentOptions.style.visibility === 'visible') {
            hideContentOptionsList();
        } else {
            contentOptions.style.visibility = 'visible';
        }
    }

    function hideContentOptionsList() {
        contentOptions.style.visibility = 'hidden';
    }

    function addContent(e) {
        const contentType = e.target.getAttribute('data-attr-type');
        const contentKey = e.target.getAttribute('data-attr-name');
        if (contentType && contentKey) {
            var content = ns.data[contentType][contentKey].content;
            contentInput.value = contentType === 'json' ? ns.util.prettyPrint(content) : content;
        }
        hideContentOptionsList();
    }

    function toggleQuickRepliesList() {
        if (quickRepliesOptions.style.visibility === 'visible') {
            hideQuickRepliesList();
        } else {
            quickRepliesOptions.style.visibility = 'visible';
        }
    }

    function hideQuickRepliesList() {
        quickRepliesOptions.style.visibility = 'hidden';
    }

    function addQuickReplies(e) {
        const quickRepliesKey = e.target.getAttribute('data-attr-name');
        if (quickRepliesKey) {
            quickRepliesInput.value = ns.util.prettyPrint(ns.data.quickReplies[quickRepliesKey].content);
        }
        hideQuickRepliesList();
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
        toggleContentOptionsList: toggleContentOptionsList,
        addContent: addContent,
        toggleQuickRepliesList: toggleQuickRepliesList,
        addQuickReplies: addQuickReplies,
        send: send,
        clearLog: clearLog,
        increaseFontSize: increaseFontSize,
        decreaseFontSize: decreaseFontSize
    };

})(window, document, window.quickRepliesWidget = window.quickRepliesWidget || {});