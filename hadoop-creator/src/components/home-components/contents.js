import {Row, Col, Divider, Typography , Layout  } from 'antd';
import { HomeOutlined } from '@ant-design/icons';


const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

function Contents(props) {
    // props.contentKey corresponds to the menu key clicked
    // alert(props.contentKey);
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
                                            <li>Try Refreshing the page or switching tabs.</li>

                                            <br/>

                                            <Text>Issue: Hadoop Cluster not starting</Text> 
                                            <li>Make sure the Hadoop API Docker container is running. It may need to be restarted, use these commands to restart the container.</li>
                                            <br/>

                                            <Text>Issue: Jobs not showing up in YARN UI</Text> 
                                            <li>At the moment the <Text strong>only Spark jobs that are able to show up in the YARN UI</Text>. This is because of an issue with the configuration file for the cluster not working as intended.</li>
                                        
                                            <br/>

                                            <Text>Issue: Jobs not running</Text> 
                                            <li>There may be a problem with the cluster and/or API. First stop the cluster and then restart the API with the same commands as above.</li>
                                        
                                        </ul>
                                    </Paragraph>

                                </Typography>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey === 'builder' &&
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

                                    <Paragraph>
                                        Below you will find a detailed description of what each configuration field does in this application. 
                                        And for those who are curious, you will also find an explainantion of how the Cluster Builder communicates with the API. 
                                    </Paragraph>

                                    <Title level={2}>Name Node Config</Title>
                                    <Paragraph>
                                        The Name Node configuration only has one field: 'Cluster Name'. All this attribute does is apply a name to your cluster
                                        within the Name Node Docker container. Even though it is a required field, it doesn't serve any other purpose other
                                        than identification.
                                    </Paragraph>

                                    <Title level={2}>Data Node Config</Title>
                                    <Paragraph>
                                        Data Nodes are essential to the distributed nature of Hadoop. It's important to note that only a <Text strong>maximum of 3 Data Nodes are allowed</Text> due to resources potentially being limited on tester's 
                                        computers. You may also notice that there are no attributes for declaring how 
                                        much memory these Data Nodes are allowed. This is because Docker handles the distribution of resources to all the containers.
                                        
                                    </Paragraph>

                                    <Title level={2}>Yarn Config</Title>
                                    <Paragraph>
                                        In this section the only attributes you need to worry about is if you want to use YARN and how many Node Managers you want.
                                        Keep in mind that <Text strong>the number of Node Managers should always match the number of Data Nodes</Text>. This is because in order for YARN's resource manager
                                        to be aware of the Data Node, a YARN Node Manager is required. If you were to submit a YARN Job then the resource manager will only send onOperations 
                                        to the Data Nodes that it is aware of. 
                                    </Paragraph>

                                    <Title level={2}>Extras Config</Title>
                                    <Paragraph>
                                        Here the only Extra for now is the inclusion of Spark. When you enable Spark then a Spark node will be spun up with the cluster. 
                                        With a Spark node, additional functionality in the 'Cluster Monitoring' tab will become available. More information on what that entails can be 
                                        found in the 'Monitoring' section on the left. 
                                    </Paragraph>

                                    <Title level={2}>How It Works</Title>
                                    <Paragraph>
                                        Once you fill out the form on the UI and click the 'Build Cluster' button then a POST request is made to an API.
                                        The API is responsible for being the middle man betwen this website and the Hadoop Cluster. See the diagram below.

                                    </Paragraph>

                                </Typography>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey === 'diagram' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Typography>
                                    
                                    <Title>Cluster Diagram</Title>
                                    <Paragraph>
                                        The cluster diagram is used as a way to visualy explore the different compnents of your cluster and how they interact with each other.
                                        Each time a new cluster configuration is created, the diagram is dynamically updated and generated. Another key feature of this component
                                        is the ability to click on each component and see how it is interacting with it's connecting components. Use this to learn more about how
                                        Hadoop components interact with each other. 
                                    </Paragraph>

                                    <Title level={2}>Known Bugs</Title>
                                    <Paragraph>
                                        <ul>
                                            <li>
                                                <Text>
                                                    Anytime you switch tabs and click in the chart, the diagram jumps to different coordinates. 
                                                    This is just a visual bug, so need to worry about something happenign to your cluster.
                                                </Text>
                                            </li>
                                        </ul>
                                    </Paragraph>

                                </Typography>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey === 'monitor' &&
                <Content className='home_content'>
                    <div className='home_title'> 
                        <Row justify="start" align="middle">
                            <Col>
                                <br/>
                                <br/>
                                <Typography>
                                    
                                    <Title>Cluster Monitoring</Title>
                                    <Paragraph>
                                        The Cluster Monitor can be seen as a hub for your Hadoop cluster. Here you can view all the links to your Cluster's web UIs. 
                                        With the Name Node UI you are able to see an overview of your entire cluster as well as the HDFS file structure of it. 
                                    </Paragraph>

                                    <Title level={2}> Job Builder</Title>
                                    <Paragraph>
                                        The job builder allows you to send out sample jobs to your cluster. You may notice that there are multiple
                                        types of jobs you can run:

                                        <ul>
                                            <li>
                                                <Text>Hadoop</Text>
                                            </li>
                                            <li>
                                                <Text>YARN</Text>
                                            </li>
                                            <li>
                                                <Text>Spark</Text>
                                            </li>
                                            <li>
                                                <Text>HDFS</Text>
                                            </li>
                                        </ul>
                                        <br/>

                                        Each job also has a set list of different operations they can perform.
                                    </Paragraph>
                                </Typography>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
            {props.contentKey === 'overview' &&
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
            {props.contentKey === 'name node' &&
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
            {props.contentKey === 'data node' &&
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
            {props.contentKey === 'yarn' &&
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
            {props.contentKey === 'spark' &&
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