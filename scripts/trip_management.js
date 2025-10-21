var tripListClient = new ROSLIB.Service({
    ros : ros,
    name : '/ListTrips',
    serviceType : 'mcp/ListTrips'
  });


  var doTripClient = new ROSLIB.ActionClient({
    ros : ros,
    serverName : '/doTrip',
    actionName : 'mcp/DoTripAction'
  });

function trip_action (message)
{
    document.getElementById('NavTargetLabel').innerText = "starting...";

    var goal = new ROSLIB.Goal({
        actionClient : doTripClient,
        goalMessage : {
            // same as below in update_trip_menu
            tripName : message
        }
    });

    goal.on('feedback', function(feedback) {
        console.log('Feedback: ' + feedback.nextGoal);
        document.getElementById('NavTargetLabel').innerText = 'Next : ' + feedback.nextGoal;
    });

    goal.on('result', function(result) {
        console.log('Final Result: ' + result.returnCode);
        if (result.returnCode == 100) {
            console.log('Trip completed successfully');
            document.getElementById('NavTargetLabel').innerText = "complete";
            select = document.getElementById('TripsMenu').selectedIndex = 0;

        }
    });
    goal.send();
}

function navigate_to (x, y, z) {
    var message = 'spot/' + x + '/' + y + '/' + z;
    trip_action(message);
}

function do_select_trip (obj)
{
    var message = 'trips/' + obj.value;
    trip_action(message);
}

function do_start_trip ()
{
    select = document.getElementById('TripsMenu');
    if (select.value == 'none') {
        console.log('no trip selected');
        return;
    }
    do_select_trip(select);
}

function do_pause_trip ()
{
    var message = 'pause';
    //trip_action(message);
}

function do_stop_trip ()
{
    var message = 'stop';
    //trip_action(message);
}

function update_trip_menu ()
{
    var request = new ROSLIB.ServiceRequest({
        str : "trips"
    });

    tripListClient.callService(request, function(result) {
        console.log('Result for service call on '
        + tripListClient.name
        + ': '
        + result.str);

        if (result.str == "") {
            console.log('no trips found');
            return;
        }
        trips = JSON.parse(result.str);
        console.log('trips: ' + trips);


        var select = document.getElementById('TripsMenu');
        // for each item in result.str.trips, add an option to the select

        trips.forEach(trip => {
                console.log('adding trip to menu: ' + trip);
                var option = document.createElement('option');
                option.value = trip;
                // remove '.trip' from the text
                option.text = trip.replace('.trip', '');
                
                select.appendChild(option);
            });
  });

  
}