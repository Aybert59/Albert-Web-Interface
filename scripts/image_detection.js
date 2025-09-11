
        
    var DetectListener = new ROSLIB.Topic({
        ros : ros,
        name : '/classification/detected',
        messageType : 'classification/detection'
    });

    DetectListener.subscribe(function(message) {
        DetectUpdate(message)
    });
    

    function DetectUpdate(message) {
        label = document.getElementById('Detectresult');
        var rounded = Math.round(message.probability * 1000) / 10
        label.value = message.room + ' ' + rounded + '%'; 
    }
