var SDK = lpTag.agentSDK || {};
var myTimer;
var searchKey = '';
var bindingObject = {};

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
function onSendNotificationClicked() {
    if (!myTimer) {
        myTimer = setInterval(sendNotification, 15000);
        $(".notify-button").html('Stop notify <i class="notify-icon far fa-bell-slash">');
        $(".notify-button").addClass('active');
    }
    else {
        $(".notify-button").html('Notify <i class="notify-icon far fa-bell">');
        $(".notify-button").removeClass('active');
        clearInterval(myTimer);
        myTimer = undefined;
    }
}

function sendNotification() {
    SDK.command('Send Notification', {/*text:commandVal*/ }, createCallback('Notify'));
    getLogFunction('INFO', name + ' success!')();
}
function writeCommand() {
    var commandVal = $(".write-input").val();
    SDK.command('Write ChatLine', { text: commandVal }, createCallback('Write'));
    $(".write-input").val('');
}

function onGetClicked() {
    var getKey = getKeys();
    if (getKey) {
        $('.result-line').text('Getting: ' + getKey);
        SDK.get(getKey, getSuccess, getLogFunction('ERROR', 'Error in get!'));
    }
    else {
        $('.result-line').text('Missing values');
    }
}

function onBindClicked() {
    var bindKey = getKeys();
    if (bindKey) {
        if (!bindingObject[bindKey]) {
            $('.result-line').text('Binding to: ' + bindKey);
            SDK.bind(bindKey, bindSuccess, createCallback('Bind'));
            bindingObject[bindKey] = true;
            $(".bind-button").html('Unbind <i class="fas fa-unlink"></i>');
            $(".bind-button").addClass('active');
        }
        else {
            $(".bind-button").html('Bind <i class="fas fa-link"></i>');
            $(".bind-button").removeClass('active');
            SDK.unbind(bindKey, bindSuccess, createCallback('Unbind'));
            $('.result-line').text('Unbinding: ' + bindKey);
            bindingObject[bindKey] = false;
        }
        updateBindButton();
    }
    else {
        $('.result-line').text('Missing values');
    }
}

function onUnbindClicked() {
    var unbindKey = getKeys();
    if (unbindKey) {
        if (bindingObject[unbindKey]) {
            $('.result-line').text('Unbinding: ' + unbindKey);
            SDK.unbind(unbindKey, bindSuccess, createCallback('Unbind'));
            bindingObject[unbindKey] = false;
            updateBindButton();
        }
        else {
            $('.result-line').text('Already Unbinded: ' + unbindKey);
        }
    }
    else {
        $('.result-line').text('Missing values');
    }
}
function createCallback(name) {
    return function (error) {
        if (error) {
            getLogFunction('ERROR', 'Error in ' + name + '!')(error);
        } else {
            getLogFunction('INFO', name + ' success!')();
        }
    };
}
function getSuccess(data) {
    $(".results-json").val(JSON.stringify(data, undefined, 4));
    $(".results-table").html(createTableContent(data, ['Key', 'Value']));
    getLogFunction('INFO', 'Get success!')(data);
}
function bindSuccess(data) {
    $(".results-json").val(JSON.stringify(data, undefined, 4));
    $(".results-table").html(createTableContent(data, ['Key', 'Value']));
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
    searchKey = [$("#sdkMain").val() || '', $("#sdkSub").val() || '', $("#sdkCustom").val() || ''];
    searchKey = searchKey.filter(Boolean).join('.');
    return searchKey;
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
            $sdkSub.append(getOptionsString(['', 'consumerProfile', 'consumerProfile.backgroundImage', 'consumerProfile.description', 'consumerProfile.firstName', 'consumerProfile.fullName', 'consumerProfile.avatarImage', 'consumerProfile.lastName', 'consumerProfile.isProfileSet', 'consumerProfile.userId'])); break;
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

function copyToClipboard() {
    var copyText = $(".results-json");
    copyText.select();
    document.execCommand("Copy");
    var tooltip = $(".tooltip-text")[0];
    tooltip.innerHTML = "Copied";
}

function onCopyMouseOut() {
    var tooltip = $(".tooltip-text")[0];
    tooltip.innerHTML = "Copy to clipboard";
}

function clearText() {
    $(".results-json").val('');
    $(".results-table").html('');
}

function createTableContent (data, ColumnNames) {
    var tableContent = '';
    getHeader();
    getBody();
    return tableContent;

    function getHeader() {
        tableContent += '<thead>';
        tableContent += '<tr>';
        ColumnNames.forEach(function (key, value) {
            tableContent += '<th>' + ColumnNames[value] + '</th>';
        });
        tableContent += '</tr>';
        tableContent += '</thead>';
    }

    function getBody() {
        tableContent += '<tbody>';
        // complex objects
        if ($.type(data) === "array" || $.type(data) === "object") {
            Object.keys(data).forEach(function (key) {
                tableContent += '<tr><td>' + key + '</td>';
                tableContent += getCellHtml(data[key]);
                tableContent += '</tr>';
            });
        }
        // simplified objects
        else {
            tableContent += '<tr><td>' + searchKey + '</td>' + getCellHtml(data) + '</tr>';
        }
        tableContent += '</tbody>';
    }

    function getCellHtml(data) {
        var res = '';
        switch ($.type(data)) {
            case 'array':
                res += '<td class="value-array">';
                break;
            case 'number':
                res += '<td class="value-number">';
                break;
            case 'string':
                res += '<td class="value-string">';
                break;
            case 'boolean':
                res += '<td class="value-boolean">';
                break;
            case 'object':
                res += '<td class="value-object">';
                break;
            default: // null/undefined
                res += '<td>';
                break;
        }
        return res + JSON.stringify(data) + '</td>';
    }
}

function switchDisplay(e, name) {
    if (name === "JSON") {
        $(".results-json").removeClass('hide');
        $(".results-table").addClass('hide');
        $(".json-button").addClass('active');
        $(".table-button").removeClass('active');

    }
    else if (name === "Table"){
        $(".results-json").addClass('hide').removeClass('active');
        $(".results-table").removeClass('hide').addClass('active');
        $(".json-button").removeClass('active');
        $(".table-button").addClass('active');
    }
}

function updateBindButton() {
    if (bindingObject[getKeys()]) {
        $(".bind-button").html('Unbind <i class="fas fa-unlink"></i>');
        $(".bind-button").addClass('active');
    }
    else {
        $(".bind-button").html('Bind <i class="fas fa-link"></i>');
        $(".bind-button").removeClass('active');
    }
}
