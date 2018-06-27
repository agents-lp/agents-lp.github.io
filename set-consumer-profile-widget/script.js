window.lpTag = window.lpTag || {};
lpTag.taglets = lpTag.taglets || {};
var SDK = lpTag.agentSDK || {};
var currImage = '';
var checkAll = true;

$(function () {
    SDK.init({
        notificationCallback: getLogFunction('INFO', 'Notification received!'),
        visitorFocusedCallback: getLogFunction('INFO', 'Visitor Focused received!'),
        visitorBlurredCallback: getLogFunction('INFO', 'Visitor Blurred received!')
    });

    SDK.get('messagingInfo.consumerProfile', getProfileSuccess, getProfileError);
    function getProfileSuccess(data) {
        $("#userDetails").val(JSON.stringify(data, null, 2));
        getLogFunction('INFO', 'Get success!')(data);
        $('#first-name').val(data.firstName);
        $('#last-name').val(data.lastName);
        $('#avatar-url').val(data.avatarImage);
        // $('#email').val(data.email); //not available in SDK
        // $('#phone').val(data.phone); //not available in SDK
        $('#backgndImgUri').val(data.backgroundImage);
        $('#description').val(data.description);
    }
    function getProfileError(err) {
        $("#userDetails").val("An error occurd trying to get the consumer's details");
        getLogFunction('ERROR', 'Error in get!')(err);
    }
});


function getLogFunction(type, message) {
    return function (data) {
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
        $('.update-button').html('Updated!');
        setTimeout(function () {
            $('.update-button').html('Update <i class="fas fa-arrow-down"></i>');
        }, 1000);
    }

    $("#userDetails").val('');
    setTimeout(() => {
        SDK.get('messagingInfo.consumerProfile', getProfileSuccess, getProfileError);
        function getProfileSuccess(data) {
            $("#userDetails").val(JSON.stringify(data, null, 2));
        }
        function getProfileError() {
            $("#userDetails").val("An error occurd trying to get the consumer's details");
        }
    }, 500);
}

function onClearClicked() {
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

function onAvatarButtonClicked() {
    $('.gallery').toggleClass('hide');
}
function setImageInput(target, input) {
    if (currImage) {
        $('.' + currImage).removeClass('selected');
    }
    currImage = target;
    $('.' + currImage).addClass('selected');
    $('#avatar-url').val(input);
}

function onBulkCheckClicked() {
    $("input[type='checkbox']").each((index, listItem) => {
        $(listItem).prop('checked', checkAll);
    });
    checkAll = !checkAll;
    var innerText = checkAll ? 'Check All <i class="fas fa-check-square"></i>' : 'Uncheck All <i class="far fa-square"></i>';
    $('.bulk-check-button').html(innerText);
}
