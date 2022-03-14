import {Row, Col, Divider, Empty, Spin  } from 'antd';
import { useEffect, useState } from 'react';
import ClusterDashboard from './monitor-components/dashboard';

function ClusterMonitor(props) {
  // const [activeSelector, setActiveSelector] = useState("");
  const [clusterUrlsLoading, setClusterUrlsLoading] = useState(false);
  const [clusterUrls, setClusterUrls] = useState();
  // const defaultData = {
  //   namenode : "http://localhost:50070/",
  //   yarn : "http://localhost:8088/",
  //   spark : "",
  //   datanodes : ["http://localhost:8042/","http://localhost:8043/"]
  // };

  // Gets called on page load
  
  useEffect(() => {
      // call api for URLs
      if(props.clusterData){
        console.log("getting cluster URLs...");
        getClusterData();
      }
    
  }, []);

  function getClusterData(){
    setClusterUrlsLoading(true);

    const fetchRequest = {
      method:'POST',
      headers: {
          'Content-Type': 'application/json'
      }
    }

    //append post data to body
    console.log("cluster data: ", props.clusterData);
    fetchRequest.body = JSON.stringify({data: props.clusterData});

    fetch('http://localhost:5000/scrape', fetchRequest)
    .then(response => {
        if(response.status >= 400){
            console.log(response)
            throw new Error('The HTTP status of the response: ' + response.status + ' ' + response.statusText)
        }
        else{
            return response.json()
        }
    })
    .then(data => {
        console.log('Success:', data);
        if(data["payload"]){
          setClusterUrls(data["payload"]);
        }
    })
    .finally(() => {setClusterUrlsLoading(false);})
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  return (
    <div className="cluster_monitor">
      <div className='cluster_monitor_title'> 
        <Row justify="center" align="bottom">
          <Col>
            <br/>
            <br/>
            <h1>Monitor your cluster.</h1>
          </Col>
        </Row>
        <Divider/>
      </div>

      {/* <Row justify="center" align="bottom">
          <Col>
            <Button type='primary' onClick={onClick}>Test</Button>
          </Col>
      </Row> */}
      {!clusterUrls || clusterUrlsLoading ? 
      <Empty description={clusterUrlsLoading ? <span>Getting cluster data...</span> : <span>No cluster running...</span>}/> 
      : 
      <ClusterDashboard Data={clusterUrls}/>} 
      {clusterUrlsLoading?
      <div>
        <br/>
        <Spin size='large'/>
      </div>
      :null}
    </div>
  );
}

export default ClusterMonitor;