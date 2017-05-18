(function(){

    var dataPaths = [
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
        "surveyQuestions.preChat.email.value",
        "surveyQuestions.preChat.email.displayName",
        "surveyQuestions.preChat.phone.value",
        "surveyQuestions.preChat.phone.displayName",
        "surveyQuestions.preChat.name.value",
        "surveyQuestions.preChat.name.displayName",
        "surveyQuestions.preChat.customizedQuestions",
        "customVariables",
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
        "SDE.customerDetails",
        "SDE.personalInfo",
        "SDE.marketingSource",
        "SDE.leadGeneration",
        "SDE.transaction",
        "SDE.viewedProducts",
        "SDE.shoppingCart",
        "SDE.serviceActivity",
        "SDE.error"
    ];

    window.refreshData = function () {
        var resultDiv = document.getElementById('result_div'),
            tableEl = document.getElementById('responseData'),
            result = 'OK';

        resultDiv.setAttribute('data-attr',result);

        dataPaths.forEach(function(path){
            lpTag.agentSDK.get(path,
                function(data){
                    var rowNode = document.createElement('tr');
                    rowNode.innerHTML = "<td>" + path + "</td><td>" + (typeof data === 'object' ? JSON.stringify(data) : data) + "</td>";
                    tableEl.appendChild(rowNode);
                    if(!data || (data instanceof Array && !data.length)) {
                        var errString = "[Missing: " + path + "]";
                        result === 'OK' ? (result = errString) : (result += (", " + errString));
                        rowNode.className += ' warning';
                        resultDiv.setAttribute('data-attr',result);
                    }
                },
                function(err){
                    var rowNode = document.createElement('tr');
                    rowNode.innerHTML = "<td>" + path + "</td><td>" + err + "</td>";
                    tableEl.appendChild(rowNode);
                    var errString = "[Error: " + path + "]";
                    result === 'OK' ? (result = errString) : (result += (", " + errString));
                    rowNode.className += ' warning';
                    resultDiv.setAttribute('data-attr',result);
                }
            );
        });
    };

    window.onload = function() {
        lpTag.agentSDK.init({});

        window.refreshData();
    };
})();
