import {Row, Col, Divider, Typography , Layout, Menu, Breadcrumb  } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Title, Text } = Typography;

function Contents(props) {
    // props.contentKey corresponds to the menu key clicked
    return (
        <div>
            {props.contentKey == 'welcome' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Auto Hadoop Provisioner</Title>
                            </Col>
                        </Row>

                        <Divider />
                        
                        <Row justify="start" align="middle">
                            <Col>
                                <Text>In this page you will find information on how this application works</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey == 'builder' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Cluster Builder</Title>
                            </Col>
                        </Row>

                        <Divider />
                        
                        <Row justify="start" align="middle">
                            <Col>
                                <Text>The cluster builder is a way of configuring a Hadoop cluster through an easy to use UI.</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey == 'diagram' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Cluster Diagram</Title>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="start" align="middle">
                            <Col>
                                <Text>The cluster diagram is used as a way to visualy explore the different compnents of your cluster and how they interact with each other.</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey == 'monitor' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Cluster Monitoring</Title>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="start" align="middle">
                            <Col>
                                <Text>The cluster monitor component can be seen as a hub for your Hadoop cluster.</Text>
                                <Text>Hadoop components links...</Text>
                                <Text>Hadoop job builder...</Text>
                            
                            </Col>
                        </Row>
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <Text>Hadoop components links...</Text>
                            </Col>
                        </Row>
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <Text>Hadoop job builder...</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey == 'overview' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Hadoop Overview</Title>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="start" align="middle">
                            <Col>
                                <Text>What Hadoop is used for</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey == 'name node' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Hadoop Name Node</Title>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="start" align="middle">
                            <Col>
                                <Text>.</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey == 'data node' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Hadoop Data Node</Title>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="start" align="middle">
                            <Col>
                                <Text>.</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey == 'yarn' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Hadoop YARN</Title>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="start" align="middle">
                            <Col>
                                <Text>.</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey == 'spark' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Title>Hadoop Spark</Title>
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="start" align="middle">
                            <Col>
                                <Text>.</Text>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
        </div>
    );
}

export default Contents;