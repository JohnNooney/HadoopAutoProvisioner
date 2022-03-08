import {Row, Col, Divider, Typography , Layout, Menu, Breadcrumb  } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Title, Text } = Typography;

function Home(props) {
    
    return (
        <div className="home">
            <Layout style={{height:"96vh"}}>
                <Sider>
                    <Menu
                        style={{height:"96vh"}}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode='inline'
                        theme='light'
                        >
                        <Menu.Item key="1">
                            Navigation One
                        </Menu.Item>
                        <Menu.Item key="2" >
                            Navigation Two
                        </Menu.Item>
                        <SubMenu key="sub1"  title="Navigation Two">
                                <Menu.Item key="3">Option 3</Menu.Item>
                                <Menu.Item key="4">Option 4</Menu.Item>
                            <SubMenu key="sub1-2" title="Submenu">
                                <Menu.Item key="5">Option 5</Menu.Item>
                                <Menu.Item key="6">Option 6</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub2"  title="Navigation Three">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="link" >
                            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                Ant Design
                            </a>
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Layout className="home_layout">
                    <Breadcrumb align='left' className='home_breadcrumbs'>
                        <Breadcrumb.Item href="">
                            <HomeOutlined/>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Application</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className='home_content'>
                        <div className='home_title'> 
                            <Row justify="start" align="middle">
                                <Col>
                                    <br/>
                                    <br/>
                                    <Title>Welcome to Auto Hadoop Provisioner</Title>
                                </Col>
                            </Row>

                            <Divider />
                            
                            <Row justify="start" align="middle">
                                <Col>
                                    <Text>In this page you will find information on how this application works</Text>
                                </Col>
                            </Row>
                        </div> 
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Home;