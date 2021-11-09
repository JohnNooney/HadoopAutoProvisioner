import {Button} from 'antd';

function DockerRun() {
  return (
    <div className="DockerRun">
          <Button type="primary" onClick={buttonClickGet}>GET</Button>
          <Button type="primary" onClick={buttonClickPost}>POST</Button>
    </div>
  );
}

function buttonClickGet(){

    console.log("button click");
    fetch('http://localhost:5000/build', {
        method:'GET',
         headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function buttonClickPost(){
    const data = {"data":"test from react"}

    console.log("button click");
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
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default DockerRun;