var LidarListener = new ROSLIB.Topic({
    ros : ros,
    name : '/AlbertScan',
    messageType : 'laser_avoidance/AlbertScan'
});


LidarListener.subscribe(function(message) {
    LidarUpdate(message)
});

function LidarUpdate(message) {
    if (!LidareRefresh) {
        return;
    }

    if (!LidarDisplay) {
        return;
    }

    const series1 = LidarDisplay.get('lidar');  
    const data = [];
    for (let i = 0; i < message.ranges.length; i++) {
        data.push([90-i,message.ranges[i]])
    }
    series1.setData(data, true, false, false);

    const series2 = LidarDisplay.get('lidar2');
    const data2 = [];
    for (let i = 0; i < message.ranges2.length; i++) {
        data2.push([90-i,message.ranges2[i]])
    }
    series2.setData(data2, true, false, false);
}


function do_lidar_freeze (obj) {
    if (LidareRefresh == true)
    {
        obj.style.background = '#f7afc1';
        LidareRefresh = false;
    }
    else
    {
        obj.style.background = '#ccff99';
        LidareRefresh = true;
    }
}

function do_lidar_zoom (obj) {
    if (LidarZoom == false)
    {
        obj.style.background = '#f7afc1';
        LidarZoom = true;
        LidarDisplay.yAxis[0].setExtremes(0,1);
    }
    else
    {
        obj.style.background = '#ccff99';
        LidarZoom = false;
        LidarDisplay.yAxis[0].setExtremes(0);
    }
}