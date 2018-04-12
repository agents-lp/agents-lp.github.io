(function (w, d, ns) {

    var sendBtn = d.getElementById('sendBtn');
    var addTextBtn = d.getElementById('addTextBtn');
    var addQuickRepliesBtn = d.getElementById('addQuickRepliesBtn');
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

        bindCommand(sendBtn, 'send');
        bindCommand(addTextBtn, 'addText');
        bindCommand(addQuickRepliesBtn, 'addQuickReplies');
        bindCommand(clearLogBtn, 'clearLog');
        bindCommand(increaseFontSizeBtn, 'increaseFontSize');
        bindCommand(decreaseFontSizeBtn, 'decreaseFontSize');

        initSdk();
    }


    init();

})(window, document, window.quickRepliesWidget = window.quickRepliesWidget || {});