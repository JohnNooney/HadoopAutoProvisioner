import {Button, notification} from 'antd';

// Button that sends a request to the API
// can customize based on props provided
// props.requestType = (GET/POST/DELETE)
// props.buttonText = "Send"
// props.buttonColor = "primary"
// props.notificationCustomMsg = "Please wait for your container to start..." *will be appended to notification desc
// props.postData = {"data" : "test from react"}
// props.displayPayload = true/false
// props.payloadCustomMsg = "Your container ID: " *will be prepended to string that displays payload
function ButtonRequest(props) {
  return (
    <div className="DockerRun">
          <Button type={props.buttonColor} onClick={() => buttonClick(props)} >{props.buttonText}</Button>
    </div>
  );
}

function buttonClick(props){
    const data = {"data":"test from react"}

     // POST start notification
     const notif = {
        "type":"info", 
        "title": props.requestType + " Status", 
        "desc":"The " + props.requestType + " request has been sent. " + props.notificationCustomMsg};
    openNotification(notif);

    const fetchRequest = {
        method:props.requestType,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    //append post data if exists
    if(props.postData){
        fetchRequest.body = JSON.stringify(props.postData)
    }

    fetch('http://localhost:5000/build', fetchRequest)
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // success message to user
        const notif = {
            "type":"success", 
            "title":props.requestType + " Status", 
            "desc":"The " + props.requestType + " request has been received. " + props.payloadCustomMsg
        };

        if(props.displayPayload == "true"){
            notif["desc"] += JSON.stringify(data["payload"]);
        }
        openNotification(notif);
    })
    .catch((error) => {
        console.error('Error:', error);
        // error message to user
        const notif = {
            "type":"error", 
            "title":props.requestType + "Status", 
            "desc":"The " + props.requestType + " request has failed: " + error};
        openNotification(notif);
    });
}

function openNotification(details){
    notification[details["type"]]({
        message: details["title"],
        description: details["desc"],
      });
}

export default ButtonRequest;