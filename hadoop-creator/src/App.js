import './App.css';
import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { ClusterOutlined, DashboardOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';

import ClusterBuilder from './components/cluster-builder';
import ClusterMonitor from './components/cluster-monitor';
import ClusterDiagram from './components/cluster-diagram';
import Home from './components/home';

function App() {
  const [currentNav, setCurrentNav] = useState(localStorage.getItem('nav') || "builder");
  const [cluster, setCluster] = useState(null);
  function handleClick(e) {
    console.log('click ', e);
    setCurrentNav(e.key);
  };

  // trigger anytime currentNav changes
  useEffect(() => {
    // set nav state in local storage
    localStorage.setItem('nav', currentNav);
  }, [currentNav])

  // trigger anytime cluster Data changes
  useEffect(() => {
    // set cluster data in local storage (in case of page refresh)
    
  }, [cluster])
  
  // persist data with page refresh by calling API for cluster details
  function getClusterData(){
    //TODO: implement fetch to API for cluster data and links
  }

  return (
    <div className="App">
      <Menu
        onClick={handleClick} 
        selectedKeys={[currentNav]}
        mode="horizontal"
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="builder" icon={<SettingOutlined />}>
          Cluster Builder
        </Menu.Item>
        <Menu.Item key="diagram" icon={<ClusterOutlined />}>
          Cluster Diagram
        </Menu.Item>
        <Menu.Item key="monitor" icon={<DashboardOutlined />}>
          Cluster Monitoring
        </Menu.Item>
      </Menu> 

      <div>
        {currentNav === "home" ? <Home/> : null}
        {currentNav === "builder" ? <ClusterBuilder clusterData={cluster} clusterSetter={setCluster} /> : null}
        {currentNav === "diagram" ? <ClusterDiagram clusterData={cluster}/> : null}
        {currentNav === "monitor" ? <ClusterMonitor clusterData={cluster}/> : null}
      </div>
    </div>
  );
}

export default App;
