import {Button} from 'antd';

function DockerRun() {
  return (
    <div className="DockerRun">
          <Button type="primary" onClick={buttonClick}>Button</Button>
    </div>
  );
}

function buttonClick(){
    // alert("test");
    console.log("button click");

    // const data = {
    //     "Image": "alpine", 
    //     "Cmd": ["echo", "hello world"]
    // }
    // GET request using fetch inside useEffect React hook
    fetch('http://localhost:5000/build', {
        method:'GET',
         headers: {
            'Content-Type': 'application/json',
            'Host':'http://localhost:5000',
            'Origin':'http://localhost:3000'
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

export default DockerRun;