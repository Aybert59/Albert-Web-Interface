var VoltListener = new ROSLIB.Topic({
    ros : ros,
    name : '/voltage',
    messageType : 'std_msgs/Float32'
});

VoltListener.subscribe(function(message) {
    VoltUpdate(message)
});


function VoltUpdate(message) {
    if (VoltMeter == null)
    {
        return;
    }
    var series = VoltMeter.get('vlt');
    var point = series.points[0];

    point.update(parseFloat(message.data));
    series.show ();
                                    
    console.log('Received message on ' + VoltListener.name + ': ' + message.data);
    VoltListener.unsubscribe();
}