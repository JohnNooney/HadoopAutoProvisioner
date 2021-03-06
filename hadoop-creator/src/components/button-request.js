import {Button, Form, notification} from 'antd';

// Button that sends a request to the API
// can customize based on props provided
// props.requestType = (GET/POST/DELETE)
// props.buttonText = "Send"
// props.buttonColor = "primary"
// props.notificationCustomMsg = "Please wait for your container to start..." *will be appended to notification desc
// props.postData = {"data" : "test from react"}
// props.displayPayload = true/false
// props.payloadCustomMsg = "Your container ID: " *will be prepended to string that displays payload
// props.clusterSetter keeps track of cluster data state (only set on success)
// props.formButton = true/false 
function ButtonRequest(props) {
    return (
        <div className="DockerRun">
            {props.formButton ? 
            <Button htmlType='submit' disabled={props.disableButton} type={props.buttonColor} onClick={() => buttonClick(props)} >{props.buttonText}</Button>
            : 
            <Button type={props.buttonColor} disabled={props.disableButton} onClick={() => buttonClick(props)} >{props.buttonText}</Button>
            }  
        </div>
    );
}

function buttonClick(props){
    if(props.validated){
        if(props.loadingCallback){
            // set useState loading
            props.loadingCallback(true);
        }

        // POST start notification
        const notif = {
            "type":"info", 
            "title": props.notificationTitle + " Request Status", 
            "desc":"The " + props.requestType + " request has been sent. " + props.notificationCustomMsg};
        openNotification(notif);
        
        
        // set timeout to be 300 seconds maximum
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 300000)
        
        const fetchRequest = {
            method:props.requestType,
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        }

        //append post data if exists
        if(props.postData && props.form){
            //append form data
            props.postData.data = props.form.getFieldsValue();
            // alert(JSON.stringify(props.postData, null, 2));

            fetchRequest.body = JSON.stringify(props.postData)
        }

        fetch('http://localhost:5000/build', fetchRequest)
        .then(response => {
            clearTimeout(timeoutId);
            
            if(response.status >= 400){
                console.log(response)
                throw new Error('The HTTP status of the response: ' + response.status + ' ' + response.statusText)
            }
            else{
                return response.json()
            }
        })
        .then(data => {
            console.log('Success:', data);
            
            // if request has postData
            if(props.postData){
                //set cluster data using form data (used in other components)
                if(props.form && props.postData["type"] === "cluster"){
                    props.clusterSetter(props.form.getFieldsValue());
                    console.log("cluster object set using form data");
                }
        
                // if stopping cluster reset form data
                if(props.postData["type"] === "stop"){
                    props.form.resetFields();
                    props.clusterSetter(null);
                    console.log("stopping cluster. form data reset");
                }
            }
            
            // success message to user
            const notif = {
                "type":"success", 
                "title":props.notificationTitle + " Request Status", 
                "desc":"The " + props.requestType + " request has been received. " + props.payloadCustomMsg
            };

            if(props.displayPayload === "true"){
                notif["desc"] += JSON.stringify(data["payload"]);
            }
            openNotification(notif);
        })
        .finally(() => {if(props.loadingCallback){props.loadingCallback(false);}})
        .catch((error) => {
            console.error('Error:', error);
            // error message to user
            const notif = {
                "type":"error", 
                "title":props.notificationTitle + " Request Status", 
                "desc":"The " + props.requestType + " request has failed - " + error};
            openNotification(notif);
        });
    }
    else{
        console.log("Error. Not valid form.")
    }
}

function openNotification(details){
    notification[details["type"]]({
        message: details["title"],
        description: details["desc"],
      });
}

export default ButtonRequest;