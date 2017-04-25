(function(){

    window.onload = function() {
        var resultDiv = document.getElementById('result_div'),
            tableEl = document.getElementById('table'),
            result = 'OK',
            parameters = window.location.search.slice(1).split('&');

        parameters.forEach(function(param){
            var parts = param.split('=');

            var rowNode = document.createElement('tr');
            rowNode.innerHTML = "<td>" + parts[0] + "</td><td>" + parts[1] + "</td>";

            tableEl.appendChild(rowNode);

            if(!parts[1]) {
                result === 'OK' ? (result = 'Missing: ' + parts[0]) : (result += (", " + parts[0]));
                rowNode.className += ' warning';
            }
        });

        resultDiv.setAttribute('data-attr',result);
    };

})();
