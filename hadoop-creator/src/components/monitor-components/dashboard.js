import {Row, Col, Select, Space, Card, Form, Input, Button } from 'antd';


const { Option } = Select;

function ClusterDashboard(props) {
    const [jobForm] = Form.useForm();
    let counter = 0;

    function onSubmitClick(){
        alert('job submit click');

        // send job data to API
        sendJob(jobForm.getFieldsValue());
    }

    function sendJob(jobData){
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
                                    <p><a href={props.Data.namenode}>Name Node Web UI</a></p>
                                </Card>
                            </Col>
                            }

                            { props.Data.datanodes && 
                            <Col align="start">
                            <Card title="Data Node(s)">
                                {props.Data.datanodes.map(element =>{
                                    counter++;
                                    return <p><a href={element}>Data Node {counter} Manager</a></p>
                                })}
                            </Card>
                            </Col>
                            }
                            
                            {props.Data.yarn &&
                            <Col align="start">
                                <Card title="Resource Manager">
                                    <p><a href={props.Data.yarn}>YARN Web UI</a></p>
                                </Card>
                            </Col>
                            }

                            {props.Data.spark && 
                            <Col align="start">
                                <Card title="Spark">
                                    <p><a href={props.Data.spark}>Spark UI</a></p>
                                </Card>
                            </Col>
                            }
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
                                                {props.Data.spark && <Option value="spark">Spark</Option>}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name={['job','operation']} 
                                            rules={[{required:true, message:'Operation required'}]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Operation"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="pi">Pi</Option>
                                                <Option value="map_reduce">Map Reduce</Option>
                                            </Select>
                                            
                                        </Form.Item>

                                        <Form.Item
                                            name={['job','maps']} 
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Number of Maps"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="10000">1000 Maps</Option>
                                                <Option value="20000">2000 Maps</Option>
                                            </Select>
                                            
                                        </Form.Item>
                                        <Form.Item
                                            name={['job','samples']} 
                                        >
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
                                    </Input.Group>
                                </Form.Item>

                                <Form.Item>
                                    <Button type='primary' htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ClusterDashboard;