import { Layout, Menu, Breadcrumb  } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Contents from './home-components/contents';

const { SubMenu } = Menu;
const { Sider } = Layout;

function Home(props) {
    const [content, setContent] = useState(['welcome']);
    const [menuItem, setMenuItem] = useState({keyPath:["welcome"]});

    function onSelect(props){
        console.log(props);
        setContent(props.key);
        setMenuItem(props)
    }
    
    return (
        <div className="home">
            <Layout style={{height:"96vh"}}>
                <Sider>
                    <Menu
                        style={{height:"96vh"}}
                        selectedKeys={content}
                        onSelect={onSelect}
                        defaultOpenKeys={["hadoop", "user guide"]}
                        mode='inline'
                        theme='light'
                        >
                        <Menu.Item key="welcome">
                            Welcome
                        </Menu.Item>
                        <SubMenu key="user guide"  title="User Guide">
                                <Menu.Item key="builder">Builder</Menu.Item>
                                <Menu.Item key="diagram">Diagram</Menu.Item>
                                <Menu.Item key="monitor">Monitoring</Menu.Item>
                        </SubMenu>
                        <SubMenu key="hadoop"  title="Hadoop">
                            <Menu.Item key="overview">Overview</Menu.Item>
                            <Menu.Item key="name node">Name Node</Menu.Item>
                            <Menu.Item key="data node">Data Node</Menu.Item>
                            <Menu.Item key="yarn">YARN</Menu.Item>
                            <Menu.Item key="spark">Spark</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="link" >
                            <a href="https://github.com/JohnNooney/HadoopAutoProvisioner" target="_blank" rel="noopener noreferrer">
                                Source Code
                            </a>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout className="home_layout">
                    <Breadcrumb align='left' className='home_breadcrumbs'>
                        <Breadcrumb.Item href="">
                            <HomeOutlined/>
                        </Breadcrumb.Item>
                        {menuItem.keyPath[1] &&
                            <Breadcrumb.Item>{menuItem.keyPath[1]}</Breadcrumb.Item>
                        }
                        {menuItem.keyPath[0] &&
                            <Breadcrumb.Item>{menuItem.keyPath[0]}</Breadcrumb.Item>
                        }
                    </Breadcrumb>
                    
                    <Contents contentKey={content}/>
                </Layout>
            </Layout>
        </div>
    );
}

export default Home;