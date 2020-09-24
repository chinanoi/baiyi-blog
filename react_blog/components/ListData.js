import React, { useState, createContext, useContext } from 'react'
import '../style/css/compoments/list.css'
import {
  HomeOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
  Html5Outlined,
  ZhihuOutlined,
  BehanceOutlined,
} from '@ant-design/icons'
import { ListContext } from '../pages/index'
const ListData = () => {
  //创建context
  const mylist = useContext(ListContext)
  return (
    <div>
      <div className="list-header">
        <div className="list-name">博客</div>
        <div className="list-total">共20篇</div>
      </div>
      {mylist.map((item, index) => {
        return (
          <div className="list-div" key={index}>
            <div className="list-title">{item.title}</div>
            <div className="list-context">{item.title}</div>
            <div className="list-icon">
              <span className="list-tag">
                <HomeOutlined /> 管理员
              </span>
              <span className="list-tag">
                <HomeOutlined /> 2019-06-28
              </span>
              <span className="list-tag">
                <HomeOutlined /> 5498人
              </span>
              <span className="list-sort">java框架</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default ListData
