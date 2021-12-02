import {Row, Col, Select  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

function ClusterBuilder() {
  return (
    <div className="ClusterBuilder">
      <Row justify="end" align="middle">
        < Col >
          <ButtonRequest
            requestType = "GET"
            buttonText="Test API"
            buttonColor="primary"
            notificationCustomMsg = "Please wait for a response..."
            displayPayload = "true"
            payloadCustomMsg = "Your response: "
          />
        </Col>
      </Row>
      <Row justify="start" align="bottom">
        <Col>
          <h1>Press the button below to spin-up a cluster or test container</h1>
        </Col>
        
      </Row>
      

      <Row justify="start" align="middle">
        <Col>
          <DockerRun/>
        <Col>
          <ButtonRequest
            requestType = "POST"
            buttonText="Spin-Up"
            buttonColor="primary"
            notificationCustomMsg = "Please wait for your container to start..."
            displayPayload = "true"
            payloadCustomMsg = "Your Container ID: "
            postData = {{"data":activeSelector}}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ClusterBuilder;