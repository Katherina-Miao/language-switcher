import T from './i18n.js'
import formatters from './formatters'

const DEFAULT_LANGUAGE = 'zh-CN'

export function getUALang () {
  if (navigator.systemLanguage) return navigator.systemLanguage
  return navigator.language
}

export default class Lul {
  constructor (config, callback) {
    this.formatters = formatters
    this.root = config.root
    this.el = config.el
    if (config.fileMap) this.fileMap = config.fileMap

    let currentLanguage = DEFAULT_LANGUAGE
    let translateText = {}

    if (config.useSystemLanguage) {
      currentLanguage = getUALang()
    } else if (localStorage.getItem('lul_language')) {
      currentLanguage = localStorage.getItem('lul_language')
    } else if (config.defaultLanguage) {
      currentLanguage = config.defaultLanguage
    }
    if (config.translateText) translateText = config.translateText

    this.T = this.$T.bind(this)
    this.F = this.$F.bind(this)

    this.getCallBack = function () { callback(this) }
    this.setLanguage(currentLanguage, translateText)
  }

  setLanguage (language, transPatch) {
    const resolve = transAssert => {
      var translate = Object.assign({}, transAssert, transPatch)
      T.setTexts(translate)
      localStorage.setItem('lul_language',this.currentLanguage)
      this.getCallBack()
    }

    this.currentLanguage = language
    if (this.fileMap[language]) {
      this.fileMap[language](resolve)
    } else {
      this.fileMap['zh-CN'](resolve)
    }
  }

  L (lan) {
    localStorage.setItem('lul_language',lan)
    location.reload()
  }

  register (funcName, method) {
    if (typeof method !== 'function')
    throw new TypeError('Formatter should be a function, but get a', typeof method)
    this.formatters[funcName] = method
  }

  $T (item, options) {
    if (item) {
      if (typeof item === 'string') {
        return T.translate(item, options)
      } else {
        return item.map((key) => { return T.translate(key, options) })
      }
    }
    return ''
  }

  $F (str, formatter) {
    if (this.formatters[formatter] &&
        typeof this.formatters[formatter] === "function") {
      return this.formatters[formatter].bind(this)(str)
    } else {
      return ''
    }
  }
}
