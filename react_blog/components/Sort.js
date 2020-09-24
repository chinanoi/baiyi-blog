import React,{useState} from 'react'
import {List} from 'antd'
import '../style/css/compoments/sort.css'
const Sort =()=>{
    const [ sortData , setSortData ] = useState([
        {name:'java',number:11},
        {name:'vue',number:15},
        {name:'react',number:100}
    ])
    return(
        <div className="sort">
            <List
                header="分类"
                bordered
                dataSource={sortData}
                renderItem={item => (
                    <List.Item>
                      <div className="sortList">
                        <span className="sortName">{item.name}</span>
                        <span className="sortNum">{item.number}</span>
                      </div>
                    </List.Item>
                )}
                />
        </div>
    )
}
export default Sort;