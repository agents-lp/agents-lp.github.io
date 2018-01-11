(function () {

    // contains the data types that can be tested (i.e. campaign without line of business) and their data paths.
    // the paths are represented as objects- name: the path name in the SDK, shouldBeAvailable: if false- the missing value will not affect the data-attr.
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
            // { name: "engagementInfo.skill", shouldBeAvailable: true }, // TODO- should be deprecated
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
        messagingOld: [
            "chattingAgentInfo.agentName",
            "chattingAgentInfo.agentId",
            "chattingAgentInfo.agentGroupName",
            "chattingAgentInfo.agentNickname",
            "agentInfo.accountId",
            "agentInfo.agentName",
            "agentInfo.agentId",
            "agentInfo.agentNickname",
            "agentInfo.agentEmail",
            "agentInfo.maxChats",
            "chatTranscript.lines",
            "visitorInfo.visitorId",
            "visitorInfo.visitorName",
            "visitorInfo.device",
            "visitorInfo.browser",
            "visitorInfo.operatingSystem",
            // "visitorInfo.IpAddress", //missing
            // "visitorInfo.visitStartTime", //missing
            "visitorInfo.chattingVisitorState",
            "campaignInfo.campaignName",
            "campaignInfo.campaignId",
            "campaignInfo.campaignDescription",
            "campaignInfo.targetAudience",
            "campaignInfo.goalName",
            "campaignInfo.goalId",
            "campaignInfo.goalDescription",
            "engagementInfo.VisitorBehavior",
            // "engagementInfo.skill", // TODO- should be deprecated
            "engagementInfo.engagementType",
            "engagementInfo.engagementId",
            "engagementInfo.engagementName",
            "engagementInfo.agentNote",
            // "engagementInfo.engagementSkill", // TODO-will be included after skill routing for messaging feature
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
        ],
        chatOld: [
            //"chattingAgentInfo.agentName",    TODO: these for should be given - under investigation
            //"chattingAgentInfo.agentId",
            //"chattingAgentInfo.agentGroupName",
            //"chattingAgentInfo.agentNickname",
            "agentInfo.accountId",
            "agentInfo.agentName",
            "agentInfo.agentId",
            "agentInfo.agentNickname",
            "agentInfo.agentEmail",
            "agentInfo.maxChats",
            "chatTranscript.lines",
            // "surveyQuestions.preChat.email.value",
            // "surveyQuestions.preChat.email.displayName",
            // "surveyQuestions.preChat.phone.value",
            // "surveyQuestions.preChat.phone.displayName",
            // "surveyQuestions.preChat.name.value",
            // "surveyQuestions.preChat.name.displayName",
            // "surveyQuestions.preChat.customizedQuestions",
            // "customVariables",
            //"surveyQuestions.postChat",
            //"surveyQuestions.agentSurvey",
            "visitorInfo.visitorId",
            "visitorInfo.visitorName",
            "visitorInfo.device",
            "visitorInfo.browser",
            "visitorInfo.operatingSystem",
            "visitorInfo.IpAddress",
            "visitorInfo.visitStartTime",
            "visitorInfo.chattingVisitorState",
            "campaignInfo.campaignName",
            "campaignInfo.campaignId",
            "campaignInfo.campaignDescription",
            "campaignInfo.targetAudience",
            "campaignInfo.goalName",
            "campaignInfo.goalId",
            "campaignInfo.goalDescription",
            "campaignInfo.lobName",
            "campaignInfo.lobId",
            "campaignInfo.lobDescription",
            "engagementInfo.VisitorBehavior",
            "engagementInfo.skill",
            "engagementInfo.engagementType",
            "engagementInfo.engagementId",
            "engagementInfo.engagementName",
            "engagementInfo.agentNote",
            "engagementInfo.engagementSkill",
            "SDE.customerDetails",
            "SDE.personalInfo",
            "SDE.marketingSource",
            "SDE.leadGeneration",
            "SDE.transaction",
            "SDE.viewedProducts",
            "SDE.shoppingCart",
            "SDE.serviceActivity",
            "SDE.error"
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
                        getMessagingPathTypeAndGetPaths();
                    }
                    else {
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

        // gets the correct type according to the visitor name and then calls getDataPaths
        function getMessagingPathTypeAndGetPaths() {
            lpTag.agentSDK.get("visitorInfo.visitorName",
                function (data) {
                    var type = data && typeof data === 'string' && data.substring(8, 19);
                    var dataPathType = '';
                    switch (type) {
                        case 'without_LOB':
                            dataPathType = 'messagingNoLOB';
                        break;
                        case 'deleted_cmp':
                            dataPathType = 'messagingDeletedCampaign';
                        break;
                        case 'basic_info_':
                            dataPathType = 'messagingBasicInfo';
                        break;
                        case 'deleted_eng':
                            dataPathType = 'messagingDeletedEngagement';
                        break;
                        case 'full_info__':
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

        function getDataPaths(dataPathsArray) {
            if (!dataPathsArray) {return ;}

            dataPathsArray.forEach(function (path) {
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
