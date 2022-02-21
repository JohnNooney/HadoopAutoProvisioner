import {Row, Col, Select, Divider, Switch, Form, Button, Input  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

function ClusterBuilder() {
  const [activeSelector, setActiveSelector] = useState("");
  const [form] = Form.useForm();

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

  function onTestClick(values){
    
    console.log(values);
    //alert(values['data-node-input']);
  }

  return (
    <div className="cluster-builder">
      {/* TODO: REMOVE THIS... or reuse */}
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


      {/* <div className='cluster-config'>
        <Row justify="start" align="bottom">
          <Col>
            <h1>Fill out the information below to build your Hadoop cluster.</h1>
          </Col>
          
        </Row>

        <Divider />

        <div className='name-node-config'>
          <Row justify="start" align="bottom">
            <Col>
              <h2>Name Node Config</h2>
            </Col>
            
          </Row>
        </div>

        <Divider />

        <div className='worker-node-config'>
          <Row justify="start" align="bottom">
            <Col>
              <h2>Data Node Config</h2>
            </Col>
          </Row>
          <Row justify="start" align="middle">
            <Col>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Number of Worker Nodes"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="1">One</Option>
                <Option value="2">Two</Option>
                <Option value="3">Three</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className='yarn-node-config'>
          <Row justify="start" align="bottom">
            <Col>
              <h2>Yarn Config</h2>
            </Col>
          </Row>
          
          <Row justify="start" align="middle">
            <Col align='bottom'>
              <p>Resource Manager</p>
            </Col>
            <Col>
              <Switch />
            </Col>
          </Row>

          <Row justify="start" align="middle">
            <Col>
              <p>Test</p>
            </Col>
            <Col>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Resource Manager"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="1">One</Option>
                <Option value="2">Two</Option>
                <Option value="3">Three</Option>
              </Select>
            </Col>
          </Row>

          <Row justify="start" align="middle">
            <Col>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Number of Node Managers"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="1">One</Option>
                <Option value="2">Two</Option>
                <Option value="3">Three</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <Divider />

        <div className='extras-config'>       
          <Row justify="start" align="bottom">
            <Col>
              <h2>Extras</h2>
            </Col>
            
          </Row>
        </div> 
        

        
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

      
      </div> */}

      <div className='cluster-config-form'> 
        <Row justify="start" align="bottom">
          <Col>
            <h1>Fill out the information below to build your Hadoop cluster.</h1>
          </Col>
          
        </Row>

        <Divider />

        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          form={form}
          onFinish={onTestClick}
        >
          <div className='name-node-config'>
            <Row justify="start" align="bottom">
              <Col>
                <h2>Name Node Config</h2>
              </Col>
            </Row>
          </div>

          <Divider />

          <Form.Item name='name-node-input' label="Input">
            <Input />
          </Form.Item>
          <Form.Item name='name-node-select' label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='name-node-switch' label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>

          <div className='data-node-config'>
            <Row justify="start" align="bottom">
              <Col>
                <h2>Data Node Config</h2>
              </Col>
            </Row>
          </div>

          <Divider />

          <Form.Item name='data-node-input' label="Input">
            <Input />
          </Form.Item>
          <Form.Item name='data-node-select' label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='data-node-switch' label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>

          <div className='yarn-node-config'>
            <Row justify="start" align="bottom">
              <Col>
                <h2>Yarn Config</h2>
              </Col>
            </Row>
          </div>

          <Divider />

          <Form.Item name='yarn-node-input' label="Input">
            <Input />
          </Form.Item>
          <Form.Item name='yarn-node-select' label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='yarn-node-switch' label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>

          <div className='extras-config'>
            <Row justify="start" align="bottom">
              <Col>
                <h2>Extras Config</h2>
              </Col>
            </Row>
          </div>

          <Divider />

          <Form.Item name='extras-input' label="Input">
            <Input />
          </Form.Item>
          <Form.Item name='extras-select' label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name='extras-switch' label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div> 
    </div>
  );
}

export default ClusterBuilder;