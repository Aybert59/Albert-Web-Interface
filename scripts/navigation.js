// the navigation interface



var tripTopic = new ROSLIB.Topic({
    ros : ros,
    name : '/trip',
    messageType : 'trips/trip'
});



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

