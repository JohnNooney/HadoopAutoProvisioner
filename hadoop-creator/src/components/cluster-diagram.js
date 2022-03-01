import {Row, Col, Select, Divider, Switch, Form, Button, Input, Space, Empty  } from 'antd';
import ButtonRequest from './button-request';
import { useState } from 'react';

const { Option } = Select;

function ClusterDiagram(props) {
    let cluster = {};
    
    return (
    <div className="cluster_diagram">
        <div className='cluster_diagram_title'> 
        <Row justify="center" align="bottom">
            <Col>
            <h1>Explore your cluster.</h1>
            </Col>
        </Row>
        </div> 

        
        <Divider/>

        {/* TODO: use cluster variable as props passed to this component */}
        {cluster != {} ? <Empty description={<span>No cluster built yet...</span>}/> : null}

    </div>
    );
}

export default ClusterDiagram;