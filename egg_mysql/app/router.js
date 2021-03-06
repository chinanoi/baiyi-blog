'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app
  router.post('/admin/login', controller.admin.login.login)
  router.resources('user', '/admin/user', controller.admin.user)
}
