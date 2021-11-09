import {Button, notification} from 'antd';

function DockerRun() {
  return (
    <div className="DockerRun">
          <Button type="primary" onClick={buttonClickGet}>GET</Button>
          <Button type="primary" onClick={buttonClickPost}>POST</Button>
    </div>
  );
}

function buttonClickGet(){

    // GET start notification
    const notif = {
        "type":"info", 
        "title":"GET Status", 
        "desc":"The GET request has been sent. Please wait for a response."};
    openNotification(notif);

    fetch('http://localhost:5000/build', {
        method:'GET',
         headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);

        // success message to user
        const notif = {
            "type":"success", 
            "title":"GET Status", 
            "desc":"The GET request has been received: \n " + JSON.stringify(data)};
        openNotification(notif);
    })
    .catch((error) => {
        console.error('Error:', error);

        // error message to user
        const notif = {
            "type":"error", 
            "title":"GET Status", 
            "desc":"The GET request has failed: " + error};
        openNotification(notif);
    });
}

function buttonClickPost(){
    const data = {"data":"test from react"}

     // POST start notification
     const notif = {
        "type":"info", 
        "title":"POST Status", 
        "desc":"The POST request has been sent. Please wait for your container to start..."};
    openNotification(notif);

    fetch('http://localhost:5000/build', {
        method:'POST',
         headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // success message to user
        const notif = {
            "type":"success", 
            "title":"POST Status", 
            "desc":"The POST request has been received. Your Container ID: " + JSON.stringify(data["containerId"])};
        openNotification(notif);
    })
    .catch((error) => {
        console.error('Error:', error);
        // error message to user
        const notif = {
            "type":"error", 
            "title":"POST Status", 
            "desc":"The POST request has failed: " + error};
        openNotification(notif);
    });
}

function openNotification(details){
    notification[details["type"]]({
        message: details["title"],
        description: details["desc"],
      });
}

export default DockerRun;