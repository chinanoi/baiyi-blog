const Service = require('egg').Service

class UserService extends Service {
  /**
   * 根据用户名查找对应用户
   * @param {*} username
   */
  async findByUsername(username) {
    return this.ctx.model.User.findOne({
      where: {
        username: username,
      },
    })
  }
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('t_user', { id: 1 })
    return { user }
  }
}

module.exports = UserService
