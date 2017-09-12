(function (w, d, ns) {

    var sendBtn = d.getElementById('sendBtn');
    var addCardBtn = d.getElementById('addCardBtn');
    var addMetadataBtn = d.getElementById('addMetadataBtn');
    var clearLogBtn = d.getElementById('clearLogBtn');

    function bindCommand(el, cmd) {
        el.addEventListener('click', ns.commands[cmd]);
    }

    function initSdk() {
        lpTag.agentSDK.init({});
    }

    function init() {

        bindCommand(sendBtn, 'sendSC');
        bindCommand(addCardBtn, 'addCard');
        bindCommand(addMetadataBtn, 'addMetadata');
        bindCommand(clearLogBtn, 'clearLog');

        initSdk();
    }


    init();

})(window, document, window.structuredContentWidget = window.structuredContentWidget || {});