import React,{useState} from 'react'
import TagCloud from 'react3dtagcloud'
import {List} from 'antd'
import '../style/css/compoments/tag.css'
const Tag =()=>{
    const tagName = ['java', 'javscript', 'C', 'C++', '前端', 'React', 'Vue', 'redux', '写作', '程序员', '编程']
    const sortData = ['tag']
    return (
        <div className="tag">
            <List
                header="标签"
                bordered
                dataSource={sortData}
                renderItem={item => (
                    <List.Item>
                       <TagCloud speed={3} radius={100} tagName={tagName}></TagCloud>
                    </List.Item>
                )}
                />
        </div>
    )
}
export default Tag