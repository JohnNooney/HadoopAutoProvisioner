import {Row, Col, Select, Divider, Space, Card, Form, Input, Button } from 'antd';


const { Option } = Select;

function ClusterDashboard(props) {
    const [jobForm] = Form.useForm();

    function onSubmitClick(){

    }

    let counter = 0;
    
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
                                    counter++
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
                                            rules={[{required:true, message:'Job type required'}]}
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
                                            rules={[{required:true, message:'Job operation required'}]}
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
                                            name={['job','modifier']} 
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Modifier"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="time_1">Run for 1 minute</Option>
                                                <Option value="time_2">Run for 2 minutes</Option>
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