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
    if (typeof str !== 'string') {
      console.error('Template should be string, but '+ str +'got ' + typeof str)
      return ''
    }
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
        if (options[indicator] == undefined)
          console.error('Got indicator '+ indicator + typeof indicator)
        return ''
      }
    })
  }
}
