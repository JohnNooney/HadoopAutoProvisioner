import {Row, Col, Select, Divider, Switch, Form, Button, Input, Space, Spin  } from 'antd';
import ButtonRequest from './button-request';
import { useEffect, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

// props.clusterData is used for keeping the cluster data state
// props.clusterSetter is used for setting the cluster data state
function ClusterBuilder(props) {
  const [yarnEnabled, setYarnEnabled] = useState(false);
  const [form] = Form.useForm();
  const [isShutdownLoading, setIsShutdownLoading] = useState(false);
  const [workerNodeCount, setWorkerNodeCount] = useState();
  //const [workerManagerNodeCount, setWorkerManagerNodeCount] = useState();

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

  useEffect(() => {
    setYarnEnabled(form.getFieldValue("yarn_resource_manager"));
  },[form])


  function dataNodeChange(value) {
    //setActiveSelector(value);
    setWorkerNodeCount(value)
  }

  function yarnSwitchChange(value){
    setYarnEnabled(value);
  }

  function onSubmitClick(values){
    console.log(values);
    //alert(JSON.stringify(form.getFieldsValue(), null, 2));
    //alert(values['data_node_input']);
  }

  function onFill(){
    form.setFieldsValue(defaultData);
    // set yarn switch state
    yarnSwitchChange(defaultData.yarn_resource_manager);
    //props.clusterSetter(defaultData);
  }

  function onReset(){
    form.resetFields();
    yarnSwitchChange();
    //props.clusterSetter(form.getFieldsValue());
  }

  const validateMessages = {
    required: '${label} is required!',
  };

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
          validateMessages={validateMessages}
        >
          <div className='name_node_config'>
            <Divider />
            <Row justify="start" align="bottom">
              <Col>
                <h2>Name Node Config</h2>
              </Col>
            </Row>
            <br/>

            <Form.Item 
            name='name_node_cluster_name' 
            label="Cluster Name" 
            rules={[{ required: true }]}
            tooltip={{ title: 'Setting the cluster name will be used for identification purposes.', icon: <InfoCircleOutlined/>}}
            >
              <Input placeholder="Name of Cluster" disabled={props.clusterData}/>
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

            <Form.Item 
            tooltip={{ title: 'Increasing the number of data nodes will help increase performance and fault tolerance. Read more on the Home page...', icon: <InfoCircleOutlined/>}}
            name='data_node_workers' 
            label="Worker Nodes"
            rules={[
              { 
                required: true,
              }
            ]}>
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
            
            <Form.Item 
            tooltip={{ title: 'Add YARN to your cluster and be able to track and manage jobs through a UI.', icon: <InfoCircleOutlined/>}}
            name='yarn_resource_manager' 
            label="Resource Manager" 
            valuePropName="checked">
              <Switch disabled={props.clusterData}  onChange={yarnSwitchChange}/>
            </Form.Item>
            {yarnEnabled ? 
            <Form.Item 
            tooltip={{ title: 'In order for YARN to keep track of every data node, a node manager is required.', icon: <InfoCircleOutlined/>}}
            name='yarn_node_managers' 
            label="Node Managers"
            rules={[
              { 
                required: true,
              },
              ({getFieldValue}) => ({
                validator(_, value){
                  if (value == getFieldValue("data_node_workers")){
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Node Manager and Data Node count need to match"));
                },
              }),
            ]}>
              <Select
                showSearch
                placeholder="Number of Node Managers"
                optionFilterProp="children"
                defaultValue={workerNodeCount}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                disabled={props.clusterData}
              >
                <Option value="1">One</Option>
                <Option value="2">Two</Option>
                <Option value="3">Three</Option>
              </Select>
            </Form.Item> : null}
            
          </div>
         
          {yarnEnabled ?
          <div className='extras_config'>
            <Divider />
            <Row justify="start" align="bottom">
              <Col>
                <h2>Extras Config</h2>
              </Col>
            </Row>
            <br/>

            <Form.Item 
            tooltip={{ title: 'Spark will replace MapReduce computing. Making jobs run much faster by using RAM.', icon: <InfoCircleOutlined/>}}
            name='extras_spark' 
            label="Spark" 
            valuePropName="checked">
              <Switch disabled={props.clusterData}/>
            </Form.Item>
            {/* <Form.Item name='extras_historyserver' label="History Server" valuePropName="checked">
              <Switch disabled={props.clusterData}/>
            </Form.Item> */}
            {/* <Form.Item name='extras_spark_notebook' label="Spark Notebook" valuePropName="checked">
              <Switch disabled={props.clusterData}/>
            </Form.Item> */}
          </div>
          : null}

          <br/>
          
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
                      formButton = {true}
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
              <Space>
                <Col>
                  {props.clusterData != null ? <ButtonRequest
                    requestType = "POST"
                    buttonText={isShutdownLoading ? "Stopping Cluster": "Stop Cluster"}
                    buttonColor="danger"
                    notificationCustomMsg = "Please wait for your cluster to stop..."
                    displayPayload = "true"
                    payloadCustomMsg = "Tearing down now: "
                    form = {form}
                    postData = {{"type":"stop"}}
                    clusterSetter = {props.clusterSetter}
                    loadingCallback = {setIsShutdownLoading}
                    disableButton = {isShutdownLoading}
                  /> : null}
                </Col>
                <Col>
                    {isShutdownLoading && <Spin/>}
                </Col>
              </Space>
            </Row>
          </div>

          
        </Form>
      </div> 
    </div>
  );
}

export default ClusterBuilder;