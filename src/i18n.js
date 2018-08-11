const BRACE_REGEXP = /[{]\s*([^{}|]+)(?:\s*[|]\s*)?(?:[`]([^`]*)[`])?\s*[}]/g

export default class i18n {
  constructor (obj) {
    this.transText = obj
  }

  translate (key, options) {
    options = options || {}
    var str
    if (key.indexOf('.') > -1) {
       const keyItem = key.split('.')
       let temp = this.transText
       for (var i = 0; i < keyItem.length; i++) {
         if (temp[keyItem[i]] && temp[keyItem[i]] instanceof Object) {
           temp = temp[keyItem[i]]
         } else {
           str = temp[keyItem[i]]
           break;
         }
       }
    } else {
      str = this.transText[key]
    }
    return this.matcher(str, options)
  }

  matcher (str, options = {}){
    if (typeof str !== 'string' && typeof str !== 'number') {
      console.error('Template should be string or number, but '+ str +' got ' + typeof str)
      return ''
    } else {
      if (typeof str === 'string') {
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
      } else {
        return str
      }
    }
  }
}
