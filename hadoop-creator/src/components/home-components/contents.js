import {Row, Col, Divider, Typography , Layout, Button, Table, Image  } from 'antd';
import { ClusterOutlined, DashboardOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';


const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

function Contents(props) {
    // props.contentKey corresponds to the menu key clicked
    // alert(props.contentKey);

    const dataSource = [
        {
          key: '1',
          job: 'HDFS',
          op: 'Make Folder',
          mod: 'Folder Name',
          desc: 'Makes a folder with the given name in HDFS on the cluster'
        },
        {
        key: '2',
        job: 'Hadoop',
        op: 'Pi',
        mod: 'Number of Maps and Samples Per Map',
        desc: 'Runs a performance test by calculating Pi through a MapReduce operation. The higher the number of maps, the longer ther operation but this can be offset with a higher sample size per map.'
        },
        {
        key: '3',
        job: 'Hadoop',
        op: 'Terasort',
        mod: 'File Size',
        desc: 'Runs a performance test by generating a file of the given size and performs a MapReduce on it.'
        },
        {
        key: '4',
        job: 'YARN',
        op: 'Pi',
        mod: 'Number of Maps and Samples Per Map',
        desc: 'Runs a performance test by calculating Pi through a MapReduce operation. The higher the number of maps, the longer ther operation but this can be offset with a higher sample size per map.'
        },
        {
        key: '5',
        job: 'YARN',
        op: 'Terasort',
        mod: 'File Size',
        desc: 'Runs a performance test by generating a file of the given size and performs a MapReduce on it.'
        },
        {
        key: '5',
        job: 'Spark',
        op: 'Pi',
        mod: 'Number of Maps and Samples Per Map',
        desc: 'Runs a performance test by calculating Pi through a MapReduce operation. The higher the number of maps, the longer ther operation but this can be offset with a higher sample size per map.'
        },
        {
        key: '5',
        job: 'Spark',
        op: 'GroupByTest',
        mod: 'none',
        desc: 'Runs a performance test by generating a sample file and performing a MapReduce operation on it.'
        },
      ];
      
      const columns = [
        {
          title: 'Job Type',
          dataIndex: 'job',
          key: 'job',
        },
        {
          title: 'Operation',
          dataIndex: 'op',
          key: 'op',
        },
        {
          title: 'Modifier(s)',
          dataIndex: 'mod',
          key: 'mod',
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
        },
      ];

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
                                    on the left. Or if you prefer to just experient with the app first, I recommend following this short guide below. You can find a more detailed
                                    guide on the left, where each section of this website is explained thoroughly.
                                    </Paragraph>

                                    <Title level={2}>Quick Start Guide</Title>

                                    <Paragraph>Follow these simple steps in order to get a Hadoop cluster up fast.</Paragraph>
                                    <Paragraph>
                                        <ol>
                                            <li>
                                                <Text>Navigate to the <SettingOutlined /> <Text strong>Cluster Builder</Text> Tab and press the <Button size='small'>Fill</Button> button.</Text> 
                                            </li>
                                            <li>
                                                <Text>Then press the <Button type="primary" size='small'>Build Cluster</Button> button. This may take a couple minutes if this is your first time since the Hadoop container images need to be downloaded from Docker.</Text> 
                                            </li>
                                            <li>
                                                <Text>All done... Your Hadoop cluster is built.</Text> 
                                            </li>
                                            <br/>
                                            <Text strong>Optional Next Steps</Text>
                                            <li>
                                                <Text>Visually explore your cluster on the <ClusterOutlined /> <Text strong>Cluster Diagarm</Text> tab. Click on each component to learn a little about their purpose. </Text> 
                                            </li>
                                            <li>
                                                <Text>Run sample Hadoop jobs and navigate to Hadoop UIs on the <DashboardOutlined/> <Text strong>Cluster Monitoring</Text> tab.</Text> 
                                            </li>
                                            <li>
                                                <Text>Teardown your Hadoop cluster by navigating back to the <SettingOutlined />  <Text strong>Cluster Builder</Text> tab and clicking <Button type="danger" size='small'>Stop Cluster</Button>. This may take a minute or two so be patient.</Text> 
                                            </li>
                                            <li>
                                                <Text>Experiment with creating different Hadoop configurations. Happy Hadooping!</Text> 
                                            </li>
                                        </ol>
                                    </Paragraph>

                                    <Title level={2}>How It Works</Title>
                                    <Paragraph>
                                        Once you fill out the form in the <SettingOutlined /> <Text strong>Cluster Builder</Text> and click the <Button type="primary" size='small'>Build Cluster</Button> button then a POST request is made to a Flask API.
                                        The API is responsible for being the middle man betwen this website and the Hadoop Cluster. A key element of getting this to work is being able to make Docker commands from within a Docker container. This application 
                                        uses a Docker-Out-Of-Docker approach (More on this below).
                                        
                                        <br/>
                                        <br/>
                                        See the system diagram below.

                                    </Paragraph>
                                    <Image src='/system_diagram.png' />

                                    <Title level={3}>Docker</Title>
                                    <Paragraph>
                                        As a quick primer, Docker is a containerization technology that allows for applications to be bundled into a small self-contained enviroments called containers. The container only has the things required to run the application in it,
                                        ie: a lightweight version of an OS (no GUI), the required packages for the app, and the app itself. This allows for rapid deployment and portability of your app on any system that has the Docker software on it.  
                                    </Paragraph>

                                    <Paragraph>
                                        For those reasons, everything in this application is running in a container. Even the Hadoop cluster. The tricky part to getting this to work though, is being able to run Docker commands from within a Docker container. A solution to this
                                        is called <Text strong>Docker-Out-Of-Docker</Text>, where the Docker container is making Docker commands from outside it's container - essentially controlling the host's Docker software. All that is required for this is to share the host's Docker files with the container, 
                                        which is why when you look at the diagram above, you can see the Flask API is connected to the docker.socket volume. This gives the container access to the Docker software/files running on the host.
                                    </Paragraph>

                                    <Paragraph>
                                        So when you make the request from this website to build a Hadoop Cluster, a command is sent to the Flask API to start a container for each Hadoop Node, which is then forwared to the Docker host. And similarly when you make a request to run a job on this website, a request is sent to the Flask
                                        API to send a command to the Docker container the job is meant for through the Docker host. 
                                    </Paragraph>

                                    <Title level={2}>Troubleshooting Tips</Title>
                                    <Paragraph>
                                        <ul>
                                            <Text>Issue: Incosistent UI elements or bugs</Text> 
                                            <li>Try Refreshing the page or switching tabs.</li>
                                            <li>Or try restarting the API followed by a refresh of the browser. Use this command: <Text code copyable>docker restart hadoopapi</Text></li>

                                            <br/>

                                            <Text>Issue: Hadoop Cluster not starting</Text> 
                                            <li>It may be that you have to wait, sometimes it can take some time for the cluster to start up. 
                                                Otherwise, make sure the Hadoop API Docker container is running. It may need to be restarted - use these commands to restart the container:
                                                
                                                <ol>
                                                    <li>
                                                        <Text code copyable>docker rm container hadoopapi --force</Text>
                                                    </li>
                                                    <li>
                                                        <Text code copyable>docker run -dp 5000:5000 -v //var/run/docker.sock:/var/run/docker.sock -v //usr/bin/docker:/usr/bin/docker  --name hadoopapi johnnoon74/hadoopapi:latest </Text>
                                                    </li>
                                                </ol>
                                            </li>
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
                                        Simply fill out the desired attributes of your Hadoop cluster and click <Button type="primary" size='small'>Build Cluster</Button> .
                                        Once you're done with experimenting with your cluster press and <Button type="danger" size='small'>Stop Cluster</Button> button
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
                                        With a Spark node, additional functionality in the <DashboardOutlined/> <Text strong>Cluster Monitoring</Text> tab will become available. More information on what that entails can be 
                                        found in the 'Monitoring' section on the left. 
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

                                    <Title level={2}>Example Diagram</Title>
                                    <Image src='/diagram.png' />

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
                                    </Paragraph>

                                    <Paragraph>
                                        With the <Text strong>Name Node UI</Text> you are able to see an overview of your entire cluster. In this UI you can see basic statistics
                                        of your UI. Some key points to look at here are how much data is available to your cluster, how much it has used, and how many data nodes 
                                        are active in your cluster. I highly suggest looking through this UI first in case something is going wrong with your cluster, ie: jobs are
                                        not running. It may be that your data nodes were not set up properly. If that is the case, then shutting down your cluster and restarting it may 
                                        be a viable solution.

                                        In Addition you'll have a quick access link to the HDFS directories. With this link you can check to see what types of files and directories exist on your
                                        cluster. If you end up running a job to make a folder, you can go to this quick access link to view it.
                                    </Paragraph>

                                    <Paragraph>
                                        The <Text strong>Data Node UIs</Text> only become available if you have enabled the Resource Manager (YARN) on your cluster. For each data node alive in your
                                        cluster you should have a corresponding Node Manager. The Node Manager is what is providing the UI for your Data Node. I would suggest using these quick access links
                                        to check up on your Data Nodes to see some useful statistics about them.  
                                    </Paragraph>

                                    <Paragraph>
                                        The <Text strong>Resource Manager UI</Text> only becomes available if you have enabled the Resource Manager (YARN) on your cluster config. You can use this quick
                                        access link view all you YARN or Spark related jobs. This can be useful to check on the status and progress of any jobs you have started.
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

                                        Each job also has a set list of different operations they can perform where each operation has a set of different modifiers.
                                    </Paragraph>

                                    <Table dataSource={dataSource} columns={columns} />;

                                    
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
                                <Typography>
                                    
                                    <Title>Background</Title>

                                    <Paragraph>
                                    With increasiing accessibility of cloud processing in recent years, companies have been adopting strategies of collecting 
                                    and processing large amounts of information about their customers. This concept of collecting data is commonly referred to 
                                    as Big Data. With Big Data, companies can analyze trends in the market and their customer's habits.
                                    </Paragraph>
                                    <Paragraph>
                                    So with petabytes of data being generated every minute, there needs to be a system that can manage the volume, velocity, and variety of incoming data.
                                    The ideal architecture for managing Big Data is a distributed system. With a distributed system, multiple servers work together to split up data for read/write operations. 
                                    Which is exactly how Hadoop works. Hadoop is a software framework for creating a distributed storage and processing system.
                                    </Paragraph>

                                    <Title level={2}>Hadoop Distributed File System - HDFS</Title>
                                    <Paragraph>
                                    HDFS is the primary distributed storage used by Hadoop applications. A HDFS cluster primarily consists of a NameNode that manages the file system metadata and DataNodes that store the actual data.
                                    HDFS provides better data throughput than traditional file systems, in addition to high fault tolerance and native support of large datasets. Also, HDFS treats hardware failure as the norm rather than
                                    an exception. Data stored on each node is replicated across the whole cluster so in case one node fails, multiple backups exist (See the Name Node section for more information on Data Replication). 

                                    <br/>
                                    <br/>

                                    See below a diagram of a basic HDFS cluster
                                    </Paragraph>
                                    <Image src='/simple_cluster.png' />

                                    

                                </Typography>
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
                                <Typography>
                                    <Title>Hadoop Name Node</Title>
                                    <Paragraph>
                                        The Name Node or Master Node contains all meta-data info about the files stored within the cluster: Name, permissions, directory, and which nodes contain which blocks.
                                        When a file comes in to the cluster to be stored it is broken up into blocks. The Name Node makes sure to track the file directory structure and placement of blocks for each file. 
                                        However if the Name Node were to be corrupted/destroyed then the entire HDFS will be brought down. Which is why a Secondary Name Node is sometimes used - which acts as a backup in case
                                        the Primary Name Node is deleted. It is also common practice to create backups of the Name Node meta data in order to avoid total cluster failure.
                                        
                                        <br/>
                                        <br/>

                                        See an example of the Data Replication process below.
                                    </Paragraph>
                                    <Image src="/simple_cluster_replication.png" />

                                    <Title level={2}>More Resources</Title>
                                    <Paragraph>
                                        <ul>
                                            <li><a href='https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html#NameNode+and+DataNodes'>Hadoop Documentation on Name Nodes</a></li>
                                            <li><a href='https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html'>Hadoop Documentation on HDFS Architecture</a></li>
                                        </ul>
                                    </Paragraph>
                                </Typography>
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
                                <Typography>
                                    
                                    <Title>Hadoop Data Node</Title>
                                    <Paragraph>
                                        These are the slave nodes of the HDFS architecture. As a collective all the Data Nodes handle block storage and any read/write operations related to the data.
                                        For realiabilty, data is replicated across each Data Node (by default to a factor of 3). This also increases performance since any computations will be closer to the source data.

                                    </Paragraph>

                                    
                                    <Title level={2}>Map Reduce</Title>
                                    <Paragraph>
                                        There are various types of computations that a Hadoop cluster can use to process data but MapReduce runs natively on a Hadoop. MapReduce is a software framework designed to process multi-terabyte data-sets in parallel
                                        on large clusters (thousands of nodes) in a reliable and fault tolerant manner. When you run a MapReduce job on a Hadoop cluster, the input data is split into chunks and processed by a <Text strong>Map</Text> task.
                                        Then the framework sorts the outputs of the maps, which become the input of the <Text strong>Reduce</Text> task. The output of the reduce task is then aggregated together to form the new output data set. The MapReduce framework 
                                        takes care of scheduling the tasks, monitoring, and re-executing in the case of a failed task.
                                    </Paragraph>

                                    <Image src="/mapreduce.png" />

                                    <Paragraph>
                                        What makes the MapReduce jobs truley efficient however, is the data replication across the Data Nodes. The scheculer can find the Data Nodes that have the relevant data on them and run the MapReduce process on those nodes with a very high aggregate bandwith.
                                    </Paragraph>

                                    <Title level={2}>Fault Tolerance</Title>
                                    <Paragraph>
                                        In order for the Name Node to determine if the Data Nodes are ready, every 3 seconds the Data Nodes sends a heartbeat request (basically a liveness/readiness check)
                                        to the Name Node. In the case of a no reports coming from a Data Node in 10 heartbeats, the Data Node is taken out of rotation. After 10 minutes of no reports from the Data Node,
                                        the Name Node locates other Data Nodes with copies of the data that existed on that Data Node and instructs other Data Nodes to copy that data to maintain the replication factor.
                                    </Paragraph>

                                    <Paragraph>
                                        In order to recomission a dead Data Node, a manual inspection into the node needs to be done. Once the issue is resolved the Data Node can rejoin the cluster.
                                    </Paragraph>

                                    <Title level={2}>More Resources</Title>
                                    <Paragraph>
                                        <ul>
                                            <li><a href='https://docs.cloudera.com/runtime/7.2.10/hdfs-overview/topics/hdfs-datanodes-intro.html'>Cloudera Documentation on Data Nodes</a></li>
                                            <li><a href='https://hadoop.apache.org/docs/r1.2.1/hdfs_design.html#NameNode+and+DataNodes'>Hadoop Documentation on Name Nodes and Data Nodes</a></li>
                                            <li><a href='https://hadoop.apache.org/docs/r1.2.1/mapred_tutorial.html#Overview'>Hadoop Documentation on MapReduce</a></li>
                                        </ul>
                                    </Paragraph>
                                </Typography>
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
                                <Typography>
                                    
                                    <Title>Hadoop YARN</Title>
                                    <Paragraph>
                                        YARN acts as a layer in the Hadoop cluster that specifically focuses on resource management and job scheduling. Three main components are introduced into the cluster, the <Text strong>Resource Manager</Text>, <Text strong>Application Master</Text>, and the <Text strong>Node Manager</Text>. 
                                    </Paragraph>

                                    <Title level={3}>Resource Manager</Title>
                                    <Paragraph>
                                    The Resource Manager exclusivley controls scheduling and keeps pace as clusters expand to thousands of nodes managing petabytes of data.
                                    Essentially it allocates cluster resources using the scheduler and Application Manager.
                                    </Paragraph>

                                    <Title level={3}>Application Master</Title>
                                    <Paragraph>
                                    There is only one App Master per job. The App Master is responsible for the life-cycle of a job by directing the Node Manager to create, or destory a container for a job. 
                                    The App Master works directly with a given Node Manger and negotiates for resources with the Resource Manager.
                                    </Paragraph>

                                    <Title level={3}>Node Manager</Title>
                                    <Paragraph>
                                        The Node Manager is a per-machine agent who is responsible for containers, monitoring their resource usage and reporting these statistics to the Resource Manager. The containers that
                                        the Node Manager creates are used for executing jobs in. Based on the App Master's request the Node Manager will allocate or destory containers.
                                    </Paragraph>

                                    <Image src="/yarn.png" />

                                    <Title level={2}>More Resources</Title>
                                    <Paragraph>
                                        <ul>
                                            <li><a href='https://docs.cloudera.com/runtime/7.2.10/yarn-overview/topics/yarn-introduction-yarn.html'>Cloudera Documentation on YARN</a></li>
                                            <li><a href='https://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/YARN.html'>Hadoop Documentation on YARN</a></li>
                                        </ul>
                                    </Paragraph>
                                </Typography>
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
                                <Typography>
                                    
                                    <Title>Hadoop and Spark</Title>
                                    <Paragraph>
                                        Spark is a popular computational software framework to use with Hadoop as a way of replacing Hadoop's native MapReduce scheduler/executor. The main reason why Spark is used instead of MapReduce is because
                                        of the huge performance boost in computations (100x faster on small workloads). This is because Spark uses RAM for it's computations - it processes and retains data in memory for subsequent steps, whereas MapReduce 
                                        processes data on disk. 
                                    </Paragraph>

                                    <Paragraph>
                                        In order for Spark to work with a Hadoop cluster, YARN is required. This is because Spark needs to communicate with the cluster manager (Resource Manager) in order to allocate resources on the data nodes. When executing 
                                        a Spark program the following steps are taken. 

                                        <br/>
                                        <br/>

                                        <ol>
                                            <li>
                                                A <Text strong>Driver</Text> program is started on the Spark Master node.    
                                            </li>
                                            <li>
                                                The <Text strong>Driver</Text> node then <Text strong>communicates with the Resource Manager</Text> to allocate <Text strong>exector</Text> processes on the worker nodes (Data Nodes).    
                                            </li>
                                            <li>
                                                The <Text strong>Executors</Text> (typically one per node) then runs the program that was sent by the client as a series of tasks.    
                                            </li>
                                            <li>
                                                The <Text strong>Executors</Text> communicate with each other, the <Text strong>Driver</Text> program, and the <Text strong>Resource Manager</Text> in order to coordinate job tasks and statuses.    
                                            </li>
                                            <li>
                                                On job completion on <Text strong>Executors</Text> are torn down.
                                            </li>
                                        </ol>

                                        <br/>

                                        See below a diagram of this process.
                                    </Paragraph>

                                    <Image src="/spark.png" />

                                    <Title level={2}>More Resources</Title>
                                    <Paragraph>
                                        <ul>
                                            <li><a href='https://spark.apache.org/docs/latest/'>Spark Documentation</a></li>
                                            <li><a href='https://spark.apache.org/docs/latest/cluster-overview.html'>Spark Documentation - Running in a cluster</a></li>
                                            <li><a href='https://spark.apache.org/docs/latest/running-on-yarn.html'>Spark Documentation - Using YARN and Spark</a></li>
                                            <li><a href='https://www.ibm.com/cloud/blog/hadoop-vs-spark'>IBM Hadoop vs. Spark Blog Post</a></li>
                                        </ul>
                                    </Paragraph>
                                </Typography>
                            </Col>
                        </Row>
                    </div> 
                </Content>
            }
        </div>
    );
}

export default Contents;