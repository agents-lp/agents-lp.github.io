/**
 * This is an SDK written for testing the campignInfo and engagementInfo fields in different scenarios.
 * Flow:
 * 1. get the conversation type based on the chatInfo.isMessaging field- 
 *  --if true: this is a messaging conversation
 *     1. gets the visitor's name from the SDK by visitorInfo.visitorName
 *     2. based on the name- decides on the correct group of data paths that should be retrieved
 *     3. calls getDataPaths with the matching dataPaths group
 *  --if false: this is a chat conversation and calls getDataPaths of chat
 * 2. the paths are retrieved and the result is updated accordingly
 */

(function () {

    // contains the data types that can be tested (i.e. campaign without line of business) and their data paths.
    // the paths are represented as objects- 
        // name: the path name in the SDK, 
        // shouldBeAvailable: if false- expects a missing value, if true: expects some value. deviation from that will change the outcome from "OK" to invalid
    var dataPaths = {
        // all the fields that should be available in messaging
        messagingFullInfo: [
            { name: "chattingAgentInfo.agentName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentId", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentGroupName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.accountId", shouldBeAvailable: true },
            { name: "agentInfo.agentName", shouldBeAvailable: true },
            { name: "agentInfo.agentId", shouldBeAvailable: true },
            { name: "agentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.agentEmail", shouldBeAvailable: true },
            { name: "agentInfo.maxChats", shouldBeAvailable: true },
            { name: "chatTranscript.lines", shouldBeAvailable: true },
            { name: "visitorInfo.visitorId", shouldBeAvailable: true },
            { name: "visitorInfo.visitorName", shouldBeAvailable: true },
            { name: "visitorInfo.device", shouldBeAvailable: true },
            { name: "visitorInfo.browser", shouldBeAvailable: true },
            { name: "visitorInfo.operatingSystem", shouldBeAvailable: true },
            // { name: "visitorInfo.IpAddress", shouldBeAvailable: true },
            // { name: "visitorInfo.visitStartTime", shouldBeAvailable: true },
            { name: "visitorInfo.chattingVisitorState", shouldBeAvailable: true },
            { name: "campaignInfo.campaignId", shouldBeAvailable: true },
            { name: "campaignInfo.campaignName", shouldBeAvailable: true },
            { name: "campaignInfo.campaignDescription", shouldBeAvailable: true },
            { name: "campaignInfo.targetAudience", shouldBeAvailable: true },
            { name: "campaignInfo.goalId", shouldBeAvailable: true },
            { name: "campaignInfo.goalName", shouldBeAvailable: true },
            { name: "campaignInfo.goalDescription", shouldBeAvailable: true },
            { name: "campaignInfo.lobId", shouldBeAvailable: true },
            { name: "campaignInfo.lobName", shouldBeAvailable: true },
            { name: "campaignInfo.lobDescription", shouldBeAvailable: true },
            { name: "engagementInfo.engagementId", shouldBeAvailable: true },
            { name: "engagementInfo.engagementName", shouldBeAvailable: true },
            { name: "engagementInfo.agentNote", shouldBeAvailable: true },
            { name: "engagementInfo.VisitorBehavior", shouldBeAvailable: true },
            { name: "engagementInfo.engagementType", shouldBeAvailable: true }
            // { name: "engagementInfo.engagementSkill", shouldBeAvailable: true }, // TODO-will be included after skill routing for messaging feature
            // { name: "engagementInfo.skill", shouldBeAvailable: true },
        ],
        // no lob
        messagingNoLOB: [
            { name: "chattingAgentInfo.agentName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentId", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentGroupName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.accountId", shouldBeAvailable: true },
            { name: "agentInfo.agentName", shouldBeAvailable: true },
            { name: "agentInfo.agentId", shouldBeAvailable: true },
            { name: "agentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.agentEmail", shouldBeAvailable: true },
            { name: "agentInfo.maxChats", shouldBeAvailable: true },
            { name: "chatTranscript.lines", shouldBeAvailable: true },
            { name: "visitorInfo.visitorId", shouldBeAvailable: true },
            { name: "visitorInfo.visitorName", shouldBeAvailable: true },
            { name: "visitorInfo.device", shouldBeAvailable: true },
            { name: "visitorInfo.browser", shouldBeAvailable: true },
            { name: "visitorInfo.operatingSystem", shouldBeAvailable: true },
            // { name: "visitorInfo.IpAddress", shouldBeAvailable: true },
            // { name: "visitorInfo.visitStartTime", shouldBeAvailable: true },
            { name: "visitorInfo.chattingVisitorState", shouldBeAvailable: true },
            { name: "campaignInfo.campaignId", shouldBeAvailable: true },
            { name: "campaignInfo.campaignName", shouldBeAvailable: true },
            { name: "campaignInfo.campaignDescription", shouldBeAvailable: true },
            { name: "campaignInfo.targetAudience", shouldBeAvailable: true },
            { name: "campaignInfo.goalId", shouldBeAvailable: true },
            { name: "campaignInfo.goalName", shouldBeAvailable: true },
            { name: "campaignInfo.goalDescription", shouldBeAvailable: true },
            { name: "campaignInfo.lobId", shouldBeAvailable: false },
            { name: "campaignInfo.lobName", shouldBeAvailable: false },
            { name: "campaignInfo.lobDescription", shouldBeAvailable: false },
            { name: "engagementInfo.engagementId", shouldBeAvailable: true },
            { name: "engagementInfo.engagementName", shouldBeAvailable: true },
            { name: "engagementInfo.agentNote", shouldBeAvailable: true },
            { name: "engagementInfo.VisitorBehavior", shouldBeAvailable: true },
            { name: "engagementInfo.engagementType", shouldBeAvailable: true }
            // { name: "engagementInfo.engagementSkill", shouldBeAvailable: true }, // TODO-will be included after skill routing for messaging feature
            // { name: "engagementInfo.skill", shouldBeAvailable: true }, // TODO- should be deprecated
        ],
        // no agentNote, no campaign description, no lob.
        messagingBasicInfo: [
            { name: "chattingAgentInfo.agentName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentId", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentGroupName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.accountId", shouldBeAvailable: true },
            { name: "agentInfo.agentName", shouldBeAvailable: true },
            { name: "agentInfo.agentId", shouldBeAvailable: true },
            { name: "agentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.agentEmail", shouldBeAvailable: true },
            { name: "agentInfo.maxChats", shouldBeAvailable: true },
            { name: "chatTranscript.lines", shouldBeAvailable: true },
            { name: "visitorInfo.visitorId", shouldBeAvailable: true },
            { name: "visitorInfo.visitorName", shouldBeAvailable: true },
            { name: "visitorInfo.device", shouldBeAvailable: true },
            { name: "visitorInfo.browser", shouldBeAvailable: true },
            { name: "visitorInfo.operatingSystem", shouldBeAvailable: true },
            // { name: "visitorInfo.IpAddress", shouldBeAvailable: true },
            // { name: "visitorInfo.visitStartTime", shouldBeAvailable: true },
            { name: "visitorInfo.chattingVisitorState", shouldBeAvailable: true },
            { name: "campaignInfo.campaignId", shouldBeAvailable: true },
            { name: "campaignInfo.campaignName", shouldBeAvailable: true },
            { name: "campaignInfo.campaignDescription", shouldBeAvailable: false },
            { name: "campaignInfo.targetAudience", shouldBeAvailable: true },
            { name: "campaignInfo.goalId", shouldBeAvailable: true },
            { name: "campaignInfo.goalName", shouldBeAvailable: true },
            { name: "campaignInfo.goalDescription", shouldBeAvailable: true },
            { name: "campaignInfo.lobId", shouldBeAvailable: false },
            { name: "campaignInfo.lobName", shouldBeAvailable: false },
            { name: "campaignInfo.lobDescription", shouldBeAvailable: false },
            { name: "engagementInfo.engagementId", shouldBeAvailable: true },
            { name: "engagementInfo.engagementName", shouldBeAvailable: true },
            { name: "engagementInfo.agentNote", shouldBeAvailable: false },
            { name: "engagementInfo.VisitorBehavior", shouldBeAvailable: true },
            { name: "engagementInfo.engagementType", shouldBeAvailable: true }
            // { name: "engagementInfo.engagementSkill", shouldBeAvailable: true }, // TODO-will be included after skill routing for messaging feature
            // { name: "engagementInfo.skill", shouldBeAvailable: true }, // TODO- should be deprecated
        ],
        // no campaignInfo and engagementInfo fields (except for engagementType)
        messagingDeletedCampaign: [
            { name: "chattingAgentInfo.agentName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentId", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentGroupName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.accountId", shouldBeAvailable: true },
            { name: "agentInfo.agentName", shouldBeAvailable: true },
            { name: "agentInfo.agentId", shouldBeAvailable: true },
            { name: "agentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.agentEmail", shouldBeAvailable: true },
            { name: "agentInfo.maxChats", shouldBeAvailable: true },
            { name: "chatTranscript.lines", shouldBeAvailable: true },
            { name: "visitorInfo.visitorId", shouldBeAvailable: true },
            { name: "visitorInfo.visitorName", shouldBeAvailable: true },
            { name: "visitorInfo.device", shouldBeAvailable: true },
            { name: "visitorInfo.browser", shouldBeAvailable: true },
            { name: "visitorInfo.operatingSystem", shouldBeAvailable: true },
            // { name: "visitorInfo.IpAddress", shouldBeAvailable: true },
            // { name: "visitorInfo.visitStartTime", shouldBeAvailable: true },
            { name: "visitorInfo.chattingVisitorState", shouldBeAvailable: true },
            { name: "campaignInfo.campaignId", shouldBeAvailable: false },
            { name: "campaignInfo.campaignName", shouldBeAvailable: false },
            { name: "campaignInfo.campaignDescription", shouldBeAvailable: false },
            { name: "campaignInfo.targetAudience", shouldBeAvailable: false },
            { name: "campaignInfo.goalId", shouldBeAvailable: false },
            { name: "campaignInfo.goalName", shouldBeAvailable: false },
            { name: "campaignInfo.goalDescription", shouldBeAvailable: false },
            { name: "campaignInfo.lobId", shouldBeAvailable: false },
            { name: "campaignInfo.lobName", shouldBeAvailable: false },
            { name: "campaignInfo.lobDescription", shouldBeAvailable: false },
            { name: "engagementInfo.engagementId", shouldBeAvailable: false },
            { name: "engagementInfo.engagementName", shouldBeAvailable: false },
            { name: "engagementInfo.agentNote", shouldBeAvailable: false },
            { name: "engagementInfo.VisitorBehavior", shouldBeAvailable: false },
            { name: "engagementInfo.engagementType", shouldBeAvailable: true }
            // { name: "engagementInfo.engagementSkill", shouldBeAvailable: false }, // TODO-will be included after skill routing for messaging feature
            // { name: "engagementInfo.skill", shouldBeAvailable: false }, // TODO- should be deprecated
        ],
        // no engagementInfo fields (except for engagementType)
        messagingDeletedEngagement: [
            { name: "chattingAgentInfo.agentName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentId", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentGroupName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.accountId", shouldBeAvailable: true },
            { name: "agentInfo.agentName", shouldBeAvailable: true },
            { name: "agentInfo.agentId", shouldBeAvailable: true },
            { name: "agentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.agentEmail", shouldBeAvailable: true },
            { name: "agentInfo.maxChats", shouldBeAvailable: true },
            { name: "chatTranscript.lines", shouldBeAvailable: true },
            { name: "visitorInfo.visitorId", shouldBeAvailable: true },
            { name: "visitorInfo.visitorName", shouldBeAvailable: true },
            { name: "visitorInfo.device", shouldBeAvailable: true },
            { name: "visitorInfo.browser", shouldBeAvailable: true },
            { name: "visitorInfo.operatingSystem", shouldBeAvailable: true },
            // { name: "visitorInfo.IpAddress", shouldBeAvailable: true },
            // { name: "visitorInfo.visitStartTime", shouldBeAvailable: true },
            { name: "visitorInfo.chattingVisitorState", shouldBeAvailable: true },
            { name: "campaignInfo.campaignId", shouldBeAvailable: true },
            { name: "campaignInfo.campaignName", shouldBeAvailable: true },
            { name: "campaignInfo.campaignDescription", shouldBeAvailable: true },
            { name: "campaignInfo.targetAudience", shouldBeAvailable: true },
            { name: "campaignInfo.goalId", shouldBeAvailable: true },
            { name: "campaignInfo.goalName", shouldBeAvailable: true },
            { name: "campaignInfo.goalDescription", shouldBeAvailable: true },
            { name: "campaignInfo.lobId", shouldBeAvailable: true },
            { name: "campaignInfo.lobName", shouldBeAvailable: true },
            { name: "campaignInfo.lobDescription", shouldBeAvailable: true },
            { name: "engagementInfo.engagementId", shouldBeAvailable: false },
            { name: "engagementInfo.engagementName", shouldBeAvailable: false },
            { name: "engagementInfo.agentNote", shouldBeAvailable: false },
            { name: "engagementInfo.VisitorBehavior", shouldBeAvailable: false },
            { name: "engagementInfo.engagementType", shouldBeAvailable: true }
            // { name: "engagementInfo.engagementSkill", shouldBeAvailable: false }, // TODO-will be included after skill routing for messaging feature
            // { name: "engagementInfo.skill", shouldBeAvailable: false }, // TODO- should be deprecated
        ],
        // messaging with sde support
        messagingWithSDE: [
            // { name: "chattingAgentInfo.agentName", shouldBeAvailable: true },
            // { name: "chattingAgentInfo.agentId", shouldBeAvailable: true },
            // { name: "chattingAgentInfo.agentGroupName", shouldBeAvailable: true },
            // { name: "chattingAgentInfo.agentNickname", shouldBeAvailable: true },
            // { name: "agentInfo.accountId", shouldBeAvailable: true },
            // { name: "agentInfo.agentName", shouldBeAvailable: true },
            // { name: "agentInfo.agentId", shouldBeAvailable: true },
            // { name: "agentInfo.agentNickname", shouldBeAvailable: true },
            // { name: "agentInfo.agentEmail", shouldBeAvailable: true },
            // { name: "agentInfo.maxChats", shouldBeAvailable: true },
            // { name: "chatTranscript.lines", shouldBeAvailable: true },
            // { name: "visitorInfo.visitorId", shouldBeAvailable: true },
            // { name: "visitorInfo.visitorName", shouldBeAvailable: true },
            // { name: "visitorInfo.device", shouldBeAvailable: true },
            // { name: "visitorInfo.browser", shouldBeAvailable: true },
            // { name: "visitorInfo.operatingSystem", shouldBeAvailable: true },
            // { name: "visitorInfo.IpAddress", shouldBeAvailable: true },
            // { name: "visitorInfo.visitStartTime", shouldBeAvailable: true },
            // { name: "visitorInfo.chattingVisitorState", shouldBeAvailable: true },
            { name: "SDE.customerDetails", shouldBeAvailable: true },
            { name: "SDE.personalInfo", shouldBeAvailable: true },
            { name: "SDE.marketingSource", shouldBeAvailable: true },
            { name: "SDE.leadGeneration", shouldBeAvailable: true },
            { name: "SDE.transaction", shouldBeAvailable: true },
            { name: "SDE.viewedProducts", shouldBeAvailable: true },
            { name: "SDE.shoppingCart", shouldBeAvailable: true },
            { name: "SDE.serviceActivity", shouldBeAvailable: true },
            // { name: "SDE.seamless", shouldBeAvailable: false },
            { name: "SDE.error", shouldBeAvailable: true },
            // { name: "campaignInfo.campaignId", shouldBeAvailable: true },
            // { name: "campaignInfo.campaignName", shouldBeAvailable: true },
            // { name: "campaignInfo.campaignDescription", shouldBeAvailable: true },
            // { name: "campaignInfo.targetAudience", shouldBeAvailable: true },
            // { name: "campaignInfo.goalId", shouldBeAvailable: true },
            // { name: "campaignInfo.goalName", shouldBeAvailable: true },
            // { name: "campaignInfo.goalDescription", shouldBeAvailable: true },
            // { name: "campaignInfo.lobId", shouldBeAvailable: true },
            // { name: "campaignInfo.lobName", shouldBeAvailable: true },
            // { name: "campaignInfo.lobDescription", shouldBeAvailable: true },
            // { name: "engagementInfo.engagementId", shouldBeAvailable: true },
            // { name: "engagementInfo.engagementName", shouldBeAvailable: true },
            // { name: "engagementInfo.agentNote", shouldBeAvailable: true },
            // { name: "engagementInfo.VisitorBehavior", shouldBeAvailable: true },
            // { name: "engagementInfo.engagementType", shouldBeAvailable: true }
            // { name: "engagementInfo.engagementSkill", shouldBeAvailable: true }, // TODO-will be included after skill routing for messaging feature
            // { name: "engagementInfo.skill", shouldBeAvailable: true }, //
        ],
        chat: [
            { name: "chattingAgentInfo.agentName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentId", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentGroupName", shouldBeAvailable: true },
            { name: "chattingAgentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.accountId", shouldBeAvailable: true },
            { name: "agentInfo.agentName", shouldBeAvailable: true },
            { name: "agentInfo.agentId", shouldBeAvailable: true },
            { name: "agentInfo.agentNickname", shouldBeAvailable: true },
            { name: "agentInfo.agentEmail", shouldBeAvailable: true },
            { name: "agentInfo.maxChats", shouldBeAvailable: true },
            { name: "chatTranscript.lines", shouldBeAvailable: true },
            // { name: "surveyQuestions.preChat.email.value", shouldBeAvailable: true },
            // { name: "surveyQuestions.preChat.email.displayName", shouldBeAvailable: true },
            // { name: "surveyQuestions.preChat.phone.value", shouldBeAvailable: true },
            // { name: "surveyQuestions.preChat.phone.displayName", shouldBeAvailable: true },
            // { name: "surveyQuestions.preChat.name.value", shouldBeAvailable: true },
            // { name: "surveyQuestions.preChat.name.displayName", shouldBeAvailable: true },
            // { name: "surveyQuestions.preChat.customizedQuestions", shouldBeAvailable: true },
            // { name: "surveyQuestions.postChat", shouldBeAvailable: true },
            // { name: "surveyQuestions.agentSurvey", shouldBeAvailable: true },
            // { name: "customVariables", shouldBeAvailable: true },
            { name: "visitorInfo.visitorId", shouldBeAvailable: true },
            { name: "visitorInfo.visitorName", shouldBeAvailable: true },
            { name: "visitorInfo.device", shouldBeAvailable: true },
            { name: "visitorInfo.browser", shouldBeAvailable: true },
            { name: "visitorInfo.operatingSystem", shouldBeAvailable: true },
            // { name: "visitorInfo.IpAddress", shouldBeAvailable: true },
            // { name: "visitorInfo.visitStartTime", shouldBeAvailable: true },
            { name: "visitorInfo.chattingVisitorState", shouldBeAvailable: true },
            { name: "campaignInfo.campaignId", shouldBeAvailable: true },
            { name: "campaignInfo.campaignName", shouldBeAvailable: true },
            { name: "campaignInfo.campaignDescription", shouldBeAvailable: true },
            { name: "campaignInfo.targetAudience", shouldBeAvailable: true },
            { name: "campaignInfo.goalId", shouldBeAvailable: true },
            { name: "campaignInfo.goalName", shouldBeAvailable: true },
            { name: "campaignInfo.goalDescription", shouldBeAvailable: true },
            { name: "campaignInfo.lobId", shouldBeAvailable: true },
            { name: "campaignInfo.lobName", shouldBeAvailable: true },
            { name: "campaignInfo.lobDescription", shouldBeAvailable: true },
            { name: "engagementInfo.engagementId", shouldBeAvailable: true },
            { name: "engagementInfo.engagementName", shouldBeAvailable: true },
            { name: "engagementInfo.agentNote", shouldBeAvailable: true },
            { name: "engagementInfo.VisitorBehavior", shouldBeAvailable: true },
            { name: "engagementInfo.engagementType", shouldBeAvailable: true }
            // { name: "engagementInfo.engagementSkill", shouldBeAvailable: true }, // TODO-will be included after skill routing for messaging feature
            // { name: "engagementInfo.skill", shouldBeAvailable: true }, // TODO- should be deprecated
            // { name: "SDE.customerDetails", shouldBeAvailable: true },
            // { name: "SDE.personalInfo", shouldBeAvailable: true },
            // { name: "SDE.marketingSource", shouldBeAvailable: true },
            // { name: "SDE.leadGeneration", shouldBeAvailable: true },
            // { name: "SDE.transaction", shouldBeAvailable: true },
            // { name: "SDE.viewedProducts", shouldBeAvailable: true },
            // { name: "SDE.shoppingCart", shouldBeAvailable: true },
            // { name: "SDE.serviceActivity", shouldBeAvailable: true },
            // { name: "SDE.error", shouldBeAvailable: true }
        ]
    };


    window.onload = function () {
        var resultDiv = document.getElementById('result_div'),
            resultText = document.getElementById('result_text'),
            tableEl = document.getElementById('table'),
            engagementDiv = document.getElementById('engagement_type'),
            result = 'OK';

        resultDiv.setAttribute('data-attr', result);
        resultText.innerHTML = "Result: " + result;

        lpTag.agentSDK.init({});

        try {
            getEngagementDataFromSDK();
        }
        catch (e) {
            resultDiv.setAttribute('error-data', 'error: ' + e);
        }

        function getEngagementDataFromSDK() {
            lpTag.agentSDK.get("chatInfo.isMessaging",
                function (data) {
                    if (data) {
                        // this is a messaging conversation
                        getMessagingPathTypeAndGetPaths();
                    }
                    else {
                        // this is a chat conversation
                        engagementDiv.innerHTML = 'Engagement type: livechat';
                        getDataPaths(dataPaths.chat);
                    }
                },
                function (err) {
                    if (!err) { return; }
                    resultDiv.setAttribute('data-attr', 'error fetching data type: ' + err);
                }
            );
        }

        /**
         * gets the correct type according to the visitor name and then calls getDataPaths.
         * the visitor'name is expected to be in the template "visitor_<type of test>_<timestamp>"
         * the timestamp is needed so that the visitor's name will be unique
         * for example "visitor_deleted_cmp_1234565434564"
         */
        function getMessagingPathTypeAndGetPaths() {
            lpTag.agentSDK.get("visitorInfo.visitorName",
                function (data) {
                    var type = (typeof data === 'string' && data) || '';
                    var dataPathType = '';
                    switch (true) {
                        case type.indexOf('without_LOB') != -1:
                            dataPathType = 'messagingNoLOB';
                            break;
                        case type.indexOf('deleted_cmp') != -1:
                            dataPathType = 'messagingDeletedCampaign';
                            break;
                        case type.indexOf('basic_info') != -1:
                            dataPathType = 'messagingBasicInfo';
                            break;
                        case type.indexOf('deleted_eng') != -1:
                            dataPathType = 'messagingDeletedEngagement';
                            break;
                        case type.indexOf('SDE') != -1:
                            dataPathType = 'messagingWithSDE';
                            break;
                        case type.indexOf('full_info') != -1:
                        default:
                            dataPathType = 'messagingFullInfo';
                            break;
                    }
                    engagementDiv.innerHTML = 'Engagement type: asyncMessaging, ' + dataPathType;
                    resultDiv.setAttribute('data-type', dataPathType);
                    getDataPaths(dataPaths[dataPathType]);
                },
                function (err) {
                    if (!err) { return; }
                    resultDiv.setAttribute('data-attr', 'error fetching data type: ' + err);
                }
            );
        }

        /**
         * Goes through the object and retureves the listed data paths. 
         * after the rerieval it lists it in the table and updates the result if the data should or shouldn't have been available
         * @param {*} dataPathsObject 
         */
        function getDataPaths(dataPathsObject) {
            if (!dataPathsObject) {return ;}

            dataPathsObject.forEach(function (path) {
                lpTag.agentSDK.get(path.name,
                    function (data) {
                        var rowNode = document.createElement('tr');
                        rowNode.innerHTML = "<td>" + path.name.replace('.', ': ') + "</td><td>" + (typeof data === 'object' ? JSON.stringify(data) : data) + "</td>";
                        tableEl.appendChild(rowNode);

                        // if the added data shouldn't have been available.
                        if (data && !path.shouldBeAvailable) {
                            rowNode.className += ' additionalData';
                            var errString = "[additionalData: " + path.name + "]";
                            result === 'OK' ? (result = errString) : (result += (", " + errString));
                            resultDiv.setAttribute('data-attr', result);
                            resultText.innerHTML = "Result: invalid (excess data)";
                            resultText.classList.add('error');
                        }

                        // if there is no data- checks if it should have been available or not.
                        if (!data || (data instanceof Array && !data.length)) {
                            if (path.shouldBeAvailable) {
                                var errString = "[Missing: " + path.name + "]";
                                result === 'OK' ? (result = errString) : (result += (", " + errString));
                                rowNode.className += ' warning';
                                resultDiv.setAttribute('data-attr', result);
                                resultText.innerHTML = "Result: invalid (missing data)";
                                resultText.classList.add('error');
                            }
                            else {
                                rowNode.className += ' missingOK';
                            }
                        }
                    },
                    function (err) {
                        if (err) {
                            var rowNode = document.createElement('tr');
                            rowNode.innerHTML = "<td>" + path.name + "</td><td>" + err + "</td>";

                            tableEl.appendChild(rowNode);

                            var errString = "[Error: " + path.name + "]";
                            result === 'OK' ? (result = errString) : (result += (", " + errString));
                            rowNode.className += ' warning';
                            resultDiv.setAttribute('data-attr', result);
                            resultText.innerHTML = "Result: " + result;
                        }
                    }
                );
            });
        }

    };

})();
