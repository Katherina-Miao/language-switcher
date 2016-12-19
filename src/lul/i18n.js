const BRACE_REGEXP = /[{]\s*([^{}|]+)(?:\s*[|]\s*)?(?:[`]([^`]+)[`])?\s*[}]/g

const i18n = {
  setTexts (obj) {
    this.transText = obj
  },

  translate (key, options) {
    options = options || {}
    var str = this.transText[key]
    return this.matcher(str, Object.assign(options, this.transText))
  },

  matcher (str, options = {}){
    if (typeof str !== 'string')
    throw new TypeError('Template should be a string, but get a', typeof str)
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

export default i18n
