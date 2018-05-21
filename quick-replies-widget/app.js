(function (w, d, ns) {

    var sendBtn = d.getElementById('sendBtn');
    var textRadioChosen = d.getElementById('text');
    var jsonRadioChosen = d.getElementById('json');
    var selectContentBtn = d.getElementById('selectContentBtn');
    var contentOptions = d.getElementById('contentOptions');
    var selectQuickRepliesBtn = d.getElementById('selectQuickRepliesBtn');
    var quickRepliesOptions = d.getElementById('quickRepliesOptions');
    var clearLogBtn = d.getElementById('clearLogBtn');
    var increaseFontSizeBtn = d.getElementById('increaseFontSizeBtn');
    var decreaseFontSizeBtn = d.getElementById('decreaseFontSizeBtn');

    function bindCommand(el, cmd) {
        el.addEventListener('click', ns.commands[cmd]);
    }

    function initSdk() {
        lpTag.agentSDK.init({});
    }

    function init() {

        ns.commands.populateContentListByType('text');
        ns.commands.populateQuickReplies();

        bindCommand(sendBtn, 'send');
        bindCommand(textRadioChosen, 'changeContentType');
        bindCommand(jsonRadioChosen, 'changeContentType');
        bindCommand(selectContentBtn, 'showContentOptionsList');
        bindCommand(contentOptions, 'addContent');
        bindCommand(selectQuickRepliesBtn, 'showQuickRepliesList');
        bindCommand(quickRepliesOptions, 'addQuickReplies');
        bindCommand(clearLogBtn, 'clearLog');
        bindCommand(increaseFontSizeBtn, 'increaseFontSize');
        bindCommand(decreaseFontSizeBtn, 'decreaseFontSize');

        initSdk();
    }


    init();

})(window, document, window.quickRepliesWidget = window.quickRepliesWidget || {});