import {Button} from 'antd';
var Docker = require('dockerode');

function DockerRun() {
  return (
    <div className="DockerRun">
          <Button type="primary" onClick={buttonClick}>Button</Button>
    </div>
  );
}

function buttonClick(){
    //alert("Starting container...");
    
    // nrc.run('mkdir node-test').then(function(exitCodes) {
    //     //notification
    //     alert("test complete");
    //     console.log("Container started: ", exitCodes[0]);
    // }, function(err) {
    //     console.log('Command failed to run with error: ', err);
    // });

    // nrc.run('ls ~/does/not/exist', { onError: errorCallBack });
  
}

export default DockerRun;