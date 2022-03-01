import {Row, Col, Select, Divider, Space, Card } from 'antd';


const { Option } = Select;

function ClusterDashboard(props) {

    let counter = 0;

    function listDataNodes()
    {
        let counter = 1;
        let elems = "";
        props.Data.datanodes.forEach(element => {
            elems = elems+ "<p><a href="+element+">Data Node "+counter+" Manager</a></p>";
            counter++;
        });

        return elems
    }
    
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
        </div>
    );
}

export default ClusterDashboard;