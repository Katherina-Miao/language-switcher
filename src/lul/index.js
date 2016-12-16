import T from 'i18n-react'
import React from 'react'
import ReactDom from 'react-dom'
import formatters from './formatters'

const DEFAULT_LANGUAGE = 'zh-CN'

export function getUALang () {
  if (navigator.systemLanguage) return navigator.systemLanguage
  return navigator.language
}

export default class Lul {
  constructor (config) {
    this.formatters = formatters
    this.root = config.root
    this.el = config.el
    if (config.fileMap) this.fileMap = config.fileMap

    let currentLanguage = DEFAULT_LANGUAGE
    let translateText = {}

    if (config.useSystemLanguage) {
      currentLanguage = getUALang()
    } else if (config.defaultLanguage) {
      currentLanguage = config.defaultLanguage
      translateText = config.translateText
    }

    React.Component.prototype.L = this.L.bind(this)
    React.Component.prototype.F = this.F.bind(this)

    this.setLanguage(currentLanguage, translateText)
  }

  setLanguage (language, transPatch) {
    const resolve = transAssert => {
      var translate = Object.assign({}, transAssert, transPatch)
      T.setTexts(translate)
      if (this.react) {
        this.react.setState({})
      } else {
        this.react = ReactDom.render(this.root, this.el)
      }
    }

    this.currentLanguage = language
    if (this.fileMap[language]) {
      this.fileMap[language](resolve)
    } else {
      resolve({})
    }
  }

  register (funcName, method) {
    this.formatters[funcName] = method
  }

  L (item, options) {
    if (typeof item === 'string') {
      return T.translate(item, options)
    } else {
      return item.map((key) => { return T.translate(key, options) })
    }
  }

  F (str, formatter) {
    return this.formatters[formatter].bind(this)(str)
  }
}
