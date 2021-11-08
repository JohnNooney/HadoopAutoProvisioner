import { Button } from 'antd';

function ClusterBuilder() {
  return (
    <div className="ClusterBuilder">
        <p>this is the bod</p>
        <Button type="primary" onClick={buttonClick}>Button</Button>
    </div>
  );
}

function buttonClick(){
  alert("Button Clicked");
}

export default ClusterBuilder;