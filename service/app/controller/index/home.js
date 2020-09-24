'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    //获取用户表的数据

    let result = await this.app.mysql.get('t_comment', {})
    console.log(result)
    this.ctx.body = result
  }
  async getBlogList() {
    let sql = 'SELECT * from t_blog'
    const results = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: results,
    }
  }
}

module.exports = HomeController
