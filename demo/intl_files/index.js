const DEFAULT_LANGUAGE = 'zh-CN'
let fileMap = {
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

export default function (language, resolve){
  let lang = language.selectedLang || language.systemLang
  if (fileMap[lang]) {
    fileMap[lang](resolve)
  } else {
    fileMap[DEFAULT_LANGUAGE](resolve)
  }
}
