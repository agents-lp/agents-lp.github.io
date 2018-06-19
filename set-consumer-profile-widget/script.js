var myTimer;
var searchKey = '';
var bindingObject = {};

window.lpTag = window.lpTag || {};
lpTag.taglets = lpTag.taglets || {};
var SDK = lpTag.agentSDK || {};

$(function () {
    SDK.init({
        notificationCallback: getLogFunction('INFO', 'Notification received!'),
        visitorFocusedCallback: getLogFunction('INFO', 'Visitor Focused received!'),
        visitorBlurredCallback: getLogFunction('INFO', 'Visitor Blurred received!')
    });

    SDK.get('visitorInfo.visitorId', getIdSuccess, getIdError);
    function getIdSuccess(data) {
        $("#userId").text(data);
        getLogFunction('INFO', 'Get success!')(data);
    }
    function getIdError(err) {
        $("#userId").val("An error occurd trying to get the consumer's id");
        getLogFunction('ERROR', 'Error in get!')(err);
    }
    SDK.get('visitorInfo.visitorName', getNameSuccess, getNameError);
    function getNameSuccess(data) {
        $("#userName").text(data);
        getLogFunction('INFO', 'Get success!')(data);
    }
    function getNameError(err) {
        $("#userName").val("An error occurd trying to get the consumer's name");
        getLogFunction('ERROR', 'Error in get!')(err);
    }
});


function getLogFunction(type, message) {
    return function (data) {
        if (typeof data === 'object' && (data.message || data.error)) {
            data = data.message || data.error;
        }
        logger(type, message + ' The ' + type + ' data: ' + data);
    };
}

function logger(type, text) {
    if (typeof text === 'object') {
        text = JSON.stringify(text, null, 2);
    }
    var area = $(".logger textarea");
    area.val(new Date().toTimeString() + ":  " + type + " - " + text + '\n' + area.val());
}

function onUpdateClicked() {
    var reqObj = {};
    $("input.details").each((index, listItem) => {
        var $item = $(listItem);
        if (!$item.hasClass('ignore') &&
            ($item.val() || $item.hasClass('include-empty-string'))) {
            reqObj[$item.attr('detail')] = $item.val();
        }
    });
    $(".logger textarea").val('Sent setConsumerProfile: ' + JSON.stringify(reqObj, null, 2));
    SDK.setConsumerProfile(reqObj, onSuccess, onError);

    function onError(err) {
        $("#result").text(err).addClass("error").removeClass('success');
        getLogFunction('ERROR', 'Error in setConsumerProfile!')(err);
    }
    function onSuccess() {
        $("#result").text('success').addClass("success").removeClass('error');
        getLogFunction('INFO', 'setConsumerProfile success!')();
    }
}

function onClearClicked(params) {
    $("input").each((index, listItem) => {
        var $item = $(listItem);
        if (!$item.hasClass('ignore')) {
            $(listItem).val('');
        }
    });
}

function onChecked(checkbox, targetName) {
    $("#" + targetName).toggleClass("include-empty-string", null, checkbox.checked)
}

