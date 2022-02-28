import './App.css';
import { useState } from 'react';
import { Menu } from 'antd';
import { ClusterOutlined, DashboardOutlined, SettingOutlined } from '@ant-design/icons';

import ClusterBuilder from './components/cluster-builder';

function App() {
  const [currentNav, setCurrentNav] = useState({current:"builder"});

  function handleClick(e) {
    console.log('click ', e);
    setCurrentNav({ current: e.key });
    console.log('current Nav: ', currentNav);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Auto Hadoop Provisioner
        </p>
      </header>

      <Menu 
        onClick={handleClick} 
        selectedKeys={[currentNav]}
        mode="horizontal"
      >
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
        <ClusterBuilder/>
      </div>
    </div>
  );
}

export default App;
