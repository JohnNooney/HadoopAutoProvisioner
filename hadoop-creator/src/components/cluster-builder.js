import {Row, Col, Divider } from 'antd';
import DockerRun from './docker-run';

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
          <DockerRun/>
        </Col>
      </Row>
    </div>
  );
}

export default ClusterBuilder;