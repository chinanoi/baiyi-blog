module.exports = (app) => {
  const { router, controller } = app
  router.get('/index/index', controller.index.home.index)
  router.get('/index/getBlogList', controller.index.home.getBlogList)
}
