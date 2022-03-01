import {Row, Col, Select, Divider, Switch, Form, Button, Input, Space, Empty  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

function ClusterDiagram(props) {
    
    return (
    <div className="cluster_diagram">
        <div className='cluster_diagram_title'> 
        <Row justify="center" align="bottom">
            <Col>
            <br/>
            <br/>
            <h1>Explore your cluster.</h1>
            </Col>
        </Row>
        </div> 

        
        <Divider/>

        {props.clusterData == null ? <Empty description={<span>No cluster running...</span>}/> : null}

    </div>
    );
}

export default ClusterDiagram;