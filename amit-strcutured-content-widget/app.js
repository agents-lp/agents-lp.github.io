(function (w, d, ns) {
    
    var sendBtn = d.getElementById('sendBtn');
    var addCardBtn = d.getElementById('addCardBtn');
    var addQuickRepliesBtn = d.getElementById('addQuickRepliesBtn');
    var addMetadataBtn = d.getElementById('addMetadataBtn');
    var cardOptions = d.getElementById('cardOptions');
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

    function render() {
        const cardList = [];
        for (card in ns.data.cards) {
            cardList.push('<div data-attr-name=' + card + '>' + ns.data.cards[card].title + '</div>');
        }
        cardOptions.innerHTML = cardList.join('');
        cardOptions.onblur = function() {  cardOptions.style.visibility = 'hidden'; };

        const quickRepliesList = [];
        for (qr in ns.data.quickReplies) {
            quickRepliesList.push('<div data-attr-name=' + qr + '>' + ns.data.quickReplies[qr].title + '</div>');
        }
        quickRepliesOptions.innerHTML = quickRepliesList.join('');
        quickRepliesOptions.onblur = function() {  quickRepliesOptions.style.visibility = 'hidden'; };
    }

    function init() {
        bindCommand(sendBtn, 'sendSC');
        bindCommand(addCardBtn, 'showCardList');
        bindCommand(cardOptions, 'addCard');
        bindCommand(addQuickRepliesBtn, 'showQuickRepliesList');
        bindCommand(quickRepliesOptions, 'addQuickReplies');
        bindCommand(addMetadataBtn, 'addMetadata');
        bindCommand(clearLogBtn, 'clearLog');
        bindCommand(increaseFontSizeBtn, 'increaseFontSize');
        bindCommand(decreaseFontSizeBtn, 'decreaseFontSize');

        render();

        initSdk();
    }


    init();

})(window, document, window.structuredContentWidget = window.structuredContentWidget || {});