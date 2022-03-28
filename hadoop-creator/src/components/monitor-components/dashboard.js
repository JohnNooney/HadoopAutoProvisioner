import {Row, Col, Select, Space, Card, Form, Input, Button, Spin, Alert } from 'antd';
import React, { useState } from 'react';


const { Option } = Select;

function ClusterDashboard(props) {
    const [isJobLoading, setIsJobLoading] = useState(false);
    const [jobCompleteSuccess, setJobCompleteSuccess] = useState();
    const [jobForm] = Form.useForm();
    const [operation, setOperation] = useState();
    const [job, setJob] = useState();
    let counter = 0;

    function onSubmitClick(){
        // send job data to API
        sendJob(jobForm.getFieldsValue());
    }

    function onOperationSelect(value)
    {
        setOperation(value);
    }

    function onJobSelect(value)
    {
        setJob(value)
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
              setJobCompleteSuccess(true);
              if(data["payload"]){
                console.log("received data: ", data["payload"]);
              }
          })
          .finally(() => {setIsJobLoading(false);})
          .catch((error) => {
            setJobCompleteSuccess(false);
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
                                                onSelect={onJobSelect}
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
                                                { job === "spark" ?
                                                <Option value="groupby">Group By Test</Option>
                                                :
                                                <Option value="terasort">Terasort</Option>
                                                }
                                            </Select>
                                            
                                        </Form.Item>
                                        
                                    
                                        { operation === "pi" &&
                                            <Form.Item
                                            name={['job','modpi']} 
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Number of Maps"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="1000">1000 Maps</Option>
                                                    <Option value="2000">2000 Maps</Option>
                                                
                                                </Select>
                                        
                                            </Form.Item>
                                        }
                                        { operation === "terasort" &&
                                            <Form.Item
                                            name={['job','modtera']} 
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Bytes of Data"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="1000000">100 Megabytes</Option>
                                                    <Option value="10000000">1 Gigabyte</Option>
                                                    <Option value="100000000">10 Gigabytes</Option>
                                                    
                                                </Select>
                                            </Form.Item>
                                        }
                                        

                                        { operation === "pi" &&
                                            <Form.Item name={['job','modpi2']} >
                                                <Select
                                                    showSearch
                                                    placeholder="Samples per Map"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option value="8">8 samples per map</Option>
                                                    <Option value="16">16 samples per map</Option>
                                                    <Option value="24">24 samples per map</Option>
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
                                    description="If Resource Manager is enabled AND job was submitted through Spark, view detailed progress on your job through the Yarn Web UI. Otherwise please wait..."
                                    type="info"
                                />: null
                            }
                            {
                                !isJobLoading && jobCompleteSuccess != null? 
                                <Alert
                                    message={jobCompleteSuccess ? "Job Finished" : "Something went wrong!"}
                                    description={jobCompleteSuccess ? "Last job finished successfully" : "Last job finished unsuccessfully"}
                                    type={jobCompleteSuccess ? "success" : "warning"}
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