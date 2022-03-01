import {Row, Col, Select, Divider, Card, Space, Empty  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

function ClusterMonitor(props) {
  // const [activeSelector, setActiveSelector] = useState("");
  const [clusterDetails, setClusterDetails] = useState();
  const defaultData = {
    namenode : "http://localhost:50070/",
    yarn : "http://localhost:8088/",
    spark : ""
  };
  
  return (
    <div className="cluster_monitor">
      <div className='cluster_monitor_title'> 
        <Row justify="center" align="bottom">
          <Col>
            <h1>Monitor your cluster.</h1>
          </Col>
        </Row>
        <Divider/>
      </div>

      <div className='cluster_monitor_dashboard'> 
        <Row justify="center" align="top" gutter={[40,24]}>
            <Col align="start">
              <Card title="Name Node Details">
              <p><a href={defaultData.namenode}>Name Node WebUI</a></p>
              </Card>
            </Col>
            <Col align="start">
              <Card title="Data Node Details">
              <p><a href={defaultData.datanode1}>Data Node 1 Manager</a></p>
              <p><a href={defaultData.datanode2}>Data Node 2 Manager</a></p>
              </Card>
            </Col>
            <Col align="start">
              <Card title="Resource Manager Details">
              <p><a href={defaultData.yarn}>YARN Web UI</a></p>
              </Card>
            </Col>
            <Col align="start">
              <Card title="Spark Details">
              <p><a href={defaultData.spark}>Spark UI</a></p>
              </Card>
            </Col>
        </Row>
      </div>

      {props.clusterData == null ? <Empty description={<span>No cluster built yet...</span>}/> : null} 
    </div>
  );
}

export default ClusterMonitor;