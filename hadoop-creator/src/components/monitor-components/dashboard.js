import {Row, Col, Select, Space, Card, Form, Input, Button, Spin, Alert } from 'antd';
import React, { useState } from 'react';


const { Option } = Select;

function ClusterDashboard(props) {
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [jobForm] = Form.useForm();
    const [operation, setOperation] = useState();
    let counter = 0;

    function onSubmitClick(){
        alert('job submit click');

        // send job data to API
        sendJob(jobForm.getFieldsValue());
    }

    function onOperationSelect(props)
    {
        setOperation(props);
    }

    function getMod1Placeholder()
    {
        var placeholder = "";

        if(operation === "pi"){
            placeholder = "Number of Maps";
        }
        else if(operation === "terasort"){
            placeholder = "Bytes of Data";
        }
        return placeholder;
    }

    function getMod2Placeholder()
    {

    }

    function sendJob(jobData){
        setIsJobLoading(true);

        const fetchRequest = {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            }
          }
      
          //append post data to body
          console.log("job data: ", jobData);
          fetchRequest.body = JSON.stringify({data: jobData});
      
          fetch('http://localhost:5000/command', fetchRequest)
          .then(response => {
              if(response.status >= 400){
                  console.log(response)
                  throw new Error('The HTTP status of the response: ' + response.status + ' ' + response.statusText)
              }
              else{
                  return response.json()
              }
          })
          .then(data => {
              console.log('Success:', data);
              if(data["payload"]){
                console.log("received data: ", data["payload"]);
              }
          })
          .finally(() => {setIsJobLoading(false);})
          .catch((error) => {
            console.error('Error:', error);
          });
    }
    
    return (
        <div className='cluster_monitor_dashboard'> 
            <Row justify="center" align="top">
                <Col>
                    <Card title="Cluster Component Paths">
                        <Row className justify="center" align="top" gutter={[40,24]}>
                            { props.Data.namenode &&
                            <Col align="start">
                                <Card title="Name Node">
                                    <p><a href={props.Data.namenode} target="_blank">Name Node Web UI</a></p>
                                </Card>
                            </Col>
                            }

                            { props.Data.datanodes[0] &&
                            <Col align="start">
                            <Card title="Data Node(s)">
                                {props.Data.datanodes.map(element =>{
                                    counter++;
                                    return <p><a href={element} target="_blank">Data Node {counter} Manager</a></p>
                                })}
                            </Card>
                            </Col>
                            }
                            
                            {props.Data.yarn &&
                            <Col align="start">
                                <Card title="Resource Manager">
                                    <p><a href={props.Data.yarn} target="_blank">YARN Web UI</a></p>
                                </Card>
                            </Col>
                            }

                            {/* Spark dashboard is inaccessible
                            {props.Data.spark[0] && 
                            <Col align="start">
                                <Card title="Spark">
                                    {props.Data.spark.map(element =>{
                                        counter++;
                                        return <p><a href={element} target="_blank">Spark UI {counter}</a></p>
                                    })}
                                </Card>
                            </Col>
                            } */}
                        </Row>
                    </Card>
                </Col>
            </Row>
            

            <br/>

            <Row justify='center' align='middle' gutter={[40, 24]}>
                <Col align="start">
                    <Card title="Run Jobs">
                        <Space direction="vertical">
                            <p>Select from the dropdown below the type of job you would like to run.</p>

                            <Form
                            layout="inline"
                            onFinish={onSubmitClick}
                            form={jobForm}
                            >

                                <Form.Item name='job' label="Job Builder">
                                    <Input.Group compact>
                                        <Form.Item 
                                            name={['job','type']} 
                                            rules={[{required:true, message:'Type required'}]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Job Type"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {props.Data.yarn && <Option value="yarn">Yarn</Option>}
                                                {props.Data.spark[0] && <Option value="spark">Spark</Option>}
                                                <Option value="hadoop">Hadoop</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name={['job','operation']} 
                                            rules={[{required:true, message:'Operation required'}]}
                                        >
                                            <Select
                                                showSearch
                                                onSelect={onOperationSelect}
                                                placeholder="Operation"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="pi">Pi</Option>
                                                <Option value="terasort">Terasort</Option>
                                            </Select>
                                            
                                        </Form.Item>
                                        
                                        {operation &&
                                            <Form.Item
                                            name={['job','mod1']} 
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder={getMod1Placeholder}
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    { operation === "pi" &&
                                                        <React.Fragment>
                                                            <Option value="10000">1000 Maps</Option>
                                                            <Option value="20000">2000 Maps</Option>
                                                        </React.Fragment>
                                                    }
                                                    { operation === "terasort" &&
                                                        <React.Fragment>
                                                            <Option value="100000">1 Gigabyte</Option>
                                                            <Option value="1000000">10 Gigabytes</Option>
                                                        </React.Fragment>
                                                    }
                                                    
                                                </Select>
                                                
                                            </Form.Item>
                                        }
                                        

                                        { operation === "pi" &&
                                            <Form.Item name={['job','mod2']} >
                                                <Select
                                                    showSearch
                                                    placeholder="Samples per Map"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="16">16 samples per map</Option>
                                                    <Option value="17">17 samples per map</Option>
                                                </Select>
                                            </Form.Item>
                                        }
                                        
                                    </Input.Group>
                                </Form.Item>

                                <Form.Item>
                                    {isJobLoading ?
                                    <Spin />
                                    : 
                                    <Button type='primary' htmlType="submit">
                                        Submit
                                    </Button>}
                                    
                                </Form.Item>
                            </Form>
                            {
                                isJobLoading ? 
                                <Alert
                                    message="Job running..."
                                    description="View detailed progress on your job through the Yarn Web UI"
                                    type="info"
                                />: null
                            }
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ClusterDashboard;