import {Row, Col, Select  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

function ClusterBuilder() {
  const [activeSelector, setActiveSelector] = useState("");

  function onChange(value) {
    setActiveSelector(value);
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

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
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a start-up type"
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="cluster">Hadoop Cluster</Option>
            <Option value="container">Test Container</Option>
          </Select>
        </Col>
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