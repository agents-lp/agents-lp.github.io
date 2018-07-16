var SDK = lpTag.agentSDK || {};
var myTimer;
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
    var getKey = $(".getInput").val();
    SDK.get(getKey, getSuccess, getLogFunction('ERROR', 'Error in get!'));
}
function bind() {
    var bindKey = $(".bindInput").val();
    SDK.bind(bindKey, bindSuccess, createCallback('Bind'));
}
function unbind() {
    //clearLogger();
    var bindKey = $(".bindInput").val();
    SDK.unbind(bindKey, bindSuccess, createCallback('Unbind'));
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