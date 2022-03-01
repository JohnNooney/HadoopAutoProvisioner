import {Row, Col, Select, Divider, Switch, Form, Button, Input, Space, Empty  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

function ClusterMonitor(props) {
  // const [activeSelector, setActiveSelector] = useState("");
  
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

      {props.clusterData == null ? <Empty description={<span>No cluster built yet...</span>}/> : null} 
    </div>
  );
}

export default ClusterMonitor;