import {Row, Col, Select, Divider, Switch, Form, Button, Input, Space  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

// props.clusterData is used for keeping the cluster data state
// props.clusterSetter is used for setting the cluster data state
function ClusterBuilder(props) {
  // const [activeSelector, setActiveSelector] = useState("");
  const [form] = Form.useForm();
  form.setFieldsValue(props.clusterData);
  const defaultData={
    data_node_workers:'1',
    extras_spark:true,
    extras_spark_notebook:true,
    extras_switch:true,
    name_node_cluster_name:'TestCluster',
    name_node_secondary_name_node:true,
    yarn_node_managers:'1',
    yarn_resource_manager:true,
  };



  function dataNodeChange(value) {
    //setActiveSelector(value);
    console.log(`selected ${value}`);
  }

  function yarnNodeChange(value) {
    //setActiveSelector(value);
    console.log(`selected ${value}`);
  }

  // Not in use - using custom button instead
  function onSubmitClick(values){
    console.log(values);
    //alert(JSON.stringify(form.getFieldsValue(), null, 2));
    //alert(values['data_node_input']);
  }

  function onFill(){
    form.setFieldsValue(defaultData);
    //props.clusterSetter(defaultData);
  }

  function onReset(){
    form.resetFields();
    //props.clusterSetter(form.getFieldsValue());
  }

  return (
    <div className="cluster_builder">
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

      <div className='cluster_config_form'> 
        <Row justify="center" align="bottom">
          <Col>
            <h1>Fill out the information below to build your Hadoop cluster.</h1>
          </Col>
          
        </Row>

        <Form
          labelCol={{
            offset: 1,
          }}
          wrapperCol={{
            span: 5,
          }}
          layout="horizontal"
          form={form}
          onFinish={onSubmitClick}
        >
          <div className='name_node_config'>
            <Divider />
            <Row justify="start" align="bottom">
              <Col>
                <h2>Name Node Config</h2>
              </Col>
            </Row>
            <br/>

            <Form.Item name='name_node_cluster_name' label="Cluster Name">
              <Input placeholder="Name of Cluster" disabled={props.clusterData}/>
            </Form.Item>
            <Form.Item name='name_node_secondary_name_node' label="Secondary Name Node" valuePropName="checked">
              <Switch disabled={props.clusterData}/>
            </Form.Item>
          
          </div>

          <div className='data_node_config'>
            <Divider />
            <Row justify="start" align="bottom">
              <Col>
                <h2>Data Node Config</h2>
              </Col>
            </Row>
            <br/>

            <Form.Item name='data_node_workers' label="Worker Nodes">
              <Select
                showSearch
                placeholder="Number of Worker Nodes"
                optionFilterProp="children"
                onChange={dataNodeChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                disabled={props.clusterData}
              >
                <Option value="1">One</Option>
                <Option value="2">Two</Option>
                <Option value="3">Three</Option>
              </Select>
            </Form.Item>
          </div>

          <div className='yarn_config'>
            <Divider />
            <Row justify="start" align="bottom">
              <Col>
                <h2>Yarn Config</h2>
              </Col>
            </Row>
            <br/>
            
            <Form.Item name='yarn_resource_manager' label="Resource Manager" valuePropName="checked">
              <Switch disabled={props.clusterData}/>
            </Form.Item>
            <Form.Item name='yarn_node_managers' label="Node Managers">
            <Select
                showSearch
                placeholder="Number of Node Managers"
                optionFilterProp="children"
                onChange={yarnNodeChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                disabled={props.clusterData}
              >
                <Option value="1">One</Option>
                <Option value="2">Two</Option>
                <Option value="3">Three</Option>
              </Select>
            </Form.Item>
          </div>
         

          <div className='extras_config'>
            <Divider />
            <Row justify="start" align="bottom">
              <Col>
                <h2>Extras Config</h2>
              </Col>
            </Row>
            <br/>

            <Form.Item name='extras_spark' label="Spark" valuePropName="checked">
              <Switch disabled={props.clusterData}/>
            </Form.Item>
            <Form.Item name='extras_spark_notebook' label="Spark Notebook" valuePropName="checked">
              <Switch disabled={props.clusterData}/>
            </Form.Item>
          </div>
          
          {props.clusterData == null ?
          <div className='cluster_builder_submit'>
            <Row justify='center' align='middle'>
              <Col>
                <Form.Item>
                  {/* <Button type="primary" htmlType="submit">Submit</Button> */}
                  <Space>
                    <ButtonRequest
                      requestType = "POST"
                      buttonText="Build Cluster"
                      buttonColor="primary"
                      notificationCustomMsg = "Please wait for your cluster to start..."
                      displayPayload = "true"
                      payloadCustomMsg = "Your Container ID: "
                      form = {form}
                      postData = {{"type":"cluster"}}
                      clusterSetter = {props.clusterSetter}
                    />
                    <Button htmlType="button" onClick={onFill}>Fill</Button>
                    <Button type="link" onClick={onReset}>Reset</Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </div> : null}

          <div className='cluster_builder_destroy'>
            <Row justify='center' align='middle'>
              <Col>
                {props.clusterData != null ? <ButtonRequest
                  requestType = "POST"
                  buttonText="Stop Cluster"
                  buttonColor="danger"
                  notificationCustomMsg = "Please wait for your cluster to stop..."
                  displayPayload = "true"
                  payloadCustomMsg = "Tearing down now: "
                  form = {form}
                  postData = {{"type":"stop"}}
                  clusterSetter = {props.clusterSetter}
                /> : null}
              </Col>
            </Row>
          </div>

          
        </Form>
      </div> 
    </div>
  );
}

export default ClusterBuilder;