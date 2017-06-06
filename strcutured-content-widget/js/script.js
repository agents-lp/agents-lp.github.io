(function(){
  window.onload = function() {
    lpTag.agentSDK.init({});

    lpTag.agentSDK.command(
      lpTag.agentSDK.cmdNames.writeSC, 
      {}, 
      function(){}
      );
  }
})();