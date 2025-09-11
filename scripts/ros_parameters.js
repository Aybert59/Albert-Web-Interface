 // Getting and setting a param value
    // ---------------------------------
    
    //ros.getParams(function(params) {
        //console.log(params);
    //});

    CurrentModel = new ROSLIB.Param({
        ros : ros,
        name : '/Albert_classification/Model'
    });
    CurrentObjModel = new ROSLIB.Param({
        ros : ros,
        name : '/Albert_classification/ObjModel'
    });
    MapMode = new ROSLIB.Param({
        ros : ros,
        name : '/map_mode'
    });

    var dynaMoveRecClient = new ROSLIB.Service({
        ros : ros,
        name : '/move_base/DWAPlannerROS/set_parameters',
        serviceType : 'dynamic_reconfigure/Reconfigure'
    });

    MaxMoveVel = new ROSLIB.Param({
        ros : ros,
        name : '/move_base/DWAPlannerROS/max_vel_trans'
    })

    MapMode.get (function(value) {
        console.log('MAP MODE: ' + value);
        TheMapMode = value;

        const tabs = document.querySelectorAll('[tab-mode]')  
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })

        if (TheMapMode == 'scan') {
            document.getElementById('LidarTab').classList.add('active');
        } else {
            document.getElementById('NavTab').classList.add('active');
        }
    })
