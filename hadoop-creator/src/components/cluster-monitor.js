import {Row, Col, Select, Divider, Switch, Form, Button, Input, Space  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

function ClusterMonitor() {
  // const [activeSelector, setActiveSelector] = useState("");
  
  return (
    <div className="cluster_monitor">
      <div className='cluster_monitor'> 
        <Row justify="center" align="bottom">
          <Col>
            <h1>Explore your cluster.</h1>
          </Col>
        </Row>
      </div> 
    </div>
  );
}

export default ClusterMonitor;