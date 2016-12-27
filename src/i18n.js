import { objectAssign } from './utils.js'

const BRACE_REGEXP = /[{]\s*([^{}|]+)(?:\s*[|]\s*)?(?:[`]([^`]*)[`])?\s*[}]/g

export default class i18n {
  constructor (obj) {
    this.transText = obj
  }

  translate (key, options) {
    options = options || {}
    var str = this.transText[key]
    return this.matcher(str, options)
  }

  matcher (str, options = {}){
    if (typeof str !== 'string')
    throw new TypeError('Template should be string, but got ' + typeof str)
    return str.replace(BRACE_REGEXP, function (_, indicator, defaultValue) {
      if (
        options[indicator] !== null &&
        options[indicator] !== undefined
      ) {
        return options[indicator]
      } else if (
        defaultValue != null &&
        defaultValue != undefined
      ) {
        return defaultValue
      } else {
        return ''
      }
    })
  }
}
