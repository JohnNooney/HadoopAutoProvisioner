import {Row, Col, Select, Divider, Card, Space, Empty  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';
import ClusterDashboard from './monitor-components/dashboard';

const { Option } = Select;

function ClusterMonitor(props) {
  // const [activeSelector, setActiveSelector] = useState("");
  const [clusterDetails, setClusterDetails] = useState();
  const defaultData = {
    namenode : "http://localhost:50070/",
    yarn : "http://localhost:8088/",
    spark : "",
    datanodes : ["http://localhost:8042/","http://localhost:8043/"]
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

      {props.clusterData == null ? <Empty description={<span>No cluster running...</span>}/> : <ClusterDashboard Data={defaultData}/>} 
    </div>
  );
}

export default ClusterMonitor;