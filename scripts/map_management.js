var SaveMapClient = new ROSLIB.Service({
            ros : ros,
            name : '/slam_toolbox/save_map',
            serviceType : 'slam_toolbox_msgs/SaveMap'
        });
var SaveGraphClient = new ROSLIB.Service({
    ros : ros,
    name : '/slam_toolbox/serialize_map',
    serviceType : 'slam_toolbox_msgs/SerializePoseGraph'
});
var LoadGraphClient = new ROSLIB.Service({
    ros : ros,
    name : '/slam_toolbox/deserialize_map',
    serviceType : 'slam_toolbox_msgs/DeserializePoseGraph'
});


        
function do_map_save (obj, name) {
    if (TheMapMode != 'scan') {
        console.log ("Not in scan mode");
        return;
    }
    label = document.getElementById(name);

    var request = new ROSLIB.ServiceRequest({
        name: {data: TheMapDir + label.value}
    });
    console.log ("saving map to ", TheMapDir + label.value);
    SaveMapClient.callService(request, function(result) {
        console.log('Result for service call on '
        + SaveMapClient.name
        + ': '
        + result.sum);
    });
    
    request = new ROSLIB.ServiceRequest({
        filename: TheMapDir + label.value
    });
    console.log ("serializing map to ", TheMapDir + label.value);
    SaveGraphClient.callService(request, function(result) {
        console.log('Result for service call on '
        + SaveGraphClient.name
        + ': '
        + result.sum);
    });
}

function do_map_load (obj, name) {
    label = document.getElementById(name);
    
    if (TheMapMode == 'scan') {
        request = new ROSLIB.ServiceRequest({
        filename: TheMapDir + label.value,
        match_type: 1 // START_AT_FIRST_NODE
        //initial_pose: {x: 0, y: 0, theta: 0} // {x: -3.7, y: -1.4, theta: 3.14} pour la map de test, mettre 0 sinon
    });
    } else
    {
        request = new ROSLIB.ServiceRequest({
            filename: TheMapDir + label.value,
            match_type: 3, // LOCALIZE_AT_POSE
            initial_pose: {x: 0, y: 0, theta: 0} // {x: -3.7, y: -1.4, theta: 3.14} pour la map de test, mettre 0 sinon
        });
    }
    console.log ("deserializing map from ", TheMapDir + label.value);
    LoadGraphClient.callService(request, function(result) {
        console.log('Result for service call on '
        + LoadGraphClient.name
        + ': '
        + result.sum);
    });
}