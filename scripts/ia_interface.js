    var baseUrlIA = 'http://192.168.1.76:5001/';

        
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


    function do_select_detect (obj, name) {
        console.log('selected model ' + obj.value);
        label = document.getElementById(name);
                    
        label.innerHTML = 'Model : ' + obj.value;

        if (obj.value == 'none') {
            label = document.getElementById('Detectresult');
            label.value = 'No detection';
        }
        CurrentModel.set(obj.value);
    }

    function do_select_obj_detect_cam (obj) {
        console.log('selected camera ' + obj.value);
        var url = baseUrlIA + 'select_cam/' + obj.value;

        fetch(url)
                .then(response => response.json())

                .catch(error => {
                    console.error('Error selecting camera for object detection:', error);
                });
    }

    function do_select_obj_detect (obj, name) {
            var url;

            console.log('selected model ' + obj.value);
            label = document.getElementById(name);
                        
            label.innerHTML = 'Model : ' + obj.value;
            text_field = document.getElementById('ObjDetectresult');

            
            if (obj.value == 'none') {
                url = baseUrlIA + 'stop_detection';
            } else
            {
                url = baseUrlIA + 'start_detection/' + obj.value;
            }

            CurrentObjModel.set(obj.value);

            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    text_field.value = data.message;
                })
                .catch(error => {
                    console.error('Error fetching object detection:', error);
                });
    }

function update_obj_detect_menu ()
{

    var url = baseUrlIA + 'list_objectmodels';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var select = document.getElementById('ObjDetectMenu');
            // for each item in data.models, add an option to the select
            data.models.forEach(model => {
                console.log('adding model to menu: ' + model);
                var option = document.createElement('option');
                option.value = model;
                option.text = model;
                
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching object models:', error);
        });
}
