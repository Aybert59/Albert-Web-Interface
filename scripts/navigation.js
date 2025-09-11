// the navigation interface

 var trip_infoListener = new ROSLIB.Topic({
    ros : ros,
    name : '/tripInfo',
    messageType : 'std_msgs/String'
});

var tripTopic = new ROSLIB.Topic({
    ros : ros,
    name : '/trip',
    messageType : 'trips/trip'
});


trip_infoListener.subscribe(function(msg) {
    if (msg.data == 'end') {
        document.getElementById('TogglelNav').value = 'Start Nav';
        document.getElementById('TogglelNav').style="background-color:#ccff99"
        document.getElementById('NavTargetLabel').innerText = ' Next Target : None ';
    }
    else {      
        document.getElementById('NavTargetLabel').innerText = msg.data;
    }
})  

function navigate_to (x, y, z) {
    var tripMsg = new ROSLIB.Message({
        trip: "{\"trip\":{\"name\":\"spot\",\"speed\":100,\"poses\":[{\"name\":\"point\",\"x\":" + x + ",\"y\":" + y + ",\"z\":" + z + "}]}}"
    });
    tripTopic.publish(tripMsg);

    document.getElementById('TogglelNav').value = 'Cancel Nav';
    document.getElementById('TogglelNav').style="background-color:#f7afc1"
    CurrentGoal = true;
}

function toggle_nav (obj, navbutton) {
    if (CurrentGoal == true )
    {
        console.log('Canceling goal');

        var tripMsg = new ROSLIB.Message({
            trip: "cancel"
        });
        tripTopic.publish(tripMsg);

        obj.value = 'Start Nav';
        obj.style="background-color:#ccff99"
        CurrentGoal = false;
    }
    else
    {
        file = document.getElementById('NavFile').files[0];
        if (file == null) {
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            var data = JSON.parse(e.target.result);

            obj.value = 'Cancel Nav';
            obj.style="background-color:#f7afc1"

            var tripMsg = new ROSLIB.Message({
                trip: JSON.stringify(data)
            });
            tripTopic.publish(tripMsg);
            CurrentGoal = true;
        };
        reader.readAsText(file);
    }
}

function do_change_maxvel(obj) {
    pct = obj.value / 100.0;

    /*
    var request = new ROSLIB.ServiceRequest({
        config: {
            bools: [
                // {name: '', value: false}
            ],
            ints: [
                // {name: '', value: 0}
            ],
            strs: [
                // {name: '', value: ''}
            ],
            doubles: [
                {name: 'max_vel_trans', value: pct},
            ],
            groups: [
                // {name: '', state: false, id: 0, parent: 0}
            ]
        }
    });
*/
    var request = new ROSLIB.ServiceRequest({
        config: {
            doubles: [
                {name: 'max_vel_trans', value: pct},
            ]
        }
    });
    dynaMoveRecClient.callService(request, function(result) {
        /*
        console.log('Result for service call on '
            + dynaMoveRecClient.name
            + ': '
            + JSON.stringify(result, null, 2));
            */
           return;
    });
}

function do_select_trip (obj, navbutton) {
    let file = obj.files[0];
    console.log('selected : ' + file.name);
    if (file != null) {
        toggle_nav(document.getElementById(navbutton), navbutton);
    }
    
}