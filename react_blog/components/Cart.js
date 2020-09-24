import React,{useState} from 'react'
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const Cart =()=>{
    const { Meta } = Card;
    // const img = require('../static/img/consult-banner.png')
    const sets=()=>{
        alert('ddd')
    }
    return (
        <div>
             <Card hoverable
                cover={
                <img
                    alt="example"
                    src="../static/img/consult-banner.png"
                />
                }
                actions={[
                <SettingOutlined key="setting" onClick={sets} />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
                <SettingOutlined key="setting" onClick={sets} />,
                ]}
            >
                {/* <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title="Card title"
                description="This is the description"
                /> */}
                <div>ddd</div>
            </Card>,
        </div>
    )
}
export default Cart