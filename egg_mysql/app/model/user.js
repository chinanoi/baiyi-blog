'use strict'

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const User = app.model.define(
    't_user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      nickname: STRING(255),
      username: STRING(255),
      password: STRING(255),
      email: STRING(255),
      avatar: STRING(255),
      type: INTEGER,
      create_time: DATE,
      update_time: DATE,
    },
    { freezeTableName: true, timestamps: false }
  )

  return User
}
