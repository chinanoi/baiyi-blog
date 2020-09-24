import React from 'react'
import '../style/css/compoments/header.css'
import {Row,Col,Menu} from 'antd'
import {HomeOutlined,TaobaoCircleOutlined,WeiboCircleOutlined,Html5Outlined
,ZhihuOutlined,BehanceOutlined
} from '@ant-design/icons';
const Header = () =>(
    <div className="header">
        <Row type="flex" justify="center" className="header-div">
            <Col xs={24} sm={24} md={10} lg={10} xl={6}>
               <span className="logo"> <img src="" /></span>
               <span className="logo-name">Sakura</span>
            </Col>
            <Col className="menu-div" xs={0} sm={0} md={14} lg={14} xl={18}>
                <Menu mode="horizontal" selectedKeys="HomeOutlined">
                    <Menu.Item key="HomeOutlined">
                        <HomeOutlined />
                        首页
                    </Menu.Item>
                    <Menu.Item key="homes" icon={<HomeOutlined />}>
                        分类
                    </Menu.Item>
                    <Menu.Item key="TaobaoCircleOutlined">
                    <TaobaoCircleOutlined />
                        标签
                    </Menu.Item>
                    <Menu.Item key="WeiboCircleOutlined">
                        <WeiboCircleOutlined />
                        归档
                    </Menu.Item>
                    <Menu.Item key="Html5Outlined">
                        <Html5Outlined />
                        关于我
                    </Menu.Item>
                    <Menu.Item key="ZhihuOutlined">
                        <ZhihuOutlined />
                        留言板
                    </Menu.Item>
                    <Menu.Item key="BehanceOutlined">
                        <BehanceOutlined />
                        友链
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </div>
)
export default Header;