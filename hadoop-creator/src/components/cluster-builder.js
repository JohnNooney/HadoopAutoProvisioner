import { Button, Row, Col, Divider } from 'antd';

function ClusterBuilder() {
  return (
    <div className="ClusterBuilder">
      <Row justify="start" align="bottom">
        <Col>
          <h1>Press the button below to spin-up a cluster</h1>
        </Col>
      </Row>

      <Row justify="start" align="middle">
        <Col>
          <Button type="primary" onClick={buttonClick}>Button</Button>
        </Col>
      </Row>
    </div>
  );
}

function buttonClick(){
  alert("Button Clicked");
}

export default ClusterBuilder;