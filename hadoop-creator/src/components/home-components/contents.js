import {Row, Col, Divider, Typography , Layout, Menu, Breadcrumb  } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;

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
                                <Typography>

                                    <Title>Auto Hadoop Provisioner</Title>

                                    <Paragraph>
                                    The goal of this application is to abstract the complexities of using and setting up Hadoop from the user. 
                                    In doing so, this app will provide a quick way of setting up a cluster through the use of Docker containers. 
                                    This website can be seen as a hub where you can quickly configure a Hadoop cluster and start experimenting with it.
                                    </Paragraph>

                                    <Paragraph>
                                    Not only does this application serve as a playground for Hadoop but it will also help teach you about how Hadoop works.
                                    If you have never used Hadoop or would like a quick refresher please read through some of the documentation in the Hadoop section 
                                    on the left. Or if you prefer to just experient with the app first, I recommend following this short guide below. Alternatively, you can find a more detailed
                                    detailed guide on the left, where each section of this website is explained thoroughly.
                                    </Paragraph>

                                    <Title level={2}>Quick Start Guide</Title>

                                    <Paragraph>Follow these simple steps in order to get a Hadoop cluster up fast.</Paragraph>
                                    <Paragraph>
                                        <ol>
                                            <li>
                                                <Text>Navigate to the <Text strong>Cluster Builder</Text> Tab and press the 'Fill' button.</Text> 
                                            </li>
                                            <li>
                                                <Text>Then press the 'Start Cluster' button. This may take a couple minutes if this is your first time since the Hadoop container images need to be downloaded from Docker.</Text> 
                                            </li>
                                            <li>
                                                <Text>All done... Your Hadoop cluster is built.</Text> 
                                            </li>
                                            <br/>
                                            <Text strong>Optional Next Steps</Text>
                                            <li>
                                                <Text>Visually explore your cluster on the <Text strong>Cluster Diagarm</Text> tab. Click on each component to learn a little about their purpose. </Text> 
                                            </li>
                                            <li>
                                                <Text>Run sample Hadoop jobs and navigate to Hadoop UIs on the <Text strong>Cluster Monitoring</Text> tab.</Text> 
                                            </li>
                                            <li>
                                                <Text>Teardown your Hadoop cluster by navigating back to the <Text strong>Cluster Builder</Text> tab and clicking 'Stop Cluster'. This may take a minute or two so be patient.</Text> 
                                            </li>
                                            <li>
                                                <Text>Experiment with creating different Hadoop configurations. Happy Hadooping!</Text> 
                                            </li>
                                        </ol>
                                    </Paragraph>

                                    <Title level={2}>Troubleshooting Tips</Title>
                                    <Paragraph>
                                        <ul>
                                            <Text>Issue: Incosistent UI elements or bugs</Text> 
                                            <li>Try Refreshing the page</li>

                                            <br/>

                                            <Text>Issue: Hadoop Cluster not starting</Text> 
                                            <li>Make sure the Hadoop API Docker container is running. It may need to be restarted, use these commands to restart the container.</li>
                                        </ul>
                                    </Paragraph>

                                </Typography>
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
                                <Typography>
                                    <Title>Cluster Builder</Title>
                                    <Paragraph>
                                        The cluster builder is a way of configuring a Hadoop cluster through a form. 
                                        Simply fill out the desired attributes of your Hadoop cluster and click 'Build Cluster'.
                                        Once you're done with experimenting with your cluster press and 'Stop Cluster' button
                                        and wait until your cluster has been torndown.
                                    </Paragraph>

                                    <Title level={3}>Name Node Config</Title>
                                    <Paragraph>
                                        The Name Node configuration only has one field: 'Cluster Name'. All this attribute does is apply a name to your cluster
                                        within the Name Node Docker container. Even though it is a required field, it doesn't serve any other purpose other
                                        than identification.
                                    </Paragraph>

                                    <Title level={3}>Data Node Config</Title>
                                    <Paragraph>
                                        Data Nodes are essential to the distributed nature of Hadoop. But due to resources potentially being limited on tester's 
                                        computers only a maximum of 3 Data Nodes are allowed. You may also notice that there are no attributes for declaring how 
                                        much memory these Data Nodes are allowed. This is because Docker handles the distribution of resources to all the containers.
                                        
                                    </Paragraph>

                                    <Title level={3}>Yarn Config</Title>

                                    <Title level={3}>Extras Config</Title>

                                    <Title level={2}>How It Works</Title>

                                </Typography>
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