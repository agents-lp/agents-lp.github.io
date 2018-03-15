var SDK = lpTag.agentSDK || {};
var myTimer;

$('html, body').css({
    overflow: 'hidden',
    height: '100%'
});

$(function () {
    SDK.init({
        notificationCallback: getLogFunction('INFO', 'Notification received!'),
        visitorFocusedCallback: getLogFunction('INFO', 'Visitor Focused received!'),
        visitorBlurredCallback: getLogFunction('INFO', 'Visitor Blurred received!')
    });
});

function getLogFunction(type, message) {
    return function (data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data, null, 2);
        }
        logger(type, message + ' The ' + type + ' data: ' + data);
    }
}
function startSendingNotification() {
    myTimer = setInterval(sendNotification, 15000);
}
function stopSendingNotification() {
    clearInterval(myTimer);
}

function sendNotification() {
    SDK.command('Send Notification', {/*text:commandVal*/ }, createCallback('Notify'));
}
function writeCommand() {
    var commandVal = $(".commandInput").val();
    SDK.command('Write ChatLine', { text: commandVal }, createCallback('Write'));
}

function get() {
    var getKey = getKeys();
    if (getKey) {
        $('.result').text('Getting: ' + getKey);
        SDK.get(getKey, getSuccess, getLogFunction('ERROR', 'Error in get!'));
    }
    else {
        $('.result').text('Missing values');
    }
}

function bind() {
    var bindKey = getKeys();
    if (bindKey) {
        $('.result').text('Binding to: ' + bindKey);
        SDK.bind(bindKey, bindSuccess, createCallback('Bind'));
    }
    else {
        $('.result').text('Missing values');
    }
}

function unbind() {
    var unbindKey = getKeys();
    if (unbindKey) {
        $('.result').text('Unbinding: ' + unbindKey);
        SDK.unbind(unbindKey, bindSuccess, createCallback('Unbind'));
    }
    else {
        $('.result').text('Missing values');
    }
}
function createCallback(name) {
    return function (error) {
        if (error) {
            getLogFunction('ERROR', 'Error in ' + name + '!')(error);
        } else {
            getLogFunction('INFO', name + ' success!')();
        }
    }
}
function getSuccess(data) {
    $(".getResults").html(JSON.stringify(data));
    getLogFunction('INFO', 'Get success!')(data);
}
function bindSuccess(data) {
    $(".bindResults").html(JSON.stringify(data));
    getLogFunction('INFO', 'Bind success!')(data);
}
function logger(type, text) {
    if (typeof text === 'object') {
        text = JSON.stringify(text, null, 2);
    }
    var area = $(".logBox textarea");
    area.val(new Date().toTimeString() + ":  " + type + " - " + text + '\n' + area.val());
}

function getKeys() {
    var bindKey = [$("#sdkMain").val() || '', $("#sdkSub").val() || '', $("#sdkCustom").val() || ''];
    return bindKey.filter(Boolean).join('.');
}

function getSubCategory() {
    var selected = $("#sdkMain").val();
    var $sdkSub = $('#sdkSub');
    $sdkSub.empty();
    switch (selected) {
        case 'chatInfo':
            $sdkSub.append(getOptionsString(['', 'rtSessionId', 'accountId', 'chatRequestedTime', 'sessionStartTime', 'chatStartTime', 'chatStartUrl', 'spectatedEngagement', 'isMessaging', 'chatSkill']));
            break;
        case 'chattingAgentInfo':
            $sdkSub.append(getOptionsString(['', 'agentName', 'agentId', 'agentGroupName', 'agentNickname']));
            break;
        case 'agentInfo':
            $sdkSub.append(getOptionsString(['', 'accountId', 'agentName', 'agentId', 'agentNickname', 'agentEmail', 'employeeId', 'maxChats']));
            break;
        case 'messagingInfo':
            $sdkSub.append(getOptionsString(['', 'consumerProfile.backgroundImage', 'consumerProfile.description', 'consumerProfile.firstName', 'consumerProfile.fullName', 'consumerProfile.avatarImage', 'consumerProfile.lastName', 'consumerProfile.isProfileSet', 'consumerProfile.userId']));            break;
        case 'chatTranscript':
            $sdkSub.append(getOptionsString(['', 'lines']));
            break;
        case 'surveyQuestions':
            $sdkSub.append(getOptionsString(['', 'preChat', 'preChat.email', 'preChat.phone', 'preChat.name', 'preChat.customizedQuestions', 'postChat', 'agentSurvey']));
            break;
        case 'visitorInfo':
            $sdkSub.append(getOptionsString(['', 'visitorId', 'visitorName', 'visitorSso', 'device', 'browser', 'operatingSystem', 'country', 'state', 'city', 'region', 'geoLong', 'geoLat', 'isp', 'organization', 'IpAddress', 'visitStartTime', 'chattingVisitorState', 'visitorTimezone', 'visitorTyping']));
            break;
        case 'campaignInfo':
            $sdkSub.append(getOptionsString(['', 'campaignName', 'campaignId', 'campaignDescription', 'targetAudience', 'goalName', 'goalId', 'goalDescription', 'lobName', 'lobId', 'lobDescription']));
            break;
        case 'engagementInfo':
            $sdkSub.append(getOptionsString(['', 'VisitorBehavior', 'skill', 'engagementType', 'engagementId', 'engagementName', 'agentNote', 'engagementSkill', 'engagementSource']));
            break;
        case 'visitorJourney':
            $sdkSub.append(getOptionsString(['', 'pages', 'searchEngine', 'searchEngine.searchProvider', 'searchEngine.searchKeywords']));
            break;
        case 'SDE':
            $sdkSub.append(getOptionsString(['', 'customerDetails', 'personalInfo', 'marketingSource', 'leadGeneration', 'transaction', 'viewedProducts', 'shoppingCart', 'serviceActivity', 'seamless', 'error', 'searchContent']));
            break;
        case 'authenticatedData':
            $sdkSub.append(getOptionsString(['', 'customerDetails', 'personalInfo']));
            break;
        case 'customVariables':
            $sdkSub.append(getOptionsString(['']));
            break;
        case 'splitSession':
            $sdkSub.append(getOptionsString(['', 'customVariables']));
            break;
        default:
            break;
    }

    function getOptionsString(subCategoryArray) {
        var str = '';
        for (var category in subCategoryArray) {
            str += '<option value="' + subCategoryArray[category] + '">' + subCategoryArray[category] + '</option>';
        }
        return str;
    }
}
