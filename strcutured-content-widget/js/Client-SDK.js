/**
* @auther danielgw
* Date 15/03/15
*/

window.lpTag = window.lpTag || {};
lpTag.taglets = lpTag.taglets || {};
lpTag.agentSDK = lpTag.agentSDK || (function () {

    var _name = "agentSDK";
    var  _v = "1.0.1";
    var appNames = {
            manager: 'iFrame manager',
            events: 'iFrame events'
        };
    var cmdNames = {
            bind: 'Bind',
            unbind: 'Unbind',
            write: 'Write ChatLine',
            writeSC: 'Write StructuredContent',
            initialize: 'Initialize'
        };
    var reqNames = {
            get: 'Get'
        };
    var eventNames = {
            notify: 'Notify',
            visitorFocused: 'Visitor Focused',
            visitorBlurred: 'Visitor Blurred'
            //widgetVisible: 'Widget Visible',
            //widgetHidden: 'Widget Hidden'
    };
    var channel;

    /**
     * Initializes the communication channel with the agent. If a callback is provided for notifications - complies to
     * notifications with the callback.
     * @param [cfg] Can contain an optional 'notificationCallback', which is used to comply to notifications
     */
    function init(cfg) {
        // Create the channel
        channel =  _createIFrameChannel();
        _bindOnCallback(cfg && cfg.notificationCallback, eventNames.notify);
        _bindOnCallback(cfg && cfg.visitorFocusedCallback, eventNames.visitorFocused);
        _bindOnCallback(cfg && cfg.visitorBlurredCallback, eventNames.visitorBlurred);
        //_bindOnCallback(cfg && cfg.widgetVisibleCallback, eventNames.widgetVisible);
        //_bindOnCallback(cfg && cfg.widgetHiddenCallback, eventNames.widgetHidden);
        if(channel){
            try {
                channel.command({
                    appName: appNames.manager,
                    cmdName: cmdNames.initialize,
                    data: {
                    }
                });
            } catch (error) {
                _error('Error initializing communication. The error: ' + error);
            }
        }
    }

    /**
     * Disposes of the communication channel with the agent.
     */
    function dispose() {
        if (channel && channel.dispose) {
            try {
                channel.dispose();
            } catch (error) {
                _error('Error disposing of the courier. The error: ' + error);
            }
        }
        channel = null;
    }

    /**
     * Gets a given key from the agent data.
     * @param key The key to get. For example 'visitorInfo.visitorName'
     * @param cbSuccess The success callback
     * @param cbError The error callback
     */
    function get(key,cbSuccess,cbError) {
        var successCallback = _safelyWrapCallback(cbSuccess, '\'get\' success');
        var errorCallback = _safelyWrapCallback(cbError, '\'get\' error', true);
        if (channel && key) {
            _info('Calling "get" on the following key: ' + key);
            try {
                channel.request({
                    appName: appNames.manager,
                    reqName: reqNames.get,
                    data: {
                        key: key
                    }
                }, function(err, data) {
                    errorCallback(err);
                    successCallback(data);
                });
            } catch (error) {
                _error('Error calling "get" on the following key: ' + key + '. The error: ' + error);
                errorCallback(error);
            }
        } else {
            var errorMessage;
            if (!channel) {
                errorMessage = 'No channel defined when calling "get". Maybe you are missing a call to "init"?';
            } else if (!key) {
                errorMessage = 'No key provided when calling "get"';
            }
            if (errorMessage) {
                _error(errorMessage);
                errorCallback(errorMessage);
            }
        }
    }

    /**
     * Binds to a given key from the agent data.
     * @param key The key to bind to. For example 'visitorInfo.visitorName'
     * @param valueUpdateCallback Callback for value updates of the given key.
     * @param [notifyWhenDoneCallback] Optional callback that will be triggered when the bind process is done. Can receive errors.
     */
    function bind(key, valueUpdateCallback, notifyWhenDoneCallback) {
        var updateCallback = _safelyWrapCallback(valueUpdateCallback, '\'bind\' valueUpdateCallback');
        var doneCallback = _safelyWrapCallback(notifyWhenDoneCallback, '\'bind\' notifyWhenDoneCallback');
        if (channel && key) {
            _info('Calling "bind" on the following key: ' + key);
            try {
                channel.bind({
                    appName: appNames.manager,
                    eventName: key,
                    func: updateCallback
                });
                channel.command({
                    appName: appNames.manager,
                    cmdName: cmdNames.bind,
                    data: {
                        key: key
                    }
                }, doneCallback);
            } catch (error) {
                _error('Error calling "bind" on the following key: ' + key + '. The error: ' + error);
                doneCallback(error);
            }
        } else {
            var errorMessage;
            if (!channel) {
                errorMessage = 'No channel defined when calling "bind". Maybe you are missing a call to "init"?';
            } else if (!key) {
                errorMessage = 'No key provided when calling "bind"';
            }
            if (errorMessage) {
                _error(errorMessage);
                doneCallback(errorMessage);
            }
        }
    }

    /**
     * Unbinds from a given key from the agent data.
     * @param key The key to unbind from. For example 'visitorInfo.visitorName'
     * @param valueUpdateCallback Callback for value updates of the given key. (The callback that was used to bind).
     * @param [notifyWhenDoneCallback] Optional callback that will be triggered when the unbind process is done. Can receive errors.
     */
    function unbind(key, valueUpdateCallback, notifyWhenDoneCallback) {
        var updateCallback = _safelyWrapCallback(valueUpdateCallback, '\'bind\' valueUpdateCallback');
        var doneCallback = _safelyWrapCallback(notifyWhenDoneCallback, '\'bind\' notifyWhenDoneCallback');
        if (channel && key) {
            _info('Calling "unbind" on the following key: ' + key);
            try {
                channel.unbind({
                    appName: appNames.manager,
                    eventName: key,
                    func: updateCallback
                });
                channel.command({
                    appName: appNames.manager,
                    cmdName: cmdNames.unbind,
                    data: {
                        key: key
                    }
                }, doneCallback);
            } catch (error) {
                _error('Error calling "unbind" on the following key: ' + key + '. The error: ' + error);
                doneCallback(error);
            }
        } else {
            var errorMessage;
            if (!channel) {
                errorMessage = 'No channel defined when calling "unbind". Maybe you are missing a call to "init"?';
            } else if (!key) {
                errorMessage = 'No key provided when calling "unbind"';
            }
            if (errorMessage) {
                _error(errorMessage);
                doneCallback(errorMessage);
            }
        }
    }

    /**
     * Sends a command to the agent, such as writing a chat line to the chat input.
     * @param cmdName The name of the command to run. For example - 'Write Chatline'
     * @param data Data that will be provided for the command. For example - {text: 'This line was generated via the SDK'}
     * @param [notifyWhenDoneCallback] Optional callback that will be triggered when the command process is done. Can receive errors.
     */
    function command(cmdName, data, notifyWhenDoneCallback) {
        var doneCallback = _safelyWrapCallback(notifyWhenDoneCallback, '\'command\' notifyWhenDoneCallback');
        if (channel && cmdName) {
            _info('Calling "command" with the following cmdName: ' + cmdName);
            try {
                channel.command({
                    appName: appNames.manager,
                    cmdName: cmdName,
                    data: data
                }, doneCallback);
            } catch (error) {
                _error('Error calling "command" with the following cmdName: ' + cmdName + '. The error: ' + error);
                doneCallback(error);
            }
        } else {
            var errorMessage;
            if (!channel) {
                errorMessage = 'No channel defined when calling "command". Maybe you are missing a call to "init"?';
            } else if (!cmdName) {
                errorMessage = 'No cmdName provided when calling "command"';
            }
            if (errorMessage) {
                _error(errorMessage);
                doneCallback(errorMessage);
            }
        }
    }

    /**
     * Adds a callback for notifications
     * @param callback - The callback
     */
    function onNotify(callback) {
        _bindOnCallback(callback, eventNames.notify);
    }

    /**
     * Adds a callback for visitor focused events
     * @param callback - The callback
     */
    function onVisitorFocused(callback) {
        _bindOnCallback(callback, eventNames.visitorFocused);
    }

    /**
     * Adds a callback for visitor blurred events
     * @param callback - The callback
     */
    function onVisitorBlurred(callback) {
        _bindOnCallback(callback, eventNames.visitorBlurred);
    }

    //function onWidgetVisible(callback) {
    //    _bindOnCallback(callback, eventNames.widgetVisible);
    //}
    //
    //function onWidgetHidden(callback) {
    //    _bindOnCallback(callback, eventNames.widgetHidden);
    //}

    /////////////////////////////////// PRIVATE METHODS ///////////////////////////////////

    /**
     * Creates an lpEvents channel to communicate with the agent
     * @returns {lpTag.Chronos.PostMessageCourier} The lpEvents channel
     * @private
     */
    function _createIFrameChannel() {
        if (lpTag.Chronos.PostMessageCourier) {
            _info('Creating an instance of the courier');
            try {
                return new lpTag.Chronos.PostMessageCourier();
            } catch (Error) {
                _error('Error creating instance of courier');
            }
        }
        return undefined;
    }

    /**
     * Safely binds to an event, with log calls
     * @param callback - The callback to call when the event is triggered
     * @param eventName - The name of the event to bind to
     * @private
     */
    function _bindOnCallback(callback, eventName) {
        if (callback && channel && eventName) {
            _info('binding on ' + eventName);
            try {
                channel.bind({
                    appName: appNames.events,
                    eventName: eventName,
                    func: _safelyWrapCallback(callback, eventName + ' event')
                });
            } catch (error) {
                _error('Error binding on ' + eventName + '. The error: ' + JSON.stringify(error));
            }
        } else if (!channel) {
            _error('No channel defined when binding on ' + eventName + '. Maybe you are missing a call to "init"?');
        }
    }

    /**
     * Safely wraps a callback with a try-catch, and logs an error in the event of a failure.
     * @param callback - The callback to wrap
     * @param name - The name for the callback in the log message (for instance "'get' success")
     * @param checkInput - If true, we should only try to call the callback if the data is truthy
     * @returns {Function}
     * @private
     */
    function _safelyWrapCallback(callback, name, checkInput) {
        return function (data) {
            if (callback && (typeof data !== 'undefined' || !checkInput)) {
                try {
                    callback.call(this, data);
                } catch (error) {
                    _error('Callback provided for ' + name + ' encountered an error. The error: ' + JSON.stringify(error) + ' . The callback data: ' + JSON.stringify(data));
                }
            }
        };
    }

    function _log(msg, lvl) {
        if (window.lpTag && lpTag.log) {
            lpTag.log(msg, lvl, _name);
        }
    }

    function _error(msg) {
        _log(msg, 'ERROR');
    }

    function _info(msg) {
        _log(msg, 'INFO');
    }

    return {
        v: _v,
        name: _name,
        init: init,
        get: get,
        bind: bind,
        unbind: unbind,
        command: command,
        dispose: dispose,
        onNotify: onNotify,
        onVisitorFocused: onVisitorFocused,
        onVisitorBlurred: onVisitorBlurred,
        //onWidgetVisible: onWidgetVisible,
        //onWidgetHidden: onWidgetHidden,
        appNames: appNames,
        eventNames: eventNames,
        cmdNames: cmdNames,
        reqNames: reqNames
    };
})();