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

    window.onload = function() {
        var resultDiv = document.getElementById('result_div'),
            tableEl = document.getElementById('table'),
            resultsObj = {
                resultsOK: {},
                resultsErr : {}
            };

        lpTag.agentSDK.init({});

        dataPaths.forEach(function(path){
            lpTag.agentSDK.bind(path,
                function(data){

                    if(!data.newValue || (data.newValue instanceof Array && !data.newValue.length)) {
                        if(resultsObj.resultsOK[data.key]) {
                            delete resultsObj.resultsOK[data.key];
                        }
                        var errString = "[Missing: " + data.key + "]";
                        resultsObj.resultsErr[data.key] = errString;
                    } else {
                        if(resultsObj.resultsErr[data.key]) {
                            delete resultsObj.resultsErr[data.key];
                        }
                        resultsObj.resultsOK[data.key] = data.newValue;
                    }
                },
                function(err){
                    if(err) {
                        resultsObj.resultsErr['bindError'] = err;
                    }
                }
            );
        });

        setInterval(redrawTable, 2000);

        //write text to the chat input area
        lpTag.agentSDK.command(lpTag.agentSDK.cmdNames.write, {text: "Sent by SDK..."});


        function redrawTable() {

            var rowNode,
                path,
                result;

            tableEl.remove();
            tableEl = document.createElement('table');
            resultDiv.appendChild(tableEl);

            rowNode = document.createElement('tr');
            rowNode.innerHTML = "<th>Parameter</th><th>Value</td>";
            tableEl.appendChild(rowNode);

            for(path in resultsObj.resultsOK) {
                rowNode = document.createElement('tr');
                rowNode.innerHTML = "<td>" + path + "</td><td>" +
                    (typeof resultsObj.resultsOK[path] === 'object' ? JSON.stringify(resultsObj.resultsOK[path]) : resultsObj.resultsOK[path]) + "</td>";
                tableEl.appendChild(rowNode);
            }

            for(path in resultsObj.resultsErr) {
                rowNode = document.createElement('tr');
                rowNode.innerHTML = "<td>" + path + "</td><td>" + resultsObj.resultsErr[path] + "</td>";
                rowNode.className += ' warning';
                tableEl.appendChild(rowNode);
            }

            if(Object.keys(resultsObj.resultsErr).length) {
                result = JSON.stringify(resultsObj.resultsErr);
            } else {
                var resultsLen = Object.keys(resultsObj.resultsOK).length;
                result = (dataPaths.length === resultsLen) ?
                    'OK' :
                    (dataPaths.length - resultsLen + " not returned") ;
            }

            resultDiv.setAttribute('data-attr', result);

        }
    };

})();
