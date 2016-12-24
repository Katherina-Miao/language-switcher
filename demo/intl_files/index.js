export default {
  'en-US' (resolve) {
    require.ensure([], function () {
      resolve(require('./en.json'))
    }, 'en-US')
  },
  'zh-CN' (resolve) {
    require.ensure([], function () {
      resolve(require('./cn.json'))
    }, 'zh-CN')
  }
}
