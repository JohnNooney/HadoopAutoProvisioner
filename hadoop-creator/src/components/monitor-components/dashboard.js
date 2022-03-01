import {Row, Col, Select, Divider, Space, Card } from 'antd';


const { Option } = Select;

function ClusterDashboard(props) {

    let counter = 0;
    
    return (
        <div className='cluster_monitor_dashboard'> 
            <Row justify="center" align="top" gutter={[40,24]}>
                <Col align="start">
                    <Card title="Name Node Details">
                        <p><a href={props.Data.namenode}>Name Node WebUI</a></p>
                    </Card>
                </Col>
                <Col align="start">
                <Card title="Data Node Details">
                    {props.Data.datanodes.map(element =>{
                        counter++
                        return <p><a href={element}>Data Node {counter} Manager</a></p>
                    })}
                </Card>
                </Col>
                <Col align="start">
                    <Card title="Resource Manager Details">
                        <p><a href={props.Data.yarn}>YARN Web UI</a></p>
                    </Card>
                </Col>
                <Col align="start">
                    <Card title="Spark Details">
                        <p><a href={props.Data.spark}>Spark UI</a></p>
                    </Card>
                </Col>
            </Row>

            <Row justify='center' align='middle' gutter={[40, 24]}>
                <Col align="start">
                    <Space direction="vertical">
                        <p>This is where the HDFS API commands will go</p>
                        <p>Possibly another form here with a drop down box of different jobs to run</p>
                    </Space>
                </Col>
            </Row>
        </div>
    );
}

export default ClusterDashboard;